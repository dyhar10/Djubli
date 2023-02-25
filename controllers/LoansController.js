const LoansService = require("../services/LoansService")
const { httpResponse } = require("../utils/responseHandler")

class LoansController {
	async createInvoice(req, res, next) {
		httpResponse(await new LoansService().createInvoice(req.body), res, next)
	}
	async getInvoice(req, res, next) {
		httpResponse(await new LoansService().getInvoice(req.params.id), res, next)
	}
	async transfer(req, res, next) {
		httpResponse(await new LoansService().transfer(req.params.id, req.body), res, next)
	}
}

module.exports = LoansController
