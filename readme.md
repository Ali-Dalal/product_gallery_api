# Product gallery web API microservice

a small application that has the following APIs

- GET: /api/v1/cities?filter[query]=ber&page=1
- GET: /api/v1/city-product-grid?city_name=berlin&product_name=BMWi8

### Before running the application

ensure you created a postgres database to use with the app

### 2 ways to run the application

- via cloning the repo
```shell script
git clone https://github.com/Ali-Dalal/product_gallery.git
cp .env.example .env
# edit .env file and add DB details 
npm run reset # to run migrations and seeds
npm run dev
```

-  via docker:
```shell script
docker run -p 3000:3000 --env NODE_ENV=development --env PORT=3000 --env DEV_DB_HOST=localhost --env DEV_DB_NAME=product_gallery_development --env DEV_DB_USER=username --env DEV_DB_PASSWORD=password --env DEV_DB_CLIENT=pg --name product_gellary_container allloush92/product_gellary_web:latest
# replace  db username and password with the right values
# make sure database connection is accessible via docker network if the db is localhost
```

### running tests

Run `npm t` to run tests

### Available commands:

- `npm run build`
    to compile typescript into JS

- `npm run migrate`
    to run the migrations

- `npm run seed`
    to run seeds
    
-  `npm run reset`
    to reset database, migrations and rerun seeds

- `npm run lint`
    to run eslint and check code for errors

- `npm run make:migration {migration_name}`
    to create a new migration

- `npm run make:seed`
    to create a new seed
    
### compile docker image

to compile the docker image, run this command
`docker build -t {ADD_YOUR_TAG} .`