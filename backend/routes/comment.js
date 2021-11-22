const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const commentCtrl = require('../controllers/comment');

router.post('/comment/create', commentCtrl.createComment);
router.get('/comments/post/:id', commentCtrl.getPostComments);
router.delete('/comment/delete/:id', commentCtrl.deleteComment);

module.exports = router;
