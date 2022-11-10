FROM node:19-alpine

RUN echo @edge http://nl.alpinelinux.org/alpine/latest-stable/community >> /etc/apk/repositories \
    && echo @edge http://nl.alpinelinux.org/alpine/latest-stable/main >> /etc/apk/repositories \
    && apk add --no-cache \
    chromium \
    harfbuzz \
    "freetype>2.8" \
    ttf-freefont \
    nss@edge \
    && rm -rf /var/cache/* \
    && mkdir /var/cache/apk

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

ENV PATH /usr/src/app/node_modules/.bin:$PATH

COPY package.json /usr/src/app/package.json

COPY package-lock.json /usr/src/app/package-lock.json

RUN npm install

RUN npm install -g @angular/cli@14.2.8

COPY . /usr/src/app
