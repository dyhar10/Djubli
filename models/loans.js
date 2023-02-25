'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
	class Loans extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			Loans.belongsTo(models.customers, {
				as: 'customer',
				foreignKey: 'customerId',
			})
			Loans.belongsTo(models.cars, {
				as: 'car',
				foreignKey: 'carId',
			})
			Loans.belongsTo(models.leasings, {
				as: 'leasing',
				foreignKey: 'leasingId',
			})
			Loans.hasMany(models.payments, {
				as: 'payment',
				foreignKey: 'loanId',
			})
		}
	}
	Loans.init(
		{
			invoiceId: { type: DataTypes.STRING, primaryKey: true },
			customerId: DataTypes.STRING,
			carId: DataTypes.STRING,
			leasingId: DataTypes.STRING,
			loanPrinciple: DataTypes.INTEGER,
			amountLeft: DataTypes.INTEGER,
			term: DataTypes.INTEGER,
			nextPayment: DataTypes.INTEGER,
			paymentsDue: DataTypes.DATE,
			deletedAt: DataTypes.DATE,
		},
		{
			sequelize,
			modelName: 'loans',
			underscored: false,
		}
	)
	return Loans
}
