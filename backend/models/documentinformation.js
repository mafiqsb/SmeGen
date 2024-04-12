'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DocumentInformation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  DocumentInformation.init(
    {
      startingCode: DataTypes.STRING,
      currentNumber: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'DocumentInformation',
    }
  );
  return DocumentInformation;
};
