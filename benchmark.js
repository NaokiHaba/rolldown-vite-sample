import { exec } from 'child_process';
import { promisify } from 'util';
import { rm } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const execAsync = promisify(exec);

async function measureBuildTime(command, label) {
  console.log(`\nMeasuring ${label}...`);
  
  // Clean dist directory before each build
  try {
    await rm(path.join(__dirname, 'dist'), { recursive: true, force: true });
  } catch (e) {
    // Ignore error if dist doesn't exist
  }
  
  const runs = 5;
  const times = [];
  
  for (let i = 0; i < runs; i++) {
    console.log(`  Run ${i + 1}/${runs}`);
    const start = performance.now();
    
    try {
      await execAsync(command);
      const end = performance.now();
      const duration = end - start;
      times.push(duration);
      
      // Clean dist after each run
      await rm(path.join(__dirname, 'dist'), { recursive: true, force: true });
    } catch (error) {
      console.error(`Error during ${label} run ${i + 1}:`, error.message);
      throw error;
    }
  }
  
  // Calculate stats
  const avg = times.reduce((a, b) => a + b, 0) / times.length;
  const min = Math.min(...times);
  const max = Math.max(...times);
  
  return {
    avg: avg.toFixed(2),
    min: min.toFixed(2),
    max: max.toFixed(2),
    times: times.map(t => t.toFixed(2))
  };
}

async function runBenchmark() {
  console.log('='.repeat(80));
  console.log('Vite vs Rolldown-vite Performance Benchmark');
  console.log('='.repeat(80));
  
  try {
    // Standard Vite benchmark
    const viteResults = await measureBuildTime('npx vite build --config vite.config.js', 'Vite (Standard)');
    
    // Rolldown-vite benchmark (No Native)
    const rolldownNoNativeResults = await measureBuildTime('ROLLDOWN_NATIVE=false npx rolldown-vite build --config vite.config.rolldown.js', 'Rolldown-vite (No Native)');
    
    // Rolldown-vite benchmark (With Native)
    const rolldownWithNativeResults = await measureBuildTime('ROLLDOWN_NATIVE=true npx rolldown-vite build --config vite.config.rolldown.js', 'Rolldown-vite (With Native)');
    
    // Calculate improvements
    const noNativeImprovement = ((parseFloat(viteResults.avg) - parseFloat(rolldownNoNativeResults.avg)) / parseFloat(viteResults.avg) * 100).toFixed(2);
    const withNativeImprovement = ((parseFloat(viteResults.avg) - parseFloat(rolldownWithNativeResults.avg)) / parseFloat(viteResults.avg) * 100).toFixed(2);
    
    // Display results in table format
    console.log('\n' + '='.repeat(80));
    console.log('BENCHMARK RESULTS (Average of 5 runs)');
    console.log('='.repeat(80));
    console.log('');
    console.log('| Metric                  | Before (Vite) | After (No Native) | After (With Native) | Improvement     |');
    console.log('|-------------------------|---------------|-------------------|---------------------|-----------------|');
    console.log(`| Build Time (ms)         | ${viteResults.avg.padStart(13)} | ${rolldownNoNativeResults.avg.padStart(17)} | ${rolldownWithNativeResults.avg.padStart(19)} | ${withNativeImprovement}% faster${withNativeImprovement.padStart(5)} |`);
    console.log(`| Min Time (ms)           | ${viteResults.min.padStart(13)} | ${rolldownNoNativeResults.min.padStart(17)} | ${rolldownWithNativeResults.min.padStart(19)} | -               |`);
    console.log(`| Max Time (ms)           | ${viteResults.max.padStart(13)} | ${rolldownNoNativeResults.max.padStart(17)} | ${rolldownWithNativeResults.max.padStart(19)} | -               |`);
    
    console.log('\n' + '='.repeat(80));
    console.log('DETAILED RESULTS');
    console.log('='.repeat(80));
    console.log('\nVite (Standard):');
    console.log(`  Times: [${viteResults.times.join(', ')}] ms`);
    
    console.log('\nRolldown-vite (No Native):');
    console.log(`  Times: [${rolldownNoNativeResults.times.join(', ')}] ms`);
    console.log(`  Improvement: ${noNativeImprovement}% ${parseFloat(noNativeImprovement) > 0 ? 'faster' : 'slower'}`);
    
    console.log('\nRolldown-vite (With Native):');
    console.log(`  Times: [${rolldownWithNativeResults.times.join(', ')}] ms`);
    console.log(`  Improvement: ${withNativeImprovement}% ${parseFloat(withNativeImprovement) > 0 ? 'faster' : 'slower'}`);
    
    console.log('\n' + '='.repeat(80));
    
  } catch (error) {
    console.error('Benchmark failed:', error);
    process.exit(1);
  }
}

// Run the benchmark
runBenchmark();