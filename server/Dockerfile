FROM python:3.10-alpine

RUN apk add --update --no-cache \
    g++ gcc libxslt-dev musl-dev python3-dev \
    libffi-dev openssl-dev jpeg-dev zlib-dev postgresql-dev

ENV LIBRARY_PATH=/lib:/usr/lib

WORKDIR /usr/src/app

COPY ./requirements.txt /usr/src/app

RUN pip install --upgrade pip

RUN pip install -r requirements.txt

COPY . /usr/src/app

RUN python manage.py collectstatic --noinput
