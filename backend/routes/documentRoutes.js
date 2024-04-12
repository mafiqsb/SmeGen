const express = require('express');
const documentController = require('../controller/documentController');
const { isAuth } = require('../Utils');

const documentRouter = express.Router();

documentRouter.post(
  '/uploaddocumentinformation',
  isAuth,
  documentController.uploadDocumentinformation
);

documentRouter.put(
  '/editdocumentinformation',
  isAuth,
  documentController.editDocumentinformation
);

module.exports = documentRouter;
