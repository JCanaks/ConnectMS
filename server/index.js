import { GraphQLServer } from 'graphql-yoga';
import { merge } from 'lodash';
import { prisma } from './generated/prisma-client';
import { typeDef as Auth, resolvers as authResolvers } from './schemas/Auth';
import { typeDef as Contact, resolvers as contactResolvers, middleware as contactMiddleware } from './schemas/Contact';
import { typeDef as Sms, resolvers as smsResolvers, middleware as smsMiddleware } from './schemas/Sms';


const Query = `
type Query {
    info: String!
  }`;

const Mutation = `
type Mutation {
  _empty: String,
}`;

const resolvers = {
  Query: {
    info: () => 'Welcome to ConnectMS, the simple SMS application API',
  },
};

const middlewares = [contactMiddleware, smsMiddleware];

const server = new GraphQLServer({
  typeDefs: [Query, Mutation, Auth, Contact, Sms],
  resolvers: merge(resolvers, authResolvers, contactResolvers, smsResolvers),
  context: request => ({
    ...request,
    prisma,
  }),
  middlewares,
});
server.start(() => console.log('Server is running on http://localhost:4000'));
