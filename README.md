# Feel Good About Yourself

An app which randomly generates positive thoughts that users can rate. Users can add, edit, and delete the thoughts in their profile.

* Live Demo: https://infinite-ravine-73596.herokuapp.com/#/?_k=42f42z
* GitHub: https://github.com/surbhiposwalia/FeelGoodAboutYourself

## Getting started

### Working on the project

* Move into the project directory: `cd ~/YOUR_PROJECTS_DIRECTORY/YOUR_PROJECT_NAME`
* Run the development task: `npm run dev`
    * Starts a server running at http://localhost:8080
    * Automatically rebuilds when any of your files change

## Directory layout

```
.
├── client      Client-side code
│   ├── assets  Images, videos, etc.
│   ├── js      JavaScript
│   └── scss    SASS stylesheets
├── server      Server-side code
└── test        Tests
    ├── client  Client tests
    └── server  Server tests
```

## Deployment

Requires the [Heroku CLI client](https://devcenter.heroku.com/articles/heroku-command-line).

### Setting up the project on Heroku

* Move into the project directory: `cd ~/YOUR_PROJECTS_DIRECTORY/YOUR_PROJECT_NAME`
* Create the Heroku app: `heroku create PROJECT_NAME`
* Instruct Heroku to install the development dependencies: `heroku config:set NPM_CONFIG_PRODUCTION=false`

### Deploying to Heroku

* Push your code to Heroku: `git push heroku master`


### Create a new mlab database

* Log in to https://mlab.com/
* Create a new database by pressing Create new
* On plan, click Single-node
* Check Sandbox (It's the free one)
* Scroll down to Database Name and enter your name of choice
* Press Create new MongoDB deployment

### Link your mlab database to your project

* On your mlab dashboard, click the database that you would like to use
* Press Users
* Press Add database user
* Type in credentials that you will remember and press Create
* Copy and paste the link at the top that looks something like this: mongodb://<dbuser>:<dbpassword>@ds117929.mlab.com:17929/dbname
* In the heroku command line, set the database uri: heroku config:set DATABASE_URI=mongodb://<dbuser>:<dbpassword>@ds117929.mlab.com:17929/dbname