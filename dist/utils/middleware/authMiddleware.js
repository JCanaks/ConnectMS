"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("dotenv/config");

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var APP_SECRET = process.env.APP_SECRET;

var authenticateUser =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(resolve, parent, args, context, info) {
    var Authorization, token, _jwt$verify, userId, phoneNumber, result;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            Authorization = context.request.get('Authorization');

            if (!Authorization) {
              _context.next = 9;
              break;
            }

            token = Authorization.replace('Bearer ', '');
            _jwt$verify = _jsonwebtoken["default"].verify(token, APP_SECRET), userId = _jwt$verify.userId, phoneNumber = _jwt$verify.phoneNumber; // eslint-disable-next-line no-param-reassign

            context.userInfo = {
              userId: userId,
              phoneNumber: phoneNumber
            };
            _context.next = 7;
            return resolve(parent, args, context, info);

          case 7:
            result = _context.sent;
            return _context.abrupt("return", result);

          case 9:
            throw new Error('Not Autheticated');

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function authenticateUser(_x, _x2, _x3, _x4, _x5) {
    return _ref.apply(this, arguments);
  };
}();

var _default = authenticateUser;
exports["default"] = _default;