const {Post, User, Comment} = require('../models');
const sequelize = require('sequelize');

exports.createComment = async (req, res) => {
    const comment = Comment.create({
        content: req.body.content,
        UserId: req.body.user_id,
        PostId: req.body.post_id
    })
    return res.status(201).json({comment});
};

exports.getPostComments = async (req, res) => {
    const comments = await Comment.findAll({
        where: {postId: req.params.id},
        include: User,
        order: sequelize.literal('createdAt DESC')
    })
    return res.status(200).json({comments});
};

exports.deleteComment = async (req, res) => {
    const comment = await Comment.findByPk(req.params.id);
    await comment.destroy();

    return res.status(204).json({message: 'Votre commentaire a été supprimé'});
};