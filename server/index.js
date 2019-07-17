import { GraphQLServer } from 'graphql-yoga';
import gql from 'graphql-tag';
import { merge } from 'lodash';
import { prisma } from './generated/prisma-client';
import { typeDef as Auth, resolvers as authResolvers } from './schemas/Auth';
import { typeDef as Contact } from './schemas/Contact';
import { typeDef as Sms } from './schemas/Sms';


const Query = gql`
type Query {
    info: String!
  }`;

const Mutation = gql`
type Mutation {
  _empty: String,
}`;

const resolvers = {
  Query: {
    info: () => 'Welcome to ConnectMS, the simple SMS application API',
  },
};

const server = new GraphQLServer({
  typeDefs: [Query, Mutation, Auth, Contact, Sms],
  resolvers: merge(resolvers, authResolvers),
  context: request => ({
    ...request,
    prisma,
  }),
});
server.start(() => console.log('Server is running on http://localhost:4000'));
