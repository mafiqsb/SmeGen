const db = require('../models');
const cloudinary = require('cloudinary').v2;

const logoInformationModel = db.logo;

const uploadlogo = async (req, res) => {
  const imageLogo = req.body.logoHandler;

  const result = await logoInformationModel.create({
    imageLogo,
  });

  res.status(200).send({ message: 'Image successfully change', data: result });
};

const editlogo = async (req, res) => {
  const newLogoHandler = req.body.logoHandler;
  const oldLogoHandler = req.body.oldLogoHandler;
  const id = req.body.id;

  // Split the URL by '/'
  const urlParts = oldLogoHandler.split('/');

  // Get the last part of the URL, which contains the public_id and file extension
  const publicIdWithExtension = urlParts[urlParts.length - 1];

  // Remove the file extension to get the public_id
  const publicId = publicIdWithExtension.split('.')[0];

  try {
    // Delete the old image dari Cloudinary
    try {
      await cloudinary.uploader.destroy(publicId);
      console.log('Old image deleted successfully');
    } catch (error) {
      console.error('Error deleting old image:', error);
    }

    //Cari logo record to update dalam database
    let updatedLogoRecord = await logoInformationModel.findOne({
      where: { id: id },
    });

    // Update the new imageLogo
    await updatedLogoRecord.update({ imageLogo: newLogoHandler });

    res
      .status(200)
      .send({ message: 'Image successfully changed', data: updatedLogoRecord });
  } catch (error) {
    console.error('Failed to update image:', error);
    res.status(500).send({ message: 'Failed to update image' });
  }
};

module.exports = { uploadlogo, editlogo };
