const express = require('express');
const clientInformation = require('../controller/clientController');
const { isAuth } = require('../Utils');

const clientRouter = express.Router();

clientRouter.get(
  '/getallclient',
  isAuth,
  clientInformation.getClientInformation
);

clientRouter.post(
  '/uploadclient',
  isAuth,
  clientInformation.uploadClientInformation
);

clientRouter.put(
  '/updateclient',
  isAuth,
  clientInformation.updateClientInformation
);
clientRouter.delete(
  '/deleteclient/:clientId',
  isAuth,
  clientInformation.deleteClientInformation
);

module.exports = clientRouter;
