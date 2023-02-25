'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('leasings', {
			leasingId: {
				allowNull: false,
				primaryKey: true,
				type: Sequelize.STRING,
			},
			leasingName: {
				type: Sequelize.STRING,
			},
			rates: {
				type: Sequelize.INTEGER,
			},
			terms: {
				type: Sequelize.INTEGER,
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
		await queryInterface.dropTable('leasings')
	},
}
