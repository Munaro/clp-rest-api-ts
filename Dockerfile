FROM node:20-alpine

WORKDIR /app

COPY . .

RUN apk add --no-cache openssl

RUN if [ ! -e /usr/local/bin/yarn ]; then npm install --global yarn; fi


RUN yarn

RUN npx prisma generate

RUN yarn build
