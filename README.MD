# Technical assignment:

## Backend

- Laravel 10
- sqlite for local database

Notes:
- Added the database to save the movies details when user save a movie in the favorites list to reduce 
the amount of http request being sent to the external API. The frontend is not using this feature yet.

## Frontend

- Reactjs
- Typescript
- React Router for navigation
- ChakraUI for UI components
- Axios for http calls

## How to run the project
### Without docker

- Backend Requires: PHP8.0+, sqlite support for php, composer for dependencies
- Frontend requires: Nodejs 20+, npm for dependencies

```shell
$ got clone https://github.com/revingly/tech-assignment
$ cd tech-assignment
$ cd backend
$ compose install
$ php artisan migrate
$ php artisan serve
In a new terminal
$ cd frontend
$ npm install
$ npm run dev
```


### With docker
When running the project with docker please change the `BACKEND_API_URL` in the `constants` file to match nginx exportd port

```shell
$ got clone https://github.com/revingly/tech-assignment
$ cd tech-assignment
$ docker-compose up -d
$ cd frontend
$ npm install
$ npm run dev
```

Images

<a href="https://ibb.co/zS2JZ6y"><img src="https://i.ibb.co/64tBFX3/home.png" alt="home" border="0"></a>
<a href="https://ibb.co/VWC92NY"><img src="https://i.ibb.co/6RtwgZ0/login.png" alt="login" border="0"></a>
<a href="https://ibb.co/vHv1Lpr"><img src="https://i.ibb.co/NsnxW5k/register.png" alt="register" border="0"></a>
<a href="https://ibb.co/7tC0LzK"><img src="https://i.ibb.co/9HgdSvW/movies.png" alt="movies" border="0"></a>
<a href="https://ibb.co/PgPKBWM"><img src="https://i.ibb.co/6FTz6t8/search.png" alt="search" border="0"></a>
<a href="https://ibb.co/3mRsCxL"><img src="https://i.ibb.co/1GznmCw/details.png" alt="details" border="0"></a>
<a href="https://ibb.co/c18CWj1"><img src="https://i.ibb.co/SPmdkzP/favs.png" alt="favs" border="0"></a>
