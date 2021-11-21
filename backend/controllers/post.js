const {Post, User, Comment} = require('../models');
const sequelize = require('sequelize');
const fs = require('fs');

exports.createPost = async (req, res) => {
    const post = await Post.create({
        title: req.body.title,
        UserId: req.body.user_id,
        image: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    })
    console.log(post);
    return res.status(201).json({post});
};

exports.getAllPosts = async (req, res) => {
    const posts = await Post.findAll({
        include: [User, Comment],
        order: sequelize.literal('createdAt DESC')
    });
    return res.status(200).json({posts});
};

exports.getPostsOfOneUser = async (req, res) => {
    const posts = await Post.findAll({
        where: { userId: req.params.id },
        include: [User, Comment],
        order: sequelize.literal('createdAt DESC')
    })
    return res.status(200).json({posts});
}

exports.getOnePost = async (req, res) => {
    const post = await Post.findByPk(req.params.id, {
        include: [Comment, User]
    });
    return res.status(200).json({post});
};

exports.editTitle = async (req, res) => {
    const post = await Post.findByPk(req.params.id);
    post.title = req.body.title;
    await post.save();

    return res.status(200).json({post});
};

exports.editImage = async (req, res) => {
    try {
        const post = await Post.findByPk(req.params.id);
        post.image = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
        await post.save();

        return res.status(200).json({post});
    } catch(error) {
        console.log(error);
    }
};

exports.deletePost = async (req, res) => {
    const post = await Post.findByPk(req.params.id);
    const filename = post.image.split('/images/')[1];
    fs.unlink(`images/${filename}`, async () => {
        await post.destroy();
        return res.status(204).json({message: 'Votre post a bien été supprimé'})
    })
};