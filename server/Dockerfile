FROM python:3.9.7-slim-buster

RUN apt-get update \
  && apt-get -y install gcc postgresql \
  && apt-get clean

ENV LIBRARY_PATH=/lib:/usr/lib

WORKDIR /usr/src/app

COPY ./requirements.txt /usr/src/app

RUN pip install --upgrade pip

RUN pip install -r requirements.txt

COPY . /usr/src/app

RUN python manage.py collectstatic --noinput