
FROM node:18-alpine

RUN apk update && apk add --no-cache build-base gcc autoconf automake zlib-dev libpng-dev nasm bash vips-dev

ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}

WORKDIR /opt/app

COPY package.json yarn.lock ./

RUN yarn config set network-timeout 600000 -g && yarn install

COPY . .

RUN chown -R node:node /opt/app

USER node

CMD ["yarn", "start"]
