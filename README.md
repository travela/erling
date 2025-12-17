# Let's get started

Erling consists of a React app in the frontend and a pure ExpressJS API server in the backend.
Follow these instructions to get it up and running:

## API

### MongoDB

First we need a database running in the background to save data like login credential in order to properly operate the webapp.
For this, do the following:

> ``sudo apt update``

> ``sudo apt install -y docker.io``

> ``sudo systemctl enable --now docker``


> ``docker run -d \
  --name mongodb \
  -p 27017:27017 \
  -e MONGO_INITDB_ROOT_USERNAME=admin \
  -e MONGO_INITDB_ROOT_PASSWORD=password123 \
  -v mongodb_data:/data/db \
  mongo:8.0
  ``


And finally to ensure the mongod service is up and running:

> ``sudo systemctl start mongod``

### Start server

Now, from within the api directory, you may run the server with:

> ``node app.js``

## Webapp

From within the webapp directory, simply run

> ``npm start``

and access your webapp on <http://localhost:3000>.
