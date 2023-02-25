'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
	class Customers extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	Customers.init(
		{
			customerId: { type: DataTypes.STRING, primaryKey: true },
			uuid: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4 },
			name: DataTypes.STRING,
			phone: DataTypes.STRING,
			password: DataTypes.STRING,
			isActive: DataTypes.TINYINT,
			isLogin: DataTypes.TINYINT,
			balance: DataTypes.TINYINT,
		},
		{
			sequelize,
			modelName: 'customers',
			underscored: false,
		}
	)
	return Customers
}
