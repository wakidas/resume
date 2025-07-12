# Resume Website

**🌐 Live Site: [https://wakidas.github.io/resume](https://wakidas.github.io/resume)**

職務経歴書のWebサイト版です。Markdown形式で管理された履歴書データを、Astro SSGを使ってリッチなUIで表示します。

## 🚀 For External Users

このリポジトリは履歴書サイトのソースコードです。実際の履歴書は以下のURLでご覧いただけます：

**➡️ [https://wakidas.github.io/resume](https://wakidas.github.io/resume)**

## 🛠️ For Developers

### プロジェクト概要
- **目的**: MarkdownからAstro SSGへの移行でリッチなUIを実現
- **技術スタック**: Astro v5.9.1 + Tailwind CSS + Content Collections
- **デプロイ**: GitHub Pages (自動デプロイ)

### プロジェクト構造

```text
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

### 開発コマンド

| Command              | Action                                |
| :------------------- | :------------------------------------ |
| `npm install`        | 依存関係をインストール                |
| `npm run dev`        | ローカル開発サーバー起動 (localhost:4321) |
| `npm run build`      | 本番用ビルド                          |
| `npm run preview`    | ビルドしたサイトのプレビュー          |
| `npm run lint`       | textlintによる文章校正                |
| `npm run build:pdf`  | PDF生成                               |

### 開発フロー

1. **ブランチ作成**: `git checkout -b feature/[機能名]`
2. **開発**: 変更を実装
3. **ビルド確認**: `npm run build`で動作確認
4. **コミット・プッシュ**: 変更をコミット・プッシュ
5. **PR作成**: Pull Request作成してレビュー

### 重要なルール

- **mainブランチへの直接コミット禁止**
- **すべての変更はfeatureブランチ経由**
- **ビルド成功が必須条件**
- **自動デプロイ**: mainブランチへのマージで自動デプロイ

### 詳細な開発ガイド

プロジェクトの詳細な設定やルールについては、[CLAUDE.md](./CLAUDE.md)を参照してください。
