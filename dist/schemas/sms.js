"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.smsValidationMiddleware = exports.smsAuthMiddleware = exports.resolvers = exports.typeDef = void 0;

var _authMiddleware = _interopRequireDefault(require("../utils/middleware/authMiddleware"));

var _sms = _interopRequireDefault(require("../utils/middleware/validators/sms"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var typeDef = "\nextend type Query {\n    allSMS: SMSList\n    sms(id: ID!): SMS\n}\n\ntype SMSList {\n    smses: [SMS!]!\n    count: Int!\n}\n\nextend type Mutation {\n    createSMS(recieverPhoneNumber: String!, message: String!): SMS\n    deleteSMS(id: ID!): SMS\n}\n\ntype SMS {\n    id: ID!\n    sender: Contact\n    reciever: Contact\n    message: String!\n    status: String!\n}";
exports.typeDef = typeDef;
var resolvers = {
  Query: {
    allSMS: function () {
      var _allSMS = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(parent, args, context) {
        var smses, count;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return context.prisma.sMses();

              case 2:
                smses = _context.sent;
                _context.next = 5;
                return context.prisma.sMsesConnection().aggregate().count();

              case 5:
                count = _context.sent;
                return _context.abrupt("return", {
                  count: count,
                  smses: smses
                });

              case 7:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function allSMS(_x, _x2, _x3) {
        return _allSMS.apply(this, arguments);
      }

      return allSMS;
    }(),
    sms: function sms(parent, args, context) {
      return context.prisma.sMS({
        id: args.id
      });
    }
  },
  Mutation: {
    createSMS: function createSMS(parent, args, context) {
      return context.prisma.createSMS({
        reciever: {
          connect: {
            phoneNumber: args.recieverPhoneNumber
          }
        },
        sender: {
          connect: {
            phoneNumber: context.userInfo.phoneNumber
          }
        },
        message: args.message,
        status: 'SENT'
      });
    },
    deleteSMS: function deleteSMS(parent, args, context) {
      return context.prisma.deleteSMS({
        id: args.id
      });
    }
  },
  SMS: {
    sender: function sender(parent, args, context) {
      return context.prisma.sMS({
        id: parent.id
      }).sender();
    },
    reciever: function reciever(parent, args, context) {
      return context.prisma.sMS({
        id: parent.id
      }).reciever();
    }
  }
};
exports.resolvers = resolvers;
var smsAuthMiddleware = {
  Query: {
    allSMS: _authMiddleware["default"],
    sms: _authMiddleware["default"]
  },
  Mutation: {
    createSMS: _authMiddleware["default"],
    deleteSMS: _authMiddleware["default"]
  }
};
exports.smsAuthMiddleware = smsAuthMiddleware;
var smsValidationMiddleware = {
  Query: {
    sms: _sms["default"].getSingleSms
  },
  Mutation: {
    createSMS: _sms["default"].createSms,
    deleteSMS: _sms["default"].deleteSms
  }
};
exports.smsValidationMiddleware = smsValidationMiddleware;