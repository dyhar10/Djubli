const bcrypt = require('bcrypt')
const db = require('../models/index')
const CustomerModel = db.customers
const { SALT_ROUNDS, SECRET_KEY } = require('../config/envValue')
const { ALL_RESPONSE, ALL_PREFIX } = require('../utils/constant')
const jwt = require('jsonwebtoken')
const Utility = require('../utils/utility')
const utility = require('../utils/utility')

class CustomersService {
	async signup(body) {
		try {
			const getLatestData = await CustomerModel.findOne({
				order: [['customerId', 'desc']],
				attributes: ['customerId'],
			})
			body.customerId = utility.increamentials(
				ALL_PREFIX.PREFIX_CUSTOMER,
				getLatestData?.customerId ?? '0'
			)
			body.password = await bcrypt.hash(
				body.password,
				Number(SALT_ROUNDS)
			)
			body.isActive = 1
			const response = await CustomerModel.create(body)
			return {
				type: ALL_RESPONSE.INSERTED,
				data: response,
			}
		} catch (error) {
			return {
				message: error.message,
			}
		}
	}

	async login(body) {
		try {
			const isExist = await CustomerModel.findOne({
				where: {
					phone: body.phone,
				},
			})

			if (!isExist) throw new Error(`Account not found!`)
			const checkPassword = await bcrypt.compare(
				body.password,
				isExist.password
			)

			if (!checkPassword) throw new Error(`Password is incorrect`)

			if (isExist && isExist.isLogin)
				throw new Error(`You're already logging in!`)

			const token = jwt.sign(
				{
					data: { uuid: isExist.uuid },
					exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24, // 24 hours
				},
				SECRET_KEY
			)

			CustomerModel.update(
				{ isLogin: 1 },
				{ where: { uuid: isExist.uuid } }
			)
			return {
				type: ALL_RESPONSE.SUCCESS,
				data: {
					name: isExist.name,
					phone: isExist.phone,
					balance: isExist.balance ?? 0,
					accessToken: token,
				},
			}
		} catch (error) {
			return {
				message: error.message,
				data: error,
			}
		}
	}

	async logout(user) {
		try {
			const isExist = await CustomerModel.findOne({
				where: {
					uuid: user.uuid,
				},
			})

			if (!isExist) throw new Error(`Account not found!`)
			if (isExist && !isExist.isLogin)
				throw new Error(`You're not logging in!`)

			CustomerModel.update({ isLogin: 0 }, { where: { uuid: user.uuid } })
			return {
				type: ALL_RESPONSE.SUCCESS,
				message: `Thankyou ${isExist.name}, See you next time!`,
				data: {
					name: isExist.name,
					phone: isExist.phone,
					balance: isExist.balance ?? 0,
				},
			}
		} catch (error) {
			return {
				message: error.message,
				data: error,
			}
		}
	}

	async deposit(userData, body) {
		try {
			const isExist = await CustomerModel.findOne({ uuid: userData.uuid })
			if (!isExist) throw new Error(`Account not found!`)

			CustomerModel.update(
				{
					balance: isExist.balance + body.balance,
					updatedAt: new Date(),
				},
				{ where: { uuid: userData.uuid } }
			)

			const latestData = await CustomerModel.findOne({
				uuid: userData.uuid,
			})
			return {
				type: ALL_RESPONSE.SUCCESS,
				message: 'Account add deposit successfully',
				data: latestData,
			}
		} catch (error) {
			return {
				message: error.message,
				data: error,
			}
		}
	}
	async withdrawal(userData, body) {
		try {
			const isExist = await CustomerModel.findOne({ uuid: userData.uuid })
			if (!isExist) throw new Error(`Account not found!`)

			CustomerModel.update(
				{
					balance: isExist.balance - body.balance,
					updatedAt: new Date(),
				},
				{ where: { uuid: userData.uuid } }
			)

			const latestData = await CustomerModel.findOne({
				uuid: userData.uuid,
			})
			return {
				type: ALL_RESPONSE.SUCCESS,
				message: 'Account withdrawal successfully',
				data: latestData,
			}
		} catch (error) {
			return {
				message: error.message,
				data: error,
			}
		}
	}
}

module.exports = CustomersService
