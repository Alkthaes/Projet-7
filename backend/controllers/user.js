const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {User, Post} = require('../models');

exports.signup = (req, res) => {

        User.findOne({where: {emaiil: req.body.email}})
            .then(user => {
                if (user) {
                    return res.status(400).json({message: 'Adresse email déjà utilisée'})
                }
            })
    bcrypt.hash(req.body.password, 10)
        .then(async hash => {
            const user = await User.create({
                lastname: req.body.lastname,
                firstname: req.body.firstname,
                email: req.body.email,
                picture: `${req.protocol}://${req.get('host')}/images/default-avatar.jpg`,
                password: hash,
                roles: 'ROLE_USER'
            })
            return res.status(201).json({user});
        })
        .catch(error => res.status(500).json({error: error}));
};

exports.login = (req, res) => {
    User.findOne({where: {email: req.body.email}})
        .then(user => {
            if (!user) {
                return res.status(400).json({message: 'Utilisateur non trouvé'})
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(400).json({message: 'Mot de passe incorrect'})
                    }
                    res.status(200).json({
                        user,
                        token: jwt.sign(
                            {userId: user.id},
                            'RANDOM_TOKEN_SECRET',
                            {expiresIn: '24h'}
                        )
                    })
                })
        })
};

exports.getAllUsers = async (req, res) => {
    const users = await User.findAll();
    return res.status(200).json({users})
};

exports.getOneUser = async (req, res) => {
    const user = await User.findByPk(req.params.id);
    return res.status(200).json({user})
}

exports.updateUserInfo = (req, res) => {
    User.findByPk(req.body.id)
        .then(async (user) => {
            if (req.body.lastname != '') {
                user.lastname = req.body.lastname;
                await user.save();
            }
            if (req.body.firstname != '') {
                user.firstname = req.body.firstname;
                await user.save();
            }
            if (req.body.email != '') {
                user.email = req.body.email;
                await user.save();
            }
            if (req.body.password != '') {
                bcrypt.hash(req.body.password, 10)
                    .then(async hash => {
                        user.password = hash;
                        await user.save();
                    })
                    .catch(error => {
                        return res.status(500).json({error})
                    })
            }
            if (req.body.secteur != '') {
                user.secteur = req.body.secteur;
                await user.save();
            }
            if (req.body.fonction != '') {
                user.fonction = req.body.fonction;
                await user.save();
            }

            return res.status(200).json({message: 'Informations mises à jour !'})
        })
        .catch(error => {
            return res.status(500).json({error})
        });
};

exports.updateAvatar = (req, res) => {
    console.log(req.body);
    User.findByPk(req.body.id)
        .then(async user => {
            user.picture = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
            await user.save();
            return res.status(200).json({message: 'L\'avatar a été modifié !'});
        })
        .catch(error => {
            return res.status(500).json({error})
        });
};

exports.deleteAccount = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        await user.destroy();

        return res.status(204).json({message: 'Votre compte a bien été supprimé'});
    } catch (error) {
        return res.status(500).json({error});
    }
};