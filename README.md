# ConnectMS
**ConnectMS** is a simple SMS management API built with GraphQL. It is a project designed to simulate an SMS messaging service. The system is built around two main models, the `Contact` model and the `SMS` model (see `API Docs` section belows to view details of these models ).

The following relationships are modelled between the Contact and the SMS Model:
* All sms sent by a Contact should be linked to them
* All sms sent to a Contact should be linked to them
* Deleting a contact removes the messages they sent and references to messages they received.

Several CRUD actions can also be performed on the models as well.

## Technologies Used
* [graphql-yoga](https://github.com/prisma/graphql-yoga): which is based on the following libraries and tools:
    * [apollo-server](https://github.com/apollographql/apollo-server)
    * [subscriptions-transport-ws](https://github.com/apollographql/subscriptions-transport-ws) (graphql Subscriptions)
    * [graphql-tools](https://github.com/apollographql/graphql-tools)
    * [graphql-playground](https://github.com/graphcool/graphql-playground)
* [Prisma](https://www.prisma.io/)
* [Node](https://nodejs.org/)
* [validatorjs](https://www.npmjs.com/package/validatorjs)

## Getting Started
### Dependencies
The following needs to be installed on your system to setup up the application:
* [Nodejs](https://nodejs.org/en/download/current/)
* [Git](https://git-scm.com/downloads)
* [Docker](https://www.docker.com/products/container-runtime) (To deploy Prisma locally)
### Setup
The following steps can be taken to setup this application locally
#### 1. Clone the Repository
```
git clone https://github.com/JCanaks/ConnectMS.git
```

#### 2. Move into the project directory
```
cd connectms
```

#### 3. Create an env file and update env variables
Run the following command to create an env file using the example env file provided 
```
cp .env.example .env
```
You can now update the values for env variables used in the application
#### 4. Install Dependencies
```
npm install
```
#### 5. Install the Prisma CLI
```
npm install -g prisma
```

#### 6. Deploy Prisma and database
[Prisma](https://www.prisma.io/) powers the database layer of the application and connects to the GraphQL Server via the [Prisma Client](https://www.prisma.io/docs/prisma-client).

In this application Prisma is deployed locally using a Postgres database (Note: You would need Docker installed in order to set this up. See `docker-compose.yml` file at the root of this project). 

To achieve this, run the following command below to start up Prisma and launch the connected database according to the specifications in the `docker-compose.yml` file at the root of this project.

```
docker-compose up -d
```


Once that is completed, deploy the prisma datamodel by running the following command:  

```
prisma deploy
```
Prisma  is now connected to a local database and runs on `http://localhost:4477`
You can use the [Prisma Admin](https://www.prisma.io/docs/prisma-admin/overview-el3e/) to view and edit the data in your database. To access the Prisma Admin use the following url -- `http://localhost:4477/_admin`

##### Prisma Admin view
![Prisma Admin view](docs/prisma-admin.png?raw=true "Prisma Admin view")

For more details on setting up Prisma locally please click [here](https://www.prisma.io/docs/1.34/get-started/01-setting-up-prisma-new-database-JAVASCRIPT-a002/) to view setup details in the Prisma Docs

**Note:** Prisma can also be deployed using a free demo database that is hosted in Prisma Cloud. Click [here](https://www.prisma.io/docs/get-started/01-setting-up-prisma-demo-server-JAVASCRIPT-a001/) to learn more about deploying Prisma using Prisma Cloud.  

#### 7. Start the server and launch the Graphql Playground
Run the following command to start the GraphQL server:
```
npm start
```

Navigate to `http://localhost:4000` to test the GraphQL API with the GraphQL playground and you are good to go :tada::tada:.

##### GraphQL playground with a sample signup query

![GraphQL playground with a sample signup query](docs/signup-query.png?raw=true "GraphQL playground with a sample signup query")


### API Docs
The GraphQL Playground is a powerful GraphQl IDE that helps you work interactively with the GraphQL API. One of its cool features is the documentation explorer which enables you visualize the structure of the GraphQL schema. This self documenting GraphQL feature enables you to easily understand the schema structure of the application and the structure of the data to be returned when writing GraphQL queries. This documentation can be accessed by clicking on the `DOCS` tab on the right side of the playground 

##### API Docs showing the structure of the Contact and SMS model
![API Docs](docs/api-docs.png?raw=true "API Docs")

The schema of the application can also be viewed by clicking on the `SCHEMA` tab on the right side of the playground 

##### App schema

![App schema](docs/schema-docs.png?raw=true "App schema")

### Author
- Jane C. Anaekwe - [@JCanaks](https://github.com/JCanaks)