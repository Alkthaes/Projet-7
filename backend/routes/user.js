const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/users', auth, userCtrl.getAllUsers);
router.get('/user/:id', auth, userCtrl.getOneUser);
router.put('/update/infos', auth, userCtrl.updateUserInfo);
router.put('/update/avatar', auth, multer, userCtrl.updateAvatar);
router.delete('/delete/:id', auth, userCtrl.deleteAccount);

module.exports = router;