import gql from 'graphql-tag';

export const typeDef = gql`
type SMS {
    id: ID!
    sender: Contact
    reciever: Contact
    message: String!
    status: String!
}`;

export const resolvers = {};
