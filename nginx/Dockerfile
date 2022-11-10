FROM nginx:1.23-alpine

RUN rm /etc/nginx/conf.d/default.conf

COPY /include.websocket /etc/nginx/app/include.websocket

COPY /include.forwarded /etc/nginx/app/include.forwarded

COPY /dev.conf /etc/nginx/conf.d
