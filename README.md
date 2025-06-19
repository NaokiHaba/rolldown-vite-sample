# Vite vs Rolldown-vite Performance Playground

This playground compares the build performance between standard Vite and Rolldown-vite with a Vue.js application.

## Setup

```bash
pnpm install
```

## Usage

### Development Mode

**Standard Vite:**
```bash
pnpm run dev
```

**Rolldown-vite:**
```bash
pnpm run dev:rolldown
```

### Production Build

**Standard Vite:**
```bash
pnpm run build
```

**Rolldown-vite:**
```bash
pnpm run build:rolldown
```

### Performance Benchmark

Run the automated benchmark to compare build times:
```bash
pnpm run benchmark
```

This will run multiple build iterations for both Vite and Rolldown-vite and display the average build times.

## Project Structure

- `src/` - Vue application source code
  - `App.vue` - Main application component
  - `components/` - Sample components for performance testing
    - `HelloWorld.vue` - Simple interactive component
    - `LargeList.vue` - Component with large data rendering
    - `ComplexComponent.vue` - Component with nested dependencies
    - `NestedComponent.vue` - Nested component for complexity

## Configuration

- `vite.config.js` - Standard Vite configuration
- `vite.config.rolldown.js` - Rolldown-vite configuration
- `benchmark.js` - Performance comparison script
