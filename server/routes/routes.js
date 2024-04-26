const router = require('express').Router()
const authController = require('../controllers/auth.controller')
const orderController = require('../controllers/order.controller')
const userController = require('../controllers/user.controller')


router.post('/login',authController.login)
router.get('/verify/:token',authController.verifyToken)


router.post('/addresses',userController.createAddress)
router.get('/addresses/:userId',userController.getAddressOfUser)
router.post('/orders',orderController.createOrder)
router.get('/profile/:userId',userController.getUserProfile)
router.get('/orders/:userId',orderController.getOrdersOfUser)





module.exports = router