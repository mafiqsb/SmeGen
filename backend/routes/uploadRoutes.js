const express = require('express');
const multer = require('multer');
const uploadController = require('../Controller/uploadController.js');

const upload = multer();

const uploadRouter = express.Router();

uploadRouter.post(
  '/uploadlogo',
  upload.single('file'),
  uploadController.upload_logo
);

module.exports = uploadRouter;
