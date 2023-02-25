const express = require('express')
const CarsController = require('../controllers/CarsController')
const router = express.Router()

const LoginMiddleware = require('../middleware/LoginMiddleware')

router.get('/', LoginMiddleware, async (req, res, next) => {
	try {
		await new CarsController().getAllCars(req, res, next)
	} catch (error) {
		next(error)
	}
})

router.get('/:id', LoginMiddleware, async (req, res, next) => {
	try {
		await new CarsController().getCarById(req, res, next)
	} catch (error) {
		next(error)
	}
})

router.post('/', LoginMiddleware, async (req, res, next) => {
	try {
		await new CarsController().create(req, res, next)
	} catch (error) {
		next(error)
	}
})

router.put('/:id', LoginMiddleware, async (req, res, next) => {
	try {
		await new CarsController().update(req, res, next)
	} catch (error) {
		next(error)
	}
})

module.exports = router
