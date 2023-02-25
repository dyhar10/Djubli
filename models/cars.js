'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cars extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Cars.init({
    carId: { type: DataTypes.STRING, primaryKey: true },
    brandName: DataTypes.STRING,
    groupModelName: DataTypes.STRING,
    modelName: DataTypes.STRING,
    year: DataTypes.INTEGER,
    price: DataTypes.BIGINT
  }, {
    sequelize,
    modelName: 'cars',
    underscored: false,
  });
  return Cars;
};