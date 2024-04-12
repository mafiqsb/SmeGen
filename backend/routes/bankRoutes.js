const express = require('express');
const bankController = require('../controller/bankController');

const bankRouter = express.Router();

bankRouter.post('/uploadbankinformation', bankController.uploadbankinformation);
bankRouter.put('/editbankinformation', bankController.editbankinformation);

module.exports = bankRouter;
