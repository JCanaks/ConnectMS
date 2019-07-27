"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authValidationMiddleware = exports.resolvers = exports.typeDef = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

require("dotenv/config");

var _auth = _interopRequireDefault(require("../utils/middleware/validators/auth"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { keys.push.apply(keys, Object.getOwnPropertySymbols(object)); } if (enumerableOnly) keys = keys.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var APP_SECRET = process.env.APP_SECRET;
var typeDef = "\nextend type Mutation {\n    signup(name: String!, phoneNumber: String!, password: String!): AuthPayload\n    login(phoneNumber: String!, password: String!): AuthPayload\n}\n\ntype AuthPayload {\n    token: String\n    user: Contact\n}";
exports.typeDef = typeDef;
var resolvers = {
  Mutation: {
    signup: function () {
      var _signup = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(parent, args, context) {
        var password, user, token;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _bcryptjs["default"].hash(args.password, 10);

              case 2:
                password = _context.sent;
                _context.next = 5;
                return context.prisma.createContact(_objectSpread({}, args, {
                  password: password
                }));

              case 5:
                user = _context.sent;
                token = _jsonwebtoken["default"].sign({
                  userId: user.id,
                  phoneNumber: user.phoneNumber
                }, APP_SECRET, {
                  expiresIn: '3h'
                });
                return _context.abrupt("return", {
                  token: token,
                  user: user
                });

              case 8:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function signup(_x, _x2, _x3) {
        return _signup.apply(this, arguments);
      }

      return signup;
    }(),
    login: function () {
      var _login = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(parent, args, context) {
        var user, valid, token;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return context.prisma.contact({
                  phoneNumber: args.phoneNumber
                });

              case 2:
                user = _context2.sent;

                if (user) {
                  _context2.next = 5;
                  break;
                }

                throw new Error('No such user found');

              case 5:
                _context2.next = 7;
                return _bcryptjs["default"].compare(args.password, user.password);

              case 7:
                valid = _context2.sent;

                if (valid) {
                  _context2.next = 10;
                  break;
                }

                throw new Error('Invalid Password');

              case 10:
                token = _jsonwebtoken["default"].sign({
                  userId: user.id,
                  phoneNumber: user.phoneNumber
                }, APP_SECRET, {
                  expiresIn: '3h'
                });
                return _context2.abrupt("return", {
                  token: token,
                  user: user
                });

              case 12:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function login(_x4, _x5, _x6) {
        return _login.apply(this, arguments);
      }

      return login;
    }()
  }
};
exports.resolvers = resolvers;
var authValidationMiddleware = {
  Mutation: {
    signup: _auth["default"].signup,
    login: _auth["default"].login
  }
};
exports.authValidationMiddleware = authValidationMiddleware;