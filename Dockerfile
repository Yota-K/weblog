FROM node:18-alpine

RUN apk update

# pnpm config set store-dir /root/.local/share/pnpm/storeを実行してストアディレクトリを変更しないと、
# pnpm installするときにエラーが発生した。
RUN npm install --global pnpm@latest \
  && SHELL=bash pnpm setup \
  && source /root/.bashrc \
  && pnpm config set store-dir /root/.local/share/pnpm/store

WORKDIR /app
