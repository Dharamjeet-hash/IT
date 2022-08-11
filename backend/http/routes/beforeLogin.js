const express 	                = require('express');
const router                    = express.Router();
const beforeLogin               = require('../controller/beforeLogin')
const validation                = require('../validation/validation')

router.post('/register',validation.register_validation,beforeLogin.register)

router.post('/login',validation.login_validation,beforeLogin.login)



module.exports = router