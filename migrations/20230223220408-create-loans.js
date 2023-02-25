'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('loans', {
			invoiceId: {
				allowNull: false,
				primaryKey: true,
				type: Sequelize.STRING,
			},
			customerId: {
				type: Sequelize.STRING,
			},
			carId: {
				type: Sequelize.STRING,
			},
			leasingId: {
				type: Sequelize.STRING,
			},
			loanPrinciple: {
				type: Sequelize.INTEGER,
			},
			amountLeft: {
				type: Sequelize.INTEGER,
			},
			term: {
				type: Sequelize.INTEGER,
			},
			nextPayment: {
				type: Sequelize.INTEGER,
			},
			paymentsDue: {
				type: Sequelize.DATE,
			},
			deletedAt: {
				type: Sequelize.DATE,
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		})
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('loans')
	},
}
