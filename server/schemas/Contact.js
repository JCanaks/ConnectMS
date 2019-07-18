import authenticateUser from '../utils/middleware/authMiddleware';

export const typeDef = `
extend type Query {
    allContacts: ContactList
    contact(phoneNumber: String!): Contact
}

extend type Mutation {
    updateContact(id: ID!, name: String, phoneNumber: String): Contact
    deleteContact(phoneNumber: String!): Contact
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
    allContacts: async (parent, args, context) => {
      const contacts = await context.prisma.contacts();
      const count = await context.prisma.contactsConnection().aggregate().count();

      return {
        contacts,
        count,
      };
    },
    contact: (parent, args, context) => context.prisma.contact({
      phoneNumber: args.phoneNumber,
    }),
  },
  Mutation: {
    updateContact: async (parent, args, context) => {
      const currentContact = await context.prisma.contact({
        id: args.id,
      });

      return context.prisma.updateContact({
        data: {
          name: args.name ? args.name : currentContact.name,
          phoneNumber: args.phoneNumber ? args.phoneNumber : currentContact.phoneNumber,
        },
        where: {
          id: args.id,
        },
      });
    },
    deleteContact: (parent, args, context) => context.prisma.deleteContact({
      phoneNumber: args.phoneNumber,
    }),
  },
};

export const middleware = {
  Query: {
    allContacts: authenticateUser,
    contact: authenticateUser,
  },
  Mutation: {
    updateContact: authenticateUser,
    deleteContact: authenticateUser,
  },
};
