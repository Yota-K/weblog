FROM node:16-alpine

RUN apk update

RUN npm install -g ts-node typescript npm-check-updates

ENV NODE_PATH /usr/local/lib/node_modules

WORKDIR /app
