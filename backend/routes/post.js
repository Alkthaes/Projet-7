const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const postCtrl = require('../controllers/post');
const multer = require('../middleware/multer-config');

router.post('/post/create', auth, multer, postCtrl.createPost);
router.get('/posts', auth,  postCtrl.getAllPosts);
router.get('/posts/user/:id',auth,  postCtrl.getPostsOfOneUser);
router.get('/post/:id', auth,  postCtrl.getOnePost);
router.put('/post/edit/title/:id', auth,  postCtrl.editTitle);
router.put('/post/edit/image/:id', multer, auth, postCtrl.editImage);
router.delete('/post/delete/:id',auth, postCtrl.deletePost);

module.exports = router;