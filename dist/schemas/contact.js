"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.contactValidationMiddleware = exports.contactAuthmiddleware = exports.resolvers = exports.typeDef = void 0;

var _authMiddleware = _interopRequireDefault(require("../utils/middleware/authMiddleware"));

var _contact = _interopRequireDefault(require("../utils/middleware/validators/contact"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var typeDef = "\nextend type Query {\n    allContacts: ContactList\n    contact(phoneNumber: String!): Contact\n}\n\ntype ContactList {\n    contacts: [Contact!]!\n    count: Int!\n}\n\nextend type Mutation {\n    updateContact(id: ID!, name: String, phoneNumber: String): Contact\n    deleteContact(phoneNumber: String!): Contact\n}\n\ntype Contact {\n    id: ID!\n    name: String!\n    password: String!\n    phoneNumber: String!\n    sentMessages: [SMS]\n    recievedMessages: [SMS]\n}";
exports.typeDef = typeDef;
var resolvers = {
  Query: {
    allContacts: function () {
      var _allContacts = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(parent, args, context) {
        var contacts, count;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return context.prisma.contacts();

              case 2:
                contacts = _context.sent;
                _context.next = 5;
                return context.prisma.contactsConnection().aggregate().count();

              case 5:
                count = _context.sent;
                return _context.abrupt("return", {
                  count: count,
                  contacts: contacts
                });

              case 7:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function allContacts(_x, _x2, _x3) {
        return _allContacts.apply(this, arguments);
      }

      return allContacts;
    }(),
    contact: function contact(parent, args, context) {
      return context.prisma.contact({
        phoneNumber: args.phoneNumber
      });
    }
  },
  Mutation: {
    updateContact: function () {
      var _updateContact = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(parent, args, context) {
        var currentContact;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return context.prisma.contact({
                  id: args.id
                });

              case 2:
                currentContact = _context2.sent;
                return _context2.abrupt("return", context.prisma.updateContact({
                  data: {
                    name: args.name ? args.name : currentContact.name,
                    phoneNumber: args.phoneNumber ? args.phoneNumber : currentContact.phoneNumber
                  },
                  where: {
                    id: args.id
                  }
                }));

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function updateContact(_x4, _x5, _x6) {
        return _updateContact.apply(this, arguments);
      }

      return updateContact;
    }(),
    deleteContact: function deleteContact(parent, args, context) {
      return context.prisma.deleteContact({
        phoneNumber: args.phoneNumber
      });
    }
  },
  Contact: {
    sentMessages: function () {
      var _sentMessages = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(parent, args, context) {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.t0 = context.prisma;
                _context3.next = 3;
                return context.prisma.contact({
                  id: parent.id
                });

              case 3:
                _context3.t1 = _context3.sent;
                _context3.t2 = {
                  sender: _context3.t1
                };
                _context3.t3 = {
                  where: _context3.t2
                };
                return _context3.abrupt("return", _context3.t0.sMses.call(_context3.t0, _context3.t3));

              case 7:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function sentMessages(_x7, _x8, _x9) {
        return _sentMessages.apply(this, arguments);
      }

      return sentMessages;
    }(),
    recievedMessages: function () {
      var _recievedMessages = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4(parent, args, context) {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.t0 = context.prisma;
                _context4.next = 3;
                return context.prisma.contact({
                  id: parent.id
                });

              case 3:
                _context4.t1 = _context4.sent;
                _context4.t2 = {
                  reciever: _context4.t1
                };
                _context4.t3 = {
                  where: _context4.t2
                };
                return _context4.abrupt("return", _context4.t0.sMses.call(_context4.t0, _context4.t3));

              case 7:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      function recievedMessages(_x10, _x11, _x12) {
        return _recievedMessages.apply(this, arguments);
      }

      return recievedMessages;
    }()
  }
};
exports.resolvers = resolvers;
var contactAuthmiddleware = {
  Query: {
    allContacts: _authMiddleware["default"],
    contact: _authMiddleware["default"]
  },
  Mutation: {
    updateContact: _authMiddleware["default"],
    deleteContact: _authMiddleware["default"]
  }
};
exports.contactAuthmiddleware = contactAuthmiddleware;
var contactValidationMiddleware = {
  Query: {
    contact: _contact["default"].getSingleContact
  },
  Mutation: {
    updateContact: _contact["default"].updateContact,
    deleteContact: _contact["default"].deleteContact
  }
};
exports.contactValidationMiddleware = contactValidationMiddleware;