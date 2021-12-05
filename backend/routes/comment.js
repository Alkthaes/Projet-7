const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const commentCtrl = require('../controllers/comment');

router.post('/comment/create', auth, commentCtrl.createComment);
router.get('/comments/post/:id', auth, commentCtrl.getPostComments);
router.delete('/comment/delete/:id', auth, commentCtrl.deleteComment);

module.exports = router;
