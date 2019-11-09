FROM python:3.7.5-alpine

RUN apk add --update --no-cache \
    g++ gcc libxslt-dev musl-dev python3-dev \
    libffi-dev openssl-dev jpeg-dev zlib-dev
ENV LIBRARY_PATH=/lib:/usr/lib

WORKDIR /usr/src/app

COPY ./requirements.txt /usr/src/app

RUN pip install --upgrade pip
RUN pip install -r requirements.txt

COPY . /usr/src/app

WORKDIR /usr/src/app/taxi

RUN python manage.py collectstatic --noinput
