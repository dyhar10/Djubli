const express = require('express')
const router = express.Router()

const LoginMiddleware = require('../middleware/LoginMiddleware')
const CustomersController = require('../controllers/CustomersController')

router.post('/signup', async (req, res, next) => {
	try {
		await new CustomersController().signup(req, res, next)
	} catch (error) {
		next(error)
	}
})

router.post('/login', async (req, res, next) => {
	try {
		await new CustomersController().login(req, res, next)
	} catch (error) {
		next(error)
	}
})

router.post('/logout', LoginMiddleware, async (req, res, next) => {
	try {
		await new CustomersController().logout(req, res, next)
	} catch (error) {
		next(error)
	}
})

router.post('/deposit', LoginMiddleware, async (req, res, next) => {
	try {
		await new CustomersController().deposit(req, res, next)
	} catch (error) {
		next(error)
	}
})

router.post('/withdrawal', LoginMiddleware, async (req, res, next) => {
	try {
		await new CustomersController().withdrawal(req, res, next)
	} catch (error) {
		next(error)
	}
})

module.exports = router
