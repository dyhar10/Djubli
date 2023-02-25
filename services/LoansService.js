const dayjs = require('dayjs')
const db = require('../models/index')
const LoanModel = db.loans
const CarModel = db.cars
const CustomerModel = db.customers
const LeasingModel = db.leasings
const PaymentModel = db.payments
const { ALL_PREFIX, ALL_RESPONSE } = require('../utils/constant')
const utility = require('../utils/utility')

class LoansService {
	async createInvoice(body) {
		try {
			const getLatestData = await LoanModel.findOne({
				order: [['invoiceId', 'desc']],
			})

			const invoiceId = utility.increamentials(
				ALL_PREFIX.PREFIX_INVOICE,
				getLatestData?.loanId ?? '0'
			)

			const leasingInfo = await LeasingModel.findByPk(body.leasingId)
			const carInfo = await CarModel.findByPk(body.carId)
			const loanPrinciple = carInfo.price - Number(body.downPayment)
			const loanTotal =
				loanPrinciple *
				(1 + (leasingInfo.rates / 100) * (leasingInfo.terms / 12))

			await LoanModel.create({
				invoiceId: invoiceId,
				customerId: body.customerId,
				carId: body.carId,
				leasingId: body.leasingId,
				loanPrinciple: loanPrinciple,
				amountLeft: loanTotal,
				term: leasingInfo.terms,
				nextPayment: loanTotal / leasingInfo.terms,
				paymentsDue: dayjs().endOf('month').startOf('day'),
			})

			const response = await LoanModel.findByPk(invoiceId, {
				include: [
					{
						model: CustomerModel,
						as: 'customer',
						attributes: ['name', 'phone'],
					},
					{
						model: LeasingModel,
						as: 'leasing',
						attributes: ['leasingName', ['rates', 'interestRates']],
					},
					{
						model: CarModel,
						as: 'car',
						attributes: [
							'brandName',
							'groupModelName',
							'modelName',
							'year',
							'price',
						],
					},
				],
			})
			return {
				type: ALL_RESPONSE.SUCCESS,
				data: response,
			}
		} catch (error) {
			return {
				type: ALL_RESPONSE.ERROR,
				message: error.message,
				data: error,
			}
		}
	}

	async getInvoice(id) {
		try {
			const response = await LoanModel.findByPk(id, {
				include: [
					{
						model: CustomerModel,
						as: 'customer',
						attributes: ['name', 'phone'],
					},
					{
						model: LeasingModel,
						as: 'leasing',
						attributes: ['leasingName', ['rates', 'interestRates']],
					},
					{
						model: CarModel,
						as: 'car',
						attributes: [
							'brandName',
							'groupModelName',
							'modelName',
							'year',
							'price',
						],
					},
					{
						model: PaymentModel,
						as: 'payment',
						attributes: ['payment', 'createdAt'],
					},
				],
			})
			return {
				type: ALL_RESPONSE.SUCCESS,
				data: response,
			}
		} catch (error) {
			return {
				type: ALL_RESPONSE.ERROR,
				message: error.message,
				data: error,
			}
		}
	}

	async transfer(id, body) {
		try {
			const invoiceInfo = await LoanModel.findByPk(id, {
				include: [{ model: LeasingModel, as: 'leasing' }],
			})
			if (!invoiceInfo) throw new Error('Invoice not found')

			let nextPayment = 0
			if (Number(body.amountPaid) < invoiceInfo.nextPayment) {
				const missedAmounts = invoiceInfo.nextPayment - body.amountPaid
				nextPayment =
					invoiceInfo.nextPayment +
					missedAmounts +
					missedAmounts * 0.02
			}

			await PaymentModel.create({
				loanId: id,
				payment: body.amountPaid,
			})

			await LoanModel.update(
				{
					term: invoiceInfo.term - 1,
					nextPayment: nextPayment,
					paymentsDue: dayjs(invoiceInfo.paymentsDue).add(1, 'month'),
					updatedAt: dayjs(),
				},
				{ where: { invoiceId: id } }
			)

			const updatedData = await LoanModel.findByPk(id, {
				include: [
					{
						model: CustomerModel,
						as: 'customer',
						attributes: ['name', 'phone'],
					},
					{
						model: LeasingModel,
						as: 'leasing',
						attributes: ['leasingName', ['rates', 'interestRates']],
					},
					{
						model: CarModel,
						as: 'car',
						attributes: [
							'brandName',
							'groupModelName',
							'modelName',
							'year',
							'price',
						],
					},
				],
			})

			const response = {
				invoiceId: id,
				customerId: body.customerId,
				leasingId: body.leasingId,
				carId: body.carId,
				customer: updatedData.customer,
				leasing: updatedData.leasing,
				car: updatedData.car,
				loanPrinciple: invoiceInfo.loanPrinciple,
				loanTotal:
					invoiceInfo.loanPrinciple *
					(1 +
						(invoiceInfo.leasing.rates / 100) *
							(invoiceInfo.leasing.terms / 12)),
				term: Number(invoiceInfo.term) - 1,
				amountsPaid: body.amountPaid,
				missedAmounts: nextPayment - invoiceInfo.nextPayment,
				nextPayment: nextPayment,
				payment: updatedData.payment,
				paymentsDue: dayjs(invoiceInfo.paymentsDue).add(1, 'month'),
				createdAt: updatedData.createdAt,
				updatedAt: updatedData.updatedAt,
				deletedAt: updatedData.deletedAt,
			}

			return {
				type: ALL_RESPONSE.SUCCESS,
				data: response,
			}
		} catch (error) {
			return {
				type: ALL_RESPONSE.ERROR,
				message: error.message,
				data: error,
			}
		}
	}
}

module.exports = LoansService
