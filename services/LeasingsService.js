const db = require('../models/index')
const { ALL_RESPONSE, ALL_PREFIX } = require('../utils/constant')
const { pagination } = require('../utils/pagination')
const utility = require('../utils/utility')
const LeasingModel = db.leasings

class LeasingsService {
	async getAllLeasings(query) {
		try {
			let optionQuery = {}
			if (query?.page)
				optionQuery.offset =
					(Number(query.page) - 1) * Number(query.page)
			if (query?.perPage) optionQuery.limit = Number(query.perPage)

			console.log(optionQuery)
			const response = await LeasingModel.findAndCountAll(optionQuery)

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

	async getLeasingById(id) {
		try {
			const response = await LeasingModel.findOne({
				leasingId: id,
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
			const getLatestData = await LeasingModel.findOne({
				order: [['leasingId', 'desc']],
			})

			body.leasingId = utility.increamentials(
				ALL_PREFIX.PREFIX_LEASING,
				getLatestData?.leasingId ?? '0'
			)

			const response = await LeasingModel.create(body)
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
			const response = await LeasingModel.update(body, {
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

module.exports = LeasingsService
