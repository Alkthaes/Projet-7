const express = require('express');
const router = express.Router();

const postCtrl = require('../controllers/post');
const multer = require('../middleware/multer-config');

router.post('/post/create', multer, postCtrl.createPost);
router.get('/posts', postCtrl.getAllPosts);
router.get('/posts/user/:id', postCtrl.getPostsOfOneUser);
router.get('/post/:id', postCtrl.getOnePost);
router.put('/post/edit/title/:id', postCtrl.editTitle);
router.put('/post/edit/image/:id', multer, postCtrl.editImage);
router.delete('/post/delete/:id', postCtrl.deletePost);

module.exports = router;