'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('customers', {
			customerId: {
				allowNull: false,
				primaryKey: true,
				type: Sequelize.STRING,
			},
			uuid: {
				type: Sequelize.UUID,
			},

			name: {
				type: Sequelize.STRING,
			},
			phone: {
				type: Sequelize.STRING,
				unique: true,
			},
			password: {
				type: Sequelize.STRING,
			},
			isActive: {
				type: Sequelize.INTEGER,
				defaultValue: 1,
			},
			isLogin: {
				type: Sequelize.INTEGER,
				defaultValue: 0,
			},
			balance: {
				type: Sequelize.INTEGER,
				defaultValue: 0,
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
		await queryInterface.dropTable('customers')
	},
}
