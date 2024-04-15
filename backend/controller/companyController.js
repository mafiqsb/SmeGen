// const Sequelize = require('sequelize');
const db = require('../models');
const companyInformationModel = db.company;

const uploadcompanyinformation = async (req, res) => {
  const companyName = req.body.companyName;
  const ssmNumber = req.body.ssmNumber;
  const email = req.body.email;
  const phoneNumber = req.body.phoneNumber;
  const address1 = req.body.address1;
  const address2 = req.body.address2;
  const postcode = req.body.postcode;
  const city = req.body.city;
  const stateName = req.body.stateName;

  try {
    const savedCompanyInfo = await companyInformationModel.create({
      companyName,
      ssmNumber,
      email,
      phoneNumber,
      address1,
      address2,
      postcode,
      city,
      stateName,
    });

    res
      .status(200)
      .send({
        message: 'Company successfully created',
        data: savedCompanyInfo,
      });
  } catch (error) {
    console.error('Failed to create user:', error);
    res.status(500).send({ message: 'Failed to create user' });
  }
};

const editcompanyinformation = async (req, res) => {
  const {
    companyName,
    ssmNumber,
    email,
    phoneNumber,
    address1,
    address2,
    postcode,
    city,
    stateName,
  } = req.body;

  try {
    // Find the company record based on email
    let companyRecord = await companyInformationModel.findOne({
      where: { email: email },
    });

    await companyRecord.update({
      companyName: companyName,
      ssmNumber: ssmNumber,
      phoneNumber: phoneNumber,
      address1: address1,
      address2: address2,
      postcode: postcode,
      city: city,
      stateName: stateName,
    });

    // Send response indicating success
    res.status(200).send({
      message: 'Company information updated successfully',
      data: companyRecord,
    });
  } catch (error) {
    console.error('Failed to update company information:', error);
    res.status(500).send({ message: 'Failed to update company information' });
  }
};

module.exports = { uploadcompanyinformation, editcompanyinformation };
