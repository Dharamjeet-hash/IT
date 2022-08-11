const express 	                = require('express');
const router                    = express.Router();
const afterLogin                = require('../controller/afterLogin')
const validation                = require('../validation/validation')
const authMiddleware            = require('../middleware/auth')

router.get('/user', authMiddleware, afterLogin.user)

router.post('/create-employee', authMiddleware, validation.create_employee, afterLogin.createEmployee)

router.get('/get-employee/:id',authMiddleware, afterLogin.getEmployee)

router.post('/update-employee',authMiddleware, validation.create_employee, afterLogin.updateEmployee)

router.get('/employees', authMiddleware, afterLogin.employees)

router.get('/delete-employee/:id', authMiddleware, afterLogin.deleteEmployee)

module.exports = router