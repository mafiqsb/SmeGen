const express = require('express');
const { isAuth } = require('../Utils');
const imageController = require('../controller/imageController');

const uploadImageRouter = express.Router();

uploadImageRouter.post('/upload', isAuth, imageController.uploadlogo);
uploadImageRouter.put('/edit', isAuth, imageController.editlogo);

module.exports = uploadImageRouter;
