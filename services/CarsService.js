const db = require('../models/index')
const CarModel = db.cars
const { ALL_RESPONSE, ALL_PREFIX } = require('../utils/constant')
const { pagination } = require('../utils/pagination')
const utility = require('../utils/utility')

class CarsService {
	async getAllCars(query) {
		try {
			let optionQuery = {}
			if (query?.page)
				optionQuery.offset =
					(Number(query.page) - 1) * Number(query.page)
			if (query?.perPage) optionQuery.limit = Number(query.perPage)

			console.log(optionQuery)
			const response = await CarModel.findAndCountAll(optionQuery)

			return {
				type: ALL_RESPONSE.SUCCESS,
				pagination: pagination(query, response.count),
				data: response,
			}
		} catch (error) {
			return {
				message: error.message,
				data: error,
			}
		}
	}

	async getCarById(id) {
		try {
			const response = await CarModel.findOne({
				carId: id,
			})
			return {
				type: ALL_RESPONSE.SUCCESS,
				data: response,
			}
		} catch (error) {
			return {
				message: error.message,
				data: error,
			}
		}
	}

	async create(body) {
		try {
			const getLatestData = await CarModel.findOne({
				order: [['carId', 'desc']],
			})

			body.carId = utility.increamentials(
				ALL_PREFIX.PREFIX_CAR,
				getLatestData?.carId ?? '0'
			)

			const response = await CarModel.create(body)
			return {
				type: ALL_RESPONSE.INSERTED,
				data: response,
			}
		} catch (error) {
			return {
				message: error.message,
				data: error,
			}
		}
	}

	async update(id, body) {
		try {
			const response = await CarModel.update(body, {
				where: {
					id,
				},
			})
			return {
				type: ALL_RESPONSE.INSERTED,
				data: response,
			}
		} catch (error) {
			return {
				message: error.message,
				data: error,
			}
		}
	}
}

module.exports = CarsService
