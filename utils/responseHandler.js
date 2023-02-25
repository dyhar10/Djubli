const { ALL_RESPONSE } = require('./constant')

const success = (data, message, pagination) => {
	return {
		type: ALL_RESPONSE.SUCCESS,
		message: message ? message : 'Successfully processed',
		pagination: pagination,
		data: data,
	}
}

const inserted = (data, message) => {
	return {
		type: ALL_RESPONSE.INSERTED,
		message: message ? message : 'Successfully inserted',
		data: data,
	}
}

const unauthorized = () => {
	return {
		type: ALL_RESPONSE.UNAUTHORIZED,
		message: 'Access denied!',
	}
}

const forbidden = () => {
	return {
		type: ALL_RESPONSE.FORBIDDEN,
		message: 'Insufficient privileges!',
	}
}

const httpResponse = (payload, res, next) => {
	try {
		switch (payload.type) {
			case 'SUCCESS':
				return res.status(200).send(payload)
			case 'INSERTED':
				return res.status(201).send(payload)
			case 'UNAUTHORIZED':
				return res.status(401).send(payload)
			case 'FORBIDDEN':
				return res.status(403).send(payload)
			default:
				return res.status(payload?.status ?? 500).send({
					status: 'ERROR',
					type: 'BAD REQUEST',
					message: payload?.message,
					data: payload?.data || undefined,
				})
		}
	} catch (error) {
		console.log(error)
		next(error)
	}
}

module.exports = {
	httpResponse,
	success,
	inserted,
	unauthorized,
	forbidden,
}
