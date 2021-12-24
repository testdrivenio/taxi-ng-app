# base image
FROM node:16.13-alpine

# install chrome
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

# set working directory
WORKDIR /usr/src/app

# add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH /usr/src/app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json /usr/src/app/package.json
COPY package-lock.json /usr/src/app/package-lock.json
RUN npm install
RUN npm install -g @angular/cli@13.0.4

# copy the client directory into the container
COPY . /usr/src/app
