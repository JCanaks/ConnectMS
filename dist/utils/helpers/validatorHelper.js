"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _validatorjs = _interopRequireDefault(require("validatorjs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var validationErrors = {
  name: {
    required: 'Please enter a name in the specified field',
    min: 'Name should be a minimum of 2 characters',
    max: 'Name should have a maximum of 50 characters'
  },
  phoneNumber: {
    required: 'Please enter a phone number in the specified field',
    min: 'Phone number must be at least 6 characters',
    max: 'Phone number should have a maximum of 15 characters'
  },
  password: {
    required: 'Please enter a password in the specified field',
    min: 'Password must be at least 4 characters',
    max: 'Password should have a maximum of 50 characters'
  },
  id: {
    required: 'Please enter an id in the specified field'
  },
  recieverPhoneNumber: {
    required: 'Please enter the reciever\'s phone number in the specified field',
    min: 'Reciever\'s phone number must be at least 6 characters',
    max: 'Reciever\'s phone number should have a maximum of 15 characters'
  },
  message: {
    required: 'Please enter a message in the specified field'
  }
};

var signupRules = function signupRules(userInput) {
  var rules = {
    name: ['required', 'min:2', 'max:50'],
    phoneNumber: ['required', 'min:6', 'max:15'],
    password: ['required', 'min:4', 'max:50']
  };
  var validation = new _validatorjs["default"](userInput, rules, {
    'required.name': validationErrors.name.required,
    'required.phoneNumber': validationErrors.phoneNumber.required,
    'required.password': validationErrors.password.required,
    'min.name': validationErrors.name.min,
    'min.phoneNumber': validationErrors.phoneNumber.min,
    'min.password': validationErrors.password.min,
    'max.name': validationErrors.name.max,
    'max.phoneNumber': validationErrors.phoneNumber.max,
    'max.password': validationErrors.password.max
  });

  if (validation.fails()) {
    return validation.errors.all();
  }

  return false;
};

var loginRules = function loginRules(userInput) {
  var rules = {
    phoneNumber: ['required', 'min:6', 'max:15'],
    password: ['required', 'min:4', 'max:50']
  };
  var validation = new _validatorjs["default"](userInput, rules, {
    'required.phoneNumber': validationErrors.phoneNumber.required,
    'required.password': validationErrors.password.required,
    'min.phoneNumber': validationErrors.phoneNumber.min,
    'min.password': validationErrors.password.min,
    'max.phoneNumber': validationErrors.phoneNumber.max,
    'max.password': validationErrors.password.max
  });

  if (validation.fails()) {
    return validation.errors.all();
  }

  return false;
};

var getSingleContactRules = function getSingleContactRules(userInput) {
  var rules = {
    phoneNumber: ['required', 'min:6', 'max:15']
  };
  var validation = new _validatorjs["default"](userInput, rules, {
    'required.phoneNumber': validationErrors.phoneNumber.required,
    'min.phoneNumber': validationErrors.phoneNumber.min,
    'max.phoneNumber': validationErrors.phoneNumber.max
  });

  if (validation.fails()) {
    return validation.errors.all();
  }

  return false;
};

var updateContactRules = function updateContactRules(userInput) {
  var rules = {
    id: 'required',
    name: ['min:2', 'max:50'],
    phoneNumber: ['min:6', 'max:15']
  };
  var validation = new _validatorjs["default"](userInput, rules, {
    'required.id': validationErrors.id.required,
    'min.name': validationErrors.name.min,
    'min.phoneNumber': validationErrors.phoneNumber.min,
    'max.name': validationErrors.name.max,
    'max.phoneNumber': validationErrors.phoneNumber.max
  });

  if (validation.fails()) {
    return validation.errors.all();
  }

  return false;
};

var deleteContactRules = function deleteContactRules(userInput) {
  var rules = {
    phoneNumber: ['required', 'min:6', 'max:15']
  };
  var validation = new _validatorjs["default"](userInput, rules, {
    'required.phoneNumber': validationErrors.phoneNumber.required,
    'min.phoneNumber': validationErrors.phoneNumber.min,
    'max.phoneNumber': validationErrors.phoneNumber.max
  });

  if (validation.fails()) {
    return validation.errors.all();
  }

  return false;
};

var getSingleSmsRules = function getSingleSmsRules(userInput) {
  var rules = {
    id: 'required'
  };
  var validation = new _validatorjs["default"](userInput, rules, {
    'required.id': validationErrors.id.required
  });

  if (validation.fails()) {
    return validation.errors.all();
  }

  return false;
};

var createSmsRules = function createSmsRules(userInput) {
  var rules = {
    recieverPhoneNumber: ['required', 'min:6', 'max:15'],
    message: 'required'
  };
  var validation = new _validatorjs["default"](userInput, rules, {
    'required.recieverPhoneNumber': validationErrors.recieverPhoneNumber.required,
    'required.message': validationErrors.message.required,
    'min.recieverPhoneNumber': validationErrors.recieverPhoneNumber.min,
    'max.recieverPhoneNumber': validationErrors.recieverPhoneNumber.max
  });

  if (validation.fails()) {
    return validation.errors.all();
  }

  return false;
};

var deleteSmsRules = function deleteSmsRules(userInput) {
  var rules = {
    id: 'required'
  };
  var validation = new _validatorjs["default"](userInput, rules, {
    'required.id': validationErrors.id.required
  });

  if (validation.fails()) {
    return validation.errors.all();
  }

  return false;
};

var _default = {
  signupRules: signupRules,
  loginRules: loginRules,
  getSingleContactRules: getSingleContactRules,
  updateContactRules: updateContactRules,
  deleteContactRules: deleteContactRules,
  getSingleSmsRules: getSingleSmsRules,
  createSmsRules: createSmsRules,
  deleteSmsRules: deleteSmsRules
};
exports["default"] = _default;