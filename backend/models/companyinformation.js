'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CompanyInformation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  CompanyInformation.init({
    companyName: DataTypes.STRING,
    email: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    ssmNumber: DataTypes.STRING,
    address1: DataTypes.STRING,
    city: DataTypes.STRING,
    postcode: DataTypes.STRING,
    stateName: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'CompanyInformation',
  });
  return CompanyInformation;
};