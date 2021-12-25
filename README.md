# Let's get started

Erling consists of a React app in the frontend and a pure ExpressJS API server in the backend.
Follow these instructions to get it up and running:

## API

### MongoDB

First we need a database running in the background to save data like login credential in order to properly operate the webapp.
For this, do the following:

> ``wget -qO - https://www.mongodb.org/static/pgp/server-5.0.asc | sudo apt-key add -``
>
> ``echo "deb http://repo.mongodb.org/apt/debian buster/mongodb-org/5.0 main" | sudo tee /etc/apt/sources.list.d/mongodb-org-5.0.list``
>
> ``sudo apt update``
>
> ``sudo apt install mongodb-org``

And finally to ensure the mongod service is up and running:

> ``sudo systemctl start mongod``

### Start server

Now you may run the server with:

> ``node app.js``

## Webapp

Simply run

> ``npm start``

and access your webapp on <http://localhost:3000>.