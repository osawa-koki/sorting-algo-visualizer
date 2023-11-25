# sorting-algo-visualizer

💦💦💦 整列アルゴリズムを可視化する！  

## 実装済みアルゴリズム一覧

- [x] バブルソート
- [x] 選択ソート
- [x] 挿入ソート
- [x] マージソート
- [x] クイックソート
- [x] ヒープソート
- [x] シェルソート
- [x] カウントソート
- [x] バケットソート
- [x] コムソート
- [x] 基数ソート
- [x] サイクルソート
- [x] パンケーキソート
- [x] ノームソート
- [x] ステゥージソート
- [x] 鳩の巣ソート
- [x] バイトニックソート
- [x] 奇遇転置ソート
- [x] カクテルソート
- [x] ストランドソート

## 実行方法

```shell
# モジュールのインストール
yarn install

# 開発用実行
yarn dev

# ビルド
yarn build
```

本番用にDockerでビルドする場合は以下のコマンドを実行してください。  

```shell
docker build -t sorting-algo-visualizer .
docker run -p 80:80 -d --rm --name sorting-algo-visualizer sorting-algo-visualizer
```
