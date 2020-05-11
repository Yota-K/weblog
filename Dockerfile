FROM node:10.13-alpine

RUN apk update

RUN apk add nodejs && \
    apk add npm && \
    apk add git

RUN npm install -g ts-node typescript netlify-cli

ENV NODE_PATH /usr/local/lib/node_modules

WORKDIR /app
