"use strict";

var _graphqlYoga = require("graphql-yoga");

var _lodash = require("lodash");

var _prismaClient = require("./generated/prisma-client");

var _auth = require("./schemas/auth");

var _contact = require("./schemas/contact");

var _sms = require("./schemas/sms");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { keys.push.apply(keys, Object.getOwnPropertySymbols(object)); } if (enumerableOnly) keys = keys.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Query = "\ntype Query {\n    info: String!\n  }";
var Mutation = "\ntype Mutation {\n  _empty: String,\n}";
var resolvers = {
  Query: {
    info: function info() {
      return 'Welcome to ConnectMS, the simple SMS application API';
    }
  }
};
var middlewares = [_contact.contactAuthmiddleware, _sms.smsAuthMiddleware, _auth.authValidationMiddleware, _contact.contactValidationMiddleware, _sms.smsValidationMiddleware];
var server = new _graphqlYoga.GraphQLServer({
  typeDefs: [Query, Mutation, _auth.typeDef, _contact.typeDef, _sms.typeDef],
  resolvers: (0, _lodash.merge)(resolvers, _auth.resolvers, _contact.resolvers, _sms.resolvers),
  context: function context(request) {
    return _objectSpread({}, request, {
      prisma: _prismaClient.prisma
    });
  },
  middlewares: middlewares
}); // eslint-disable-next-line no-console

server.start(function () {
  return console.log('Server is running on http://localhost:4000');
});