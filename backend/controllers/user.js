const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const {User} = require('../models');

exports.signup = (req, res) => {
    bcrypt.hash(req.body.password, 10)
        .then(async hash => {
            const user = await User.create({
                lastname: req.body.lastname,
                firstname: req.body.firstname,
                email: req.body.email,
                picture: req.body.picture,
                password: hash
            })
            return res.json(user);
        })
        .catch(error => res.status(500).json({error: error}));
};

exports.login = (req, res) => {
    User.findOne({where: {email: req.body.email}})
        .then(user => {
            if (!user) {
                return res.status(401).json({error: 'Utilisateur non trouvé'})
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({error: 'Mot de passe incorrect'})
                    }
                    res.status(200).json({
                        user,
                        token: jwt.sign(
                            {userId: user.id},
                            'RANDOM_SECRET_TOKEN',
                            {expiresIn: '24h'}
                        )
                    })
                })
        })
};

exports.getAllUsers = async (req, res) => {
    const users = await User.findAll();
    return res.status(200).json({ users })
};

exports.getOneUser = async (req, res) => {
    const user = await User.findByPk(req.body.id);
    return res.status(200).json({ user })
}

exports.updateAccount = (req, res) => {
    User.findByPk(req.body.user_id)
        .then(async (user) => {
            user.set({
                ...req.body = user
            });
            await user.save();
            return res.status(200).json({message: 'Informations mises à jour !'})
        })
        .catch(error => {
            return res.status(500).json({error})
        });
}

exports.deleteAccount = (req, res) => {
    User.findByPk(req.body.id)
        .then(async (user) => {
            await user.destroy();
            return res.status(204).json({message: 'Utilisateur supprimé'})
        })
        .catch(error => {
            return res.status(500).json({error})
        });
};