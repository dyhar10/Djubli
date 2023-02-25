'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Leasings extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Leasings.init({
    leasingId: { type: DataTypes.STRING, primaryKey: true },
    leasingName: DataTypes.STRING,
    rates: DataTypes.INTEGER,
    terms: DataTypes.TINYINT
  }, {
    sequelize,
    modelName: 'leasings',
    underscored: false,
  });
  return Leasings;
};