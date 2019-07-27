"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var prisma_lib_1 = require("prisma-client-lib");
var typeDefs = require("./prisma-schema").typeDefs;

var models = [
  {
    name: "Contact",
    embedded: false
  },
  {
    name: "SMS",
    embedded: false
  }
];
exports.Prisma = prisma_lib_1.makePrismaClientClass({
  typeDefs,
  models,
  endpoint: `https://connectms-service-27659883e0.herokuapp.com/connectms/dev`
});
exports.prisma = new exports.Prisma();
