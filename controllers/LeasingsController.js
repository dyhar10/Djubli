const LeasingsService = require('../services/LeasingsService')
const { httpResponse } = require('../utils/responseHandler')

class LeasingsController {
	async getAllLeasings(req, res, next) {
		httpResponse(await new LeasingsService().getAllLeasings(req.query), res, next)
	}

	async getByLeasingId(req, res, next) {
		httpResponse(await new LeasingsService().getLeasingById(req.params.id), res, next)
	}

	async create(req, res, next) {
		httpResponse(await new LeasingsService().create(req.body), res, next)
	}

	async update(req, res, next) {
		httpResponse(await new LeasingsService().update(req.params.id, req.body), res, next)
	}
}

module.exports = LeasingsController
