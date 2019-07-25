import validator from '../../helpers/validatorHelper';

const getSingleContact = async (resolve, parent, args, context, info) => {
  const contactInput = {
    phoneNumber: args.phoneNumber,
  };

  const validation = validator.getSingleContactRules(contactInput);
  if (validation) {
    throw new Error(JSON.stringify(validation));
  }

  const result = await resolve(parent, args, context, info);
  return result;
};

const updateContact = async (resolve, parent, args, context, info) => {
  const contactInput = {
    id: args.id,
    name: args.name,
    phoneNumber: args.phoneNumber,
  };

  const validation = validator.updateContactRules(contactInput);
  if (validation) {
    throw new Error(JSON.stringify(validation));
  }

  const result = await resolve(parent, args, context, info);
  return result;
};


const deleteContact = async (resolve, parent, args, context, info) => {
  const contactInput = {
    phoneNumber: args.phoneNumber,
  };

  const validation = validator.deleteContactRules(contactInput);
  if (validation) {
    throw new Error(JSON.stringify(validation));
  }

  const result = await resolve(parent, args, context, info);
  return result;
};


export default {
  getSingleContact,
  deleteContact,
  updateContact,
};
