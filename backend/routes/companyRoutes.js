const express = require('express');
const companyController = require('../controller/companyController');
const { isAuth } = require('../Utils');

const companyRouter = express.Router();

companyRouter.post(
  '/uploadcompanyinformation',
  isAuth,
  companyController.uploadcompanyinformation
);

companyRouter.put(
  '/editcompanyinformation',
  isAuth,
  companyController.editcompanyinformation
);

module.exports = companyRouter;
