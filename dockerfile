FROM node:18-alpine

# 作業ディレクトリ
WORKDIR /usr/src/app

# 依存関係をインストール
COPY package*.json ./
RUN npm install

# アプリケーションのコードをコピー
COPY . .

# コンテナのポートを公開
EXPOSE 3000

# アプリケーションを起動
CMD ["npm", "run", "dev"]
