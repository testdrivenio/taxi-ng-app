FROM node:14.8.0-alpine

RUN echo @edge http://nl.alpinelinux.org/alpine/latest-stable/community >> /etc/apk/repositories \
    && echo @edge http://nl.alpinelinux.org/alpine/latest-stable/main >> /etc/apk/repositories \
    && apk add --no-cache \
    chromium@edge \
    harfbuzz@edge \
    nss@edge \
    && rm -rf /var/cache/* \
    && mkdir /var/cache/apk

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

ENV PATH /usr/src/app/node_modules/.bin:$PATH

COPY package.json /usr/src/app/package.json

COPY package-lock.json /usr/src/app/package-lock.json

RUN npm install

COPY . /usr/src/app
