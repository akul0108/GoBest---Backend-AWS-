const express = require('express');
const router = express.Router();

//controllers
const ctrlUser = require('../controllers/user.controller');

//to add the data
//localhost:3000/api

router.post('/register',ctrlUser.register);

module.exports = router;