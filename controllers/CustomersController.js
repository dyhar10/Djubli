const CustomersService = require('../services/CustomersService.js')
const { httpResponse } = require('../utils/responseHandler.js')

class CustomersController {
	async signup(req, res, next) {
		httpResponse(await new CustomersService().signup(req.body), res, next)
	}
	async login(req, res, next) {
		httpResponse(await new CustomersService().login(req.body), res, next)
	}
	async logout(req, res, next) {
		httpResponse(await new CustomersService().logout(req.authData), res, next)
	}
	async deposit(req, res, next) {
		httpResponse(await new CustomersService().deposit(req.authData, req.body), res, next)
	}
	async withdrawal(req, res, next) {
		httpResponse(await new CustomersService().withdrawal(req.authData, req.body), res, next)
	}
}

module.exports = CustomersController
