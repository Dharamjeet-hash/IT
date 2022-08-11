const express 	                = require('express');
const router                    = express.Router();
const beforeLogin               = require('../controller/beforeLogin')
const afterLogin                = require('../controller/afterLogin')
const validation                = require('../validation/validation')
const authMiddleware            = require('../middleware/auth')

router.post('/register',validation.register_validation,beforeLogin.register)

router.post('/login',validation.login_validation,beforeLogin.login)

router.get('/user', authMiddleware, afterLogin.user)

router.post('/create-employee', validation.create_car, authMiddleware, afterLogin.getEmployee)

router.get('/get-employee/:id',authMiddleware, afterLogin.getEmployee)

router.get('/update-employee/:id',authMiddleware, afterLogin.updateEmployee)

router.get('/employees', authMiddleware, afterLogin.employees)

module.exports = router