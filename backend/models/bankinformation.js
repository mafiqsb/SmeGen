'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class bankinformation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  bankinformation.init(
    {
      accountHolder: DataTypes.STRING,
      nameHolder: DataTypes.STRING,
      imgSrc: DataTypes.STRING,
      bankName: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'bankinformation',
    }
  );
  return bankinformation;
};
