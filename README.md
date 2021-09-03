# Developing a Real-Time Taxi App with Django Channels and Angular

https://testdriven.io/courses/real-time-app-with-django-channels-and-angular/

## How to Start

Create a *.env* file in the *server* directory and copy the following contents into it:

```sh
# server/.env

PGDATABASE=taxi
PGUSER=taxi
PGPASSWORD=taxi
PGHOST=taxi-database
REDIS_URL=redis://taxi-redis:6379/0
```

Change directories into the *client* directory and run the following:

```sh
$ npm i
```

Build the Docker containers:

```sh
$ docker-compose down && docker-compose up --build
```

Migrate the database:

```sh
$ docker-compose exec taxi-server python manage.py migrate
```

Run the backend tests:

```sh
$ docker-compose exec taxi-server pytest
```

Run the frontend tests:

```sh
$ docker-compose exec taxi-client ng test
```