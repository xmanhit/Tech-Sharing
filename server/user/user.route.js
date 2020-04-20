const express = require('express');

const userCtrl = require('./user.controller');
const paramValidation = require("../../config/param-validation");
var { Validator } = require("express-ajsv-middleware");
var validator = new Validator({ allErrors: true }); // pass in options to the Ajv instance

const router = express.Router(); // eslint-disable-line new-cap

router
  .route("/")
  /** GET /api/users - Get list of users */
  .get(validator.validate(paramValidation.updateUser), userCtrl.list)

  /** POST /api/users - Create new user */
  .post(validator.validate(paramValidation.createUser), userCtrl.create);

router
  .route("/:userId")
  /** GET /api/users/:userId - Get user */
  .get(validator.validate(paramValidation.updateUser), userCtrl.get)

  /** PUT /api/users/:userId - Update user */
  .put(validator.validate(paramValidation.updateUser), userCtrl.update)

  /** DELETE /api/users/:userId - Delete user */
  .delete(validator.validate(paramValidation.updateUser), userCtrl.remove);

/** Load user when API with userId route parameter is hit */
router.param('userId', userCtrl.load);

module.exports = router;
