const jwt = require('jsonwebtoken')
const db = require('../models/index')
const CustomersModel = db.customers
const { SECRET_KEY } = require('../config/envValue')
const { httpResponse } = require('../utils/responseHandler')
const { ALL_RESPONSE } = require('../utils/constant')

module.exports = async (req, res, next) => {
	try {
		if (req.headers.authorization) {
			const token = req.headers.authorization.split(' ')[1]
			const decoded = jwt.verify(token, SECRET_KEY)
			if (decoded) {
				const uuid = decoded.data.uuid
				const user = await CustomersModel.findOne({
					where: {
						uuid,
					},
				})
				if (!user) {
					// User tidak ditemukan di sistem
					return httpResponse(
						{
							type: ALL_RESPONSE.ERROR,
							message: 'User not found!',
						},
						res,
						next
					)
				}

				if (user.isActive === 0) {
					return httpResponse(
						{
							type: ALL_RESPONSE.ERROR,
							message: 'User is not activated!',
						},
						res,
						next
					)
				}

				req.authData = decoded.data
				next()
			}
		} else {
			return httpResponse(
				{
					type: ALL_RESPONSE.ERROR,
					message: 'Token not found!',
				},
				res,
				next
			)
		}
	} catch (e) {
		console.log(e)
		next(e)
	}
}
