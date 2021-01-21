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

Restart the docker container and then create an .env file  inside @sara/db workspace on `cd packages/db` folder, in this file add this enviroment variable (this will be used only for the DB startup and run migrations).

```
DB_HOST=localhost
```

run the initial db migration command using this command
  
```
yarn workspace @sara/db db:migrate
```

A success message like this should appear once the initial migration was done.

## Modifing the DB model locally

Sometimes is required modify the DB model, for this follow the documentation given in [https://sequelize.org/master/manual/migrations.html](https://sequelize.org/master/manual/migrations.html) , basically the only task you need to run are this 

create new migration

```
yarn workspace @sara/db db:new-migration {migration name here}
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

to excecute the new  migration just use the command 

```
yarn workspace @sara/db db:migrate
```

##  Running db migrations over HEROKU env

Heroku will be used as a cloud service to host this web app, for that, we created 2 environments: one for testing and one for stable. When a change is performed in the database schema a migration might be required to implement these changes over this environments databases. To perform these changes please run the nexts commands

make sure you are a colaborator in the heroku app and have the remotes setup [https://devcenter.heroku.com/articles/git#creating-a-heroku-remote](see on heroku) and then run the commands below 

Do login via Heroku CLI

```
heroku login
```

to perform a new migration run this command over you local terminal

```
heroku run bash
```

once you get connected you will be able to run any command over the heroku server, to perform a new migration run

```
yarn workspace @sara/db db:migrate
```


## Seegin dummy data

Run the scripts given in the directory `./packages/db/seed/dummy` , these are required to get dropdowns data


## Swagger  documentation

  whole API documentation is given in this link [http://localhost:3000/docs/](http://localhost:3000/docs/) 


## Login into the app

  Before run the project you need to create a .env file at the root of the project inside this file, add the `AUTH_KEY` variable, when there is a request to the login endpoint `/login` API will check if this env var match with the password sent through the body request.

  In the frontend app, we also have to create the same env var, and the value of these two has to be the same.
  There are two ways to login into the app, for more information refer to the frontend's app readme [https://github.globant.com/miller-gonzalez/salesforce-reporter-app](https://github.globant.com/miller-gonzalez/salesforce-reporter-app)

  One of those need the setup and configuration of a salesforce org, to know more about it, read the official documentation on the next link [https://help.salesforce.com/articleView?id=setup_overview.htm&type=5](https://help.salesforce.com/articleView?id=setup_overview.htm&type=5)

  Remind that Heroku has its way to set the env vars and applies to test and production environments.
