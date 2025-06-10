# Claude Code Configuration

このファイルはClaude Codeプロジェクトの設定と履歴を記録します。

## 🔨 最重要ルール - 新しいルールの追加プロセス

ユーザーから今回限りではなく常に対応が必要だと思われる指示を受けた場合：

1. 「これを標準のルールにしますか？」と質問する
2. YESの回答を得た場合、CLAUDE.mdに追加ルールとして記載する
3. 以降は標準ルールとして常に適用する

このプロセスにより、プロジェクトのルールを継続的に改善していきます。

## 🔄 開発フロールール

### ブランチ運用
- **すべての変更はfeatureブランチで作業**
- **mainブランチへの直接コミット禁止**
- **変更は必ずPull Request経由でマージ**

### 作業フロー
1. featureブランチ作成: `git checkout -b feature/[機能名]`
2. 変更をコミット・プッシュ
3. Pull Request作成
4. レビュー・承認後にSquash merge
5. ブランチ削除

このルールにより、変更履歴の管理とコードレビューを確実に行います。

## プロジェクト概要

職務経歴書のWebサイト化プロジェクト
- **目的**: MarkdownからAstro SSGへの移行でリッチなUIを実現
- **デプロイ先**: GitHub Pages (https://wakidas.github.io/resume)
- **技術スタック**: Astro + Tailwind CSS + Content Collections

## 技術構成

### フレームワーク・ライブラリ
- **Astro v5.9.1**: 静的サイトジェネレーター
- **Tailwind CSS v3**: ユーティリティファーストCSSフレームワーク  
- **@astrojs/tailwind**: Astro用Tailwind統合

### 開発・品質管理ツール
- **textlint**: 日本語文章校正
- **md-to-pdf**: PDF生成機能
- **GitHub Actions**: 自動デプロイ

## ディレクトリ構造

```
src/
├── content/
│   └── resume/
│       └── index.md          # メインの履歴書コンテンツ
├── layouts/
│   └── ResumeLayout.astro    # レイアウトコンポーネント
├── pages/
│   └── index.astro           # トップページ
└── styles/
    └── global.css            # Tailwind CSS読み込み

public/
└── strengthsfinder.pdf       # 添付資料

pdf-configs/
├── config.cjs                # PDF生成設定
└── style.css                 # PDF用スタイル
```

## 開発コマンド

```bash
# 開発サーバー起動
npm run dev

# 本番ビルド
npm run build

# プレビュー
npm run preview

# 文章校正
npm run lint

# PDF生成
npm run build:pdf
```

## デプロイ

GitHub Actionsで自動デプロイ設定済み：
- mainブランチへのpush時に自動実行
- workflow_dispatchで手動実行可能
- 成果物: GitHub Pages

## 実装済み機能

### ✅ 完了項目
1. **Astro SSGセットアップ** - 基本的なサイト構造
2. **Content Collections** - 履歴書データ管理
3. **Tailwind CSS統合** - モダンなスタイリング
4. **GitHub Pages デプロイ** - 自動化されたCI/CD
5. **shimpeee_表示修正** - コードスパンでアンダースコア保持
6. **日本語リスト対応** - 中黒（・）による箇条書き
7. **テーブルレイアウト修正** - 見た目の改善

### 技術的な解決策

#### アンダースコア表示問題
- **問題**: Markdownパーサーが`shimpeee_`を斜体として解釈
- **解決**: バッククォートでコードスパンにして回避
- **適用箇所**: X、SpeakerDeck、個人ブログリンク

#### リスト表示問題  
- **問題**: Tailwind CSSリセットでブラウザデフォルトのリストスタイル消失
- **解決**: CSS `::before`疑似要素で日本語中黒（・）を追加

#### テーブルレイアウト問題
- **問題**: ヘッダー行の「key」「value」がレイアウトを崩す
- **解決**: `&nbsp;`による透明ヘッダーでMarkdown構造維持

## 今後の改善候補

- [ ] コンポーネント化（BasicInfo, WorkExperience等）
- [ ] SEO最適化（meta tags、structured data）
- [ ] 印刷用CSS改善
- [ ] 多言語対応検討
- [ ] パフォーマンス最適化

## 関連リンク

- [プロジェクトリポジトリ](https://github.com/wakidas/resume)
- [デプロイ先サイト](https://wakidas.github.io/resume)
- [Astro公式ドキュメント](https://docs.astro.build)
- [Tailwind CSS公式ドキュメント](https://tailwindcss.com)