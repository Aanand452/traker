# SARA (Salesforce Reporter application)

Basic node/express project

- Sequelize ORM documentation [https://sequelize.org/master/manual/](https://sequelize.org/master/manual/) 
- Postrgres  [https://www.postgresql.org/](https://www.postgresql.org/) 
- Express MVC framework[https://expressjs.com/](https://expressjs.com/)
- Yarn monorepos [https://classic.yarnpkg.com/blog/2017/08/02/introducing-workspaces/](https://classic.yarnpkg.com/blog/2017/08/02/introducing-workspaces/) 
- Docker [https://docs.docker.com/compose/](https://docs.docker.com/compose/) 

## Project startup

This project is built using docker containers to development porpuses, the final app will work direcly with a node env and database env built in in *Heroku*

### Startup containers (node / postgres )

executing the next command will bring up 2 containers will allow run the app, this project uses nodemon to the automatically restart the node server once a change is done in the project.

if it is the firts time run
```
yarn && docker-compose up -d && docker-compose logs -f
```  

if you already had ran the fisrt time command just use
```
docker-compose up -d && docker-compose logs -f
```  

to close the connection with the containers use `control + c`

### stop containers (node / postgres )

```
docker-compose down
```

## BD setup

create an .env file  inside @sara/db workspace direct `cd packages/db` and inside of this file add this enviroment variable, this will be used only for the DB startup and run migrations.

```
DB_HOST=localhost
```

inside @sara/db workspace  run db creation command, this will bring up the DB insisde of the db local container.

```
yarn db:init
```

run db migration command, this will bring up all the tables required to run te project
  
```
db:migrate
```

## Modifing the DB model locally

Sometimes is required modify the DB model, for this follow the documentation given in [https://sequelize.org/master/manual/migrations.html](https://sequelize.org/master/manual/migrations.html) , basically the only task you need to run are this 

create new migration

```
db:new-migration {migration name here}
``` 

this will generate a new file inside of `./packages/db/migrations` that will look like this 

```
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};

```

##  Running db migrations over HEROKU env

Heroku will be used as a cloud service to host this web app, for that, we created 2 environments: one for testing and one for stable. When a change is performed in the database schema a migration might be required to implement these changes over this environments database. To perform these changes please run the nexts commands

make sure you are a colaborator in the heroku app

```
heroku login
```

to perform a new migration run this command over you local terminal

```
heroku run yarn workspace @sara/db db:migrate
```

## Seegin dummy data

Run the scripts given in the directory `./packages/db/seed/dummy` , these are required to get dropdowns data


## Swagger  documentation

  whole API documentation is given in this link [http://localhost:3000/docs/](http://localhost:3000/docs/) 

