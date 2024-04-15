const db = require('../models');

const clientInformationModel = db.client;

const getClientInformation = async (req, res) => {
  try {
    const result = await clientInformationModel.findAll();

    res.status(200).send(result);
  } catch (err) {
    console.error(err);
    res.status(401).send({ message: 'Data not retrieved' });
  }
};

const uploadClientInformation = (req, res) => {
  const clientData = req.body.updatedFormData
    ? req.body.updatedFormData
    : req.body.formData;

  const clientName = clientData.clientName;
  const email = clientData.email;
  const phoneNumber = clientData.phoneNumber;
  const companyName = clientData.companyName;
  const ssmRegistrationNo = clientData.ssmRegistrationNo;
  const address1 = clientData.address1;
  const address2 = clientData.address2;
  const postcode = clientData.postcode;
  const city = clientData.city;
  const state = clientData.state;
  const isDeliverySameAsMailing = clientData.isDeliverySameAsMailing;
  const address1Delivery = clientData.address1Delivery;
  const address2Delivery = clientData.address1Delivery;
  const postcodeDelivery = clientData.postcodeDelivery;
  const cityDelivery = clientData.cityDelivery;
  const stateDelivery = clientData.stateDelivery;

  try {
    const savedClientInfo = clientInformationModel.create({
      clientName,
      email,
      phoneNumber,
      companyName,
      ssmRegistrationNo,
      address1,
      address2,
      postcode,
      city,
      state,
      isDeliverySameAsMailing,
      address1Delivery,
      address2Delivery,
      postcodeDelivery,
      cityDelivery,
      stateDelivery,
    });

    res.status(200).send({
      message: 'Company successfully created',
      data: savedClientInfo,
    });
  } catch (error) {
    console.error('Failed to create client:', error);
    res.status(500).send({ message: 'Failed to create client' });
  }
};

const updateClientInformation = async (req, res) => {
  const clientData = req.body.updatedFormData
    ? req.body.updatedFormData
    : req.body.formData;

  const clientName = clientData.clientName;
  const email = clientData.email;
  const phoneNumber = clientData.phoneNumber;
  const companyName = clientData.companyName;
  const ssmRegistrationNo = clientData.ssmRegistrationNo;
  const address1 = clientData.address1;
  const address2 = clientData.address2;
  const postcode = clientData.postcode;
  const city = clientData.city;
  const state = clientData.state;
  const isDeliverySameAsMailing = clientData.isDeliverySameAsMailing;
  const address1Delivery = clientData.address1Delivery;
  const address2Delivery = clientData.address1Delivery;
  const postcodeDelivery = clientData.postcodeDelivery;
  const cityDelivery = clientData.cityDelivery;
  const stateDelivery = clientData.stateDelivery;
  const id = clientData.id;

  try {
    let clientRecord = await clientInformationModel.findOne({
      where: { id: id },
    });

    if (clientRecord) {
      await clientRecord.update({
        clientName,
        email,
        phoneNumber,
        companyName,
        ssmRegistrationNo,
        address1,
        address2,
        postcode,
        city,
        state,
        isDeliverySameAsMailing,
        address1Delivery,
        address2Delivery,
        postcodeDelivery,
        cityDelivery,
        stateDelivery,
      });
    }

    res.status(200).send({
      data: clientRecord,
    });
  } catch (error) {
    console.error('Failed to update client information:', error);
    res.status(500).send({ message: 'Failed to update client information' });
    return;
  }
};

const deleteClientInformation = async (req, res) => {
  try {
    const clientId = req.params.clientId;

    const recordToDelete = await clientInformationModel.findByPk(clientId);

    if (!recordToDelete) {
      return res.status(404).send({ message: 'Record not found' });
    }

    await recordToDelete.destroy();
    return res.status(200).send({ message: 'Record deleted successfully' });
  } catch (err) {
    console.error(err.message);
    return res.status(500).send({ message: 'Unable to delete the record' });
  }
};

module.exports = {
  uploadClientInformation,
  updateClientInformation,
  getClientInformation,
  deleteClientInformation,
};
