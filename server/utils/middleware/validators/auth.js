import validator from '../../helpers/validatorHelper';

const signup = async (resolve, parent, args, context, info) => {
  const signupInput = {
    name: args.name,
    phoneNumber: args.phoneNumber,
    password: args.password,
  };
  const validation = validator.signupRules(signupInput);

  if (validation) {
    throw new Error(JSON.stringify(validation));
  }

  const result = await resolve(parent, args, context, info);
  return result;
};

const login = async (resolve, parent, args, context, info) => {
  const loginInput = {
    phoneNumber: args.phoneNumber,
    password: args.password,
  };

  const validation = validator.loginRules(loginInput);
  if (validation) {
    throw new Error(JSON.stringify(validation));
  }

  const result = await resolve(parent, args, context, info);
  return result;
};

export default {
  signup,
  login,
};
