import 'dotenv/config';
import jwt from 'jsonwebtoken';

const { APP_SECRET } = process.env;

const authenticateUser = async (resolve, parent, args, context, info) => {
  const Authorization = context.request.get('Authorization');

  if (Authorization) {
    const token = Authorization.replace('Bearer ', '');
    const { userId } = jwt.verify(token, APP_SECRET);
    context.userId = userId;
    const result = await resolve(parent, args, context, info);
    return result;
  }
  throw new Error('Not Autheticated');
};

export default authenticateUser;
