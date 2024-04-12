const db = require('../models');
const bankInformationModel = db.bank;

const uploadbankinformation = async (req, res) => {
  const nameHolder = req.body.nameHolder;
  const accountHolder = req.body.accountHolder;
  const imgSrc = req.body.selectedBank.imgSrc;
  const bankName = req.body.selectedBank.name;

  try {
    // Create a new bank information record
    const newBankInfo = await bankInformationModel.create({
      nameHolder: nameHolder,
      accountHolder: accountHolder,
      imgSrc: imgSrc,
      bankName: bankName,
    });
    //
    // Send a success response with the saved bank information
    res.status(200).send({ data: newBankInfo });
    return;
  } catch (error) {
    console.error('Failed to upload bank information:', error);
    res.status(500).send({ message: 'Failed to upload bank information' });
    return;
  }
};

const editbankinformation = async (req, res) => {
  const nameHolder = req.body.nameHolder;
  const accountHolder = req.body.accountHolder;
  const imgSrc = req.body.selectedBank.imgSrc;
  const bankName = req.body.selectedBank.name;
  const id = req.body.id;

  try {
    // Find the company record based on email
    let bankRecord = await bankInformationModel.findOne({
      where: { id: id },
    });

    await bankRecord.update({
      nameHolder: nameHolder,
      accountHolder: accountHolder,
      imgSrc: imgSrc,
      bankName: bankName,
    });

    // Send response indicating success
    res.status(200).send({
      data: bankRecord,
    });
  } catch (error) {
    console.error('Failed to update company information:', error);
    res.status(500).send({ message: 'Failed to update company information' });
    return;
  }
};

module.exports = { uploadbankinformation, editbankinformation };
