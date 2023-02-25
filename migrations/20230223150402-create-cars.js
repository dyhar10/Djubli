'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('cars', {
			carId: {
				allowNull: false,
				primaryKey: true,
				type: Sequelize.STRING,
			},
			brandName: {
				type: Sequelize.STRING,
			},
			groupModelName: {
				type: Sequelize.STRING,
			},
			modelName: {
				type: Sequelize.STRING,
			},
			year: {
				type: Sequelize.INTEGER,
			},
			price: {
				type: Sequelize.BIGINT,
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
		await queryInterface.dropTable('cars')
	},
}
