const express = require('express')
const LeasingsController = require('../controllers/LeasingsController')
const router = express.Router()

const LoginMiddleware = require('../middleware/LoginMiddleware')

router.get('/', LoginMiddleware, async (req, res, next) => {
	try {
		await new LeasingsController().getAllLeasings(req, res, next)
	} catch (error) {
		next(error)
	}
})

router.get('/:id', LoginMiddleware, async (req, res, next) => {
	try {
		await new LeasingsController().getByLeasingId(req, res, next)
	} catch (error) {
		next(error)
	}
})

router.post('/', LoginMiddleware, async (req, res, next) => {
	try {
		await new LeasingsController().create(req, res, next)
	} catch (error) {
		next(error)
	}
})

router.put('/:id', LoginMiddleware, async (req, res, next) => {
	try {
		await new LeasingsController().update(req, res, next)
	} catch (error) {
		next(error)
	}
})

module.exports = router
