const express = require('express')
const productRuter = require('./products')
const router = express.Router()

router.use('/products', productRuter)

module.exports = router 
