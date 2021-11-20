const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/users', userCtrl.getAllUsers);
router.get('/user', userCtrl.getOneUser);
router.put('/update', userCtrl.updateAccount);
router.delete('/delete', userCtrl.deleteAccount);

module.exports = router;