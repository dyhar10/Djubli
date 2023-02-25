const express = require('express')
const router = express.Router()

const LoginMiddleware = require('../middleware/LoginMiddleware')
const LoansController = require('../controllers/LoansController')

router.post('/invoice', LoginMiddleware, async (req, res, next) => {
	try {
		await new LoansController().createInvoice(req, res, next)
	} catch (error) {
		next(error)
	}
})

router.get('/invoice/:id', LoginMiddleware, async (req, res, next) => {
	try {
		await new LoansController().getInvoice(req, res, next)
	} catch (error) {
		next(error)
	}
})

router.post('/transfer/:id', LoginMiddleware, async (req, res, next) => {
	try {
		await new LoansController().transfer(req, res, next)
	} catch (error) {
		next(error)
	}
})


module.exports = router
