const express = require('express');
const router = express.Router();

const {login} = require('../Controllers/loginController');

//posting data email & password

router.post('/login',login);

module.exports =router;