"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _validatorHelper = _interopRequireDefault(require("../../helpers/validatorHelper"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var getSingleContact =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(resolve, parent, args, context, info) {
    var contactInput, validation, result;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            contactInput = {
              phoneNumber: args.phoneNumber
            };
            validation = _validatorHelper["default"].getSingleContactRules(contactInput);

            if (!validation) {
              _context.next = 4;
              break;
            }

            throw new Error(JSON.stringify(validation));

          case 4:
            _context.next = 6;
            return resolve(parent, args, context, info);

          case 6:
            result = _context.sent;
            return _context.abrupt("return", result);

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function getSingleContact(_x, _x2, _x3, _x4, _x5) {
    return _ref.apply(this, arguments);
  };
}();

var updateContact =
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(resolve, parent, args, context, info) {
    var contactInput, validation, result;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            contactInput = {
              id: args.id,
              name: args.name,
              phoneNumber: args.phoneNumber
            };
            validation = _validatorHelper["default"].updateContactRules(contactInput);

            if (!validation) {
              _context2.next = 4;
              break;
            }

            throw new Error(JSON.stringify(validation));

          case 4:
            _context2.next = 6;
            return resolve(parent, args, context, info);

          case 6:
            result = _context2.sent;
            return _context2.abrupt("return", result);

          case 8:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function updateContact(_x6, _x7, _x8, _x9, _x10) {
    return _ref2.apply(this, arguments);
  };
}();

var deleteContact =
/*#__PURE__*/
function () {
  var _ref3 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3(resolve, parent, args, context, info) {
    var contactInput, validation, result;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            contactInput = {
              phoneNumber: args.phoneNumber
            };
            validation = _validatorHelper["default"].deleteContactRules(contactInput);

            if (!validation) {
              _context3.next = 4;
              break;
            }

            throw new Error(JSON.stringify(validation));

          case 4:
            _context3.next = 6;
            return resolve(parent, args, context, info);

          case 6:
            result = _context3.sent;
            return _context3.abrupt("return", result);

          case 8:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function deleteContact(_x11, _x12, _x13, _x14, _x15) {
    return _ref3.apply(this, arguments);
  };
}();

var _default = {
  getSingleContact: getSingleContact,
  deleteContact: deleteContact,
  updateContact: updateContact
};
exports["default"] = _default;