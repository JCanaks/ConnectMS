import authenticateUser from '../utils/middleware/authMiddleware';

export const typeDef = `
extend type Query {
    allSMS: SMSList
    sms(id: ID!): SMS
}

type SMSList {
    smses: [SMS!]!
    count: Int!
}

extend type Mutation {
    createSMS(reciever: String!, message: String!): SMS
    deleteSMS(id: ID!): SMS
}

type SMS {
    id: ID!
    sender: Contact
    reciever: Contact
    message: String!
    status: String!
}`;

export const resolvers = {
  Query: {
    allSMS: async (parent, args, context) => {
      const smses = await context.prisma.sMses();
      const count = await context.prisma.sMsesConnection().aggregate().count();

      return {
        count,
        smses,
      };
    },
    sms: (parent, args, context) => context.prisma.sMS({ id: args.id }),
  },
  Mutation: {
    createSMS: (parent, args, context) => context.prisma.createSMS({
      reciever: { connect: { phoneNumber: args.reciever } },
      sender: { connect: { phoneNumber: context.userInfo.phoneNumber } },
      message: args.message,
      status: 'SENT',
    }),
    deleteSMS: (parent, args, context) => context.prisma.deleteSMS({
      id: args.id,
    }),
  },
  SMS: {
    sender: (parent, args, context) => context.prisma.sMS({
      id: parent.id,
    }).sender(),

    reciever: (parent, args, context) => context.prisma.sMS({
      id: parent.id,
    }).reciever(),
  },
};
export const middleware = {
  Query: {
    allSMS: authenticateUser,
    sms: authenticateUser,
  },
  Mutation: {
    deleteSMS: authenticateUser,
    createSMS: authenticateUser,
  },
};
