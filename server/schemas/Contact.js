import authenticateUser from '../utils/middleware/authMiddleware';

export const typeDef = `
extend type Query {
    allContacts: ContactList
}

type ContactList {
    contacts: [Contact!]!
    count: Int!
}

type Contact {
    id: ID!
    name: String!
    password: String!
    phoneNumber: String!
    sentMessages: [SMS]
    recievedMessages: [SMS]
}`;

export const resolvers = {
  Query: {
    allContacts: async (parent, args, context, info) => {
      const contacts = await context.prisma.contacts();
      const count = await context.prisma.contactsConnection().aggregate().count();

      return {
        contacts,
        count,
      };
    },
  },
};

export const middleware = {
  Query: {
    allContacts: authenticateUser,
  },
};
