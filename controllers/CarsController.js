const CarsService = require('../services/CarsService.js')
const { httpResponse } = require('../utils/responseHandler.js')

class CarsController {
	async getAllCars(req, res, next) {
		httpResponse(await new CarsService().getAllCars(req.query), res, next)
	}

	async getCarById(req, res, next) {
		httpResponse(
			await new CarsService().getCarById(req.params.id),
			res,
			next
		)
	}

	async create(req, res, next) {
		httpResponse(await new CarsService().create(req.body), res, next)
	}

	async update(req, res, next) {
		httpResponse(
			await new CarsService().update(req.params.id, req.body),
			res,
			next
		)
	}
}
module.exports = CarsController
