# Rolldown-Vite: 次世代ビルドツールの進化
## 10分間 Lightning Talk

---

## 1. Viteとは何か？

### Viteの特徴
- **高速な開発サーバー**: ESMベースのHMR (Hot Module Replacement)
- **高速なビルド**: Rollupベースの本番ビルド
- **ゼロコンフィグ**: 開箱即用（out-of-the-box）

### なぜViteが速いのか？
```
従来のバンドラー: すべてをバンドル → サーバー起動
Vite: ネイティブESM → 必要な時だけトランスパイル
```

### Viteの課題
- JavaScriptベースのRollupに依存
- 大規模プロジェクトでのビルドパフォーマンス
  - JavaScriptのシングルスレッド制限により、バンドルする量が増えると、parseやtransformなどの処理がスタックしてしまい遅くなってしまう

---

## 2. Rollup → Rolldownへの進化

### Rollupとは
- ES Modulesに特化したバンドラー
- Tree-shakingのパイオニア
- Viteの本番ビルドのコア

### なぜRolldownが必要か？

#### パフォーマンスの壁
```javascript
// JavaScriptの限界
- シングルスレッド
- GCによるオーバーヘッド
- 文字列操作の非効率性
```

#### Rolldownの解決策
- **Rust実装**: メモリ安全性 + 高速性
- **並列処理**: マルチコアCPUの活用
- **ゼロコピー最適化**: 文字列処理の効率化

### 互換性の維持
```javascript
// Rollupプラグインとの互換性
export default {
  plugins: [
    // 既存のRollupプラグインがそのまま動作
    rollupPlugin(),
    vitePlugin()
  ]
}
```

---

## 3. void0による開発とRust化の流れ

### void0とは
- Viteコアチームメンバー
- Rolldownプロジェクトのリード開発者
- JavaScriptツールチェーンのRust化を推進

### なぜRust？

#### JavaScript vs Rust
```
JavaScript:
- 開発速度 ◎
- パフォーマンス △
- メモリ効率 △

Rust:
- 開発速度 △
- パフォーマンス ◎
- メモリ効率 ◎
```

### 近年のRust化トレンド
- **SWC**: Babel → Rust
- **Turbopack**: Webpack → Rust
- **Biome**: ESLint + Prettier → Rust
- **Rolldown**: Rollup → Rust

---

## 4. パフォーマンス比較

### 公式ベンチマーク結果 (rolldown/benchmarks)

#### Pure Bundling (minifyなし)
```
モジュール数: 10,000の場合
| バンドラー | ビルド時間 | Rolldownとの比較 |
|-----------|------------|-----------------|
| Rolldown  | 0.5s       | -               |
| esbuild   | 0.4s       | 1.25x slower    |
| Rspack    | 2.0s       | 4x faster       |
| Rollup    | 17.5s      | 35x faster      |
```

#### 実プロジェクトでの比較
```
Three.js (大規模ライブラリ)のビルド
| バンドラー | ビルド時間 | バンドルサイズ |
|-----------|------------|---------------|
| Rolldown  | 0.3s       | 636KB         |
| esbuild   | 0.2s       | 638KB         |
| Rollup    | 6.2s       | 635KB         |
```

### 実プロジェクトでの測定結果
```
小規模プロジェクトでの実測値（5回平均）
| 設定                    | ビルド時間 | 改善率    |
|------------------------|------------|-----------|
| Vite (標準)            | 867.68ms   | -         |
| Rolldown-vite (No Native) | 840.01ms   | 3.19% 高速化 |
| Rolldown-vite (Native) | 788.68ms   | 9.10% 高速化 |
```

#### プロジェクト規模による効果の違い
- **小規模プロジェクト**: 約10%の改善
- **中規模プロジェクト**: 約20-30%の改善
- **大規模プロジェクト**: 最大35倍の改善（公式ベンチマーク）


## まとめ

### Rolldown-Viteの価値
1. **互換性**: 既存のViteプロジェクトがそのまま動作
2. **スケーラビリティ**: プロジェクト規模に応じて効果が拡大
   - 小規模: 10%改善
   - 大規模: 最大35倍高速
3. **将来性**: Rustエコシステムとの統合


