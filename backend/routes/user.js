const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/users', auth, userCtrl.getAllUsers);
router.get('/user/:id', userCtrl.getOneUser);
router.put('/update/infos', userCtrl.updateUserInfo);
router.put('/update/avatar', multer, userCtrl.updateAvatar);
router.delete('/delete/:id', userCtrl.deleteAccount);

module.exports = router;