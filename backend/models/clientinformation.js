'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ClientInformation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ClientInformation.init({
    clientName: DataTypes.STRING,
    email: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    companyName: DataTypes.STRING,
    ssmRegistrationNo: DataTypes.STRING,
    address1: DataTypes.STRING,
    address2: DataTypes.STRING,
    postcode: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    isDeliverySameAsMailing: DataTypes.BOOLEAN,
    address1Delivery: DataTypes.STRING,
    address2Delivery: DataTypes.STRING,
    postcodeDelivery: DataTypes.STRING,
    cityDelivery: DataTypes.STRING,
    stateDelivery: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ClientInformation',
  });
  return ClientInformation;
};