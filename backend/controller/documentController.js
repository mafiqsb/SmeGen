const db = require('../models');
const documentInformationModel = db.document;

const uploadDocumentinformation = async (req, res) => {
  const startingCode = req.body.startingCode;
  const currentNumber = req.body.currentNumber;

  console.log({ startingCode, currentNumber });

  try {
    // Create a new bank information record
    const newDocumentInfo = await documentInformationModel.create({
      startingCode: startingCode,
      currentNumber: currentNumber,
    });
    //
    // Send a success response with the saved bank information
    res.status(200).send(newDocumentInfo);
    return;
  } catch (error) {
    console.error('Failed to upload bank information:', error);
    res.status(500).send({ message: 'Failed to upload bank information' });
    return;
  }
};

const editDocumentinformation = async (req, res) => {
  const startingCode = req.body.startingCode;
  const currentNumber = req.body.currentNumber;
  const id = req.body.id;

  try {
    // Find the company record based on email
    let documentRecord = await documentInformationModel.findOne({
      where: { id: id },
    });

    await documentRecord.update({
      startingCode: startingCode,
      currentNumber: currentNumber,
    });

    // Send response indicating success
    res.status(200).send(documentRecord);
  } catch (error) {
    console.error('Failed to update company information:', error);
    res.status(500).send({ message: 'Failed to update company information' });
    return;
  }
};

module.exports = { uploadDocumentinformation, editDocumentinformation };
