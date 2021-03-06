FROM node:15-alpine

RUN apk update

RUN apk add nodejs

RUN npm install -g ts-node typescript npm-check-updates

ENV NODE_PATH /usr/local/lib/node_modules

WORKDIR /app
