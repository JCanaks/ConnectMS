import { GraphQLServer } from 'graphql-yoga';

const typeDefs = `
type Query {
    info: String!
  }

type Contact {
    id: ID!
    name: String!
    phonenumber: String!
    sentMessages: [SMS!]!
    recievedMessages: [SMS!]!
}

type SMS {
    id: ID!
    sender: Contact
    reciever: Contact
    message: String!
    status: String!
}`;

const resolvers = {
  Query: {
    info: () => 'Welcome to ConnectMS, the simple SMS application API',
  },
};

const server = new GraphQLServer({
  typeDefs,
  resolvers,
});
server.start(() => console.log('Server is running on http://localhost:4000'));
