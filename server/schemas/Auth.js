import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import 'dotenv/config';

const { APP_SECRET } = process.env;

export const typeDef = `
extend type Mutation {
    signup(name: String!, phoneNumber: String!, password: String!): AuthPayload
    login(phoneNumber: String!, password: String!): AuthPayload
}

type AuthPayload {
    token: String
    user: Contact
}`;

export const resolvers = {
  Mutation: {
    signup: async (parent, args, context) => {
      const password = await bcrypt.hash(args.password, 10);
      const user = await context.prisma.createContact({ ...args, password });
      const token = jwt.sign({ userId: user.id }, APP_SECRET, { expiresIn: '3h' });

      return {
        token,
        user,
      };
    },
    login: async (parent, args, context) => {
      const user = await context.prisma.contact({ phoneNumber: args.phoneNumber });

      if (!user) {
        throw new Error('No such user found');
      }

      const valid = await bcrypt.compare(args.password, user.password);
      if (!valid) {
        throw new Error('Invalid Password');
      }

      const token = jwt.sign({ userId: user.id }, APP_SECRET, { expiresIn: '3h' });

      return {
        token,
        user,
      };
    },
  },
};
