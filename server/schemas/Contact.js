import gql from 'graphql-tag';

export const typeDef = gql`
type Contact {
    id: ID!
    name: String!
    password: String!
    phoneNumber: String!
    sentMessages: [SMS]
    recievedMessages: [SMS]
}`;

export const resolvers = {};
