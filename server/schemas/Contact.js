import authenticateUser from '../utils/middleware/authMiddleware';
import contactValidation from '../utils/middleware/validators/contact';

export const typeDef = `
extend type Query {
    allContacts: ContactList
    contact(phoneNumber: String!): Contact
}

type ContactList {
    contacts: [Contact!]!
    count: Int!
}

extend type Mutation {
    updateContact(id: ID!, name: String, phoneNumber: String): Contact
    deleteContact(phoneNumber: String!): Contact
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
        count,
        contacts,
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
  Contact: {
    sentMessages: async (parent, args, context) => context.prisma.sMses({
      where: {
        sender: await context.prisma.contact({
          id: parent.id,
        }),
      },
    }),
    recievedMessages: async (parent, args, context) => context.prisma.sMses({
      where: {
        reciever: await context.prisma.contact({
          id: parent.id,
        }),
      },
    }),
  },
};

export const contactAuthmiddleware = {
  Query: {
    allContacts: authenticateUser,
    contact: authenticateUser,
  },
  Mutation: {
    updateContact: authenticateUser,
    deleteContact: authenticateUser,
  },
};

export const contactValidationMiddleware = {
  Query: {
    contact: contactValidation.getSingleContact,
  },
  Mutation: {
    updateContact: contactValidation.updateContact,
    deleteContact: contactValidation.deleteContact,
  },
};
