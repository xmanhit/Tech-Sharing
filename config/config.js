const Ajv = require("ajv");
const ajv = new Ajv({ allErrors: true, coerceTypes: true });
// const envSchema = require("env-schema");
// require and configure dotenv, will load vars in .env in PROCESS.ENV
require("dotenv").config();


// define validation for all the env vars
const schema = {
  required: ["jwtSecret"],
  properties: {
    env: {
      type: "string",
      enum: ["development", "production", "test"],
      default: "development",
    },
    port: { type: "number", default: 4040 },
    mongooseDebug: {
      type: "boolean",
      if: { properties: { env: { const: "development" } } },
      then: { default: true },
      else: { default: false },
    },
    jwtSecret: {
      type: "string",
      description: "JWT Secret required to sign",
    },
    mongo: {
      type: "object",
      required: ["host"],
      host: {
        type: "string",
        description: "Mongo DB host url",
      },
      port: {
        type: "number",
        default: 27017,
      },
    },
  },
};


const config = {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  mongooseDebug: process.env.MONGOOSE_DEBUG,
  jwtSecret: process.env.JWT_SECRET,
  mongo: {
    host: process.env.MONGO_HOST,
    port: process.env.MONGO_PORT,
  },
};

var validate = ajv.compile(schema);
var valid = validate(config);

if (!valid) {
  throw new Error("Invalid: " + ajv.errorsText(validate.errors));
}


module.exports = config;