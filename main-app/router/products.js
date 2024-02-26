const express = require('express')
const productController = require('../controllers/productController')

const productRuter = express.Router()
productRuter.get('/', productController.getAll)
productRuter.post('/', productController.create)

module.exports = productRuter
