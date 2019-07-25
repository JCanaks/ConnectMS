import validator from '../../helpers/validatorHelper';

const getSingleSms = async (resolve, parent, args, context, info) => {
  const smsInput = {
    id: args.id,
  };

  const validation = validator.getSingleSmsRules(smsInput);
  if (validation) {
    throw new Error(JSON.stringify(validation));
  }

  const result = await resolve(parent, args, context, info);
  return result;
};

const createSms = async (resolve, parent, args, context, info) => {
  const smsInput = {
    recieverPhoneNumber: args.recieverPhoneNumber,
    message: args.message,
  };

  const validation = validator.createSmsRules(smsInput);
  if (validation) {
    throw new Error(JSON.stringify(validation));
  }

  const result = await resolve(parent, args, context, info);
  return result;
};


const deleteSms = async (resolve, parent, args, context, info) => {
  const smsInput = {
    id: args.id,
  };

  const validation = validator.deleteSmsRules(smsInput);
  if (validation) {
    throw new Error(JSON.stringify(validation));
  }

  const result = await resolve(parent, args, context, info);
  return result;
};


export default {
  getSingleSms,
  createSms,
  deleteSms,
};
