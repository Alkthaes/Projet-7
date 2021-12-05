const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {User, Post} = require('../models');
// variables used to cipher and decipher the email adress
const crypto = require('crypto');
const algorythm = 'aes256';
//the key to cipher !use an env variable in production!
const cryptoKey = 'l5JmP+G0/1zB%;r8B8?2?2pcqGcL^3'

exports.signup = (req, res) => {

    User.findOne({where: {emaiil: req.body.email}})
        .then(user => {
            if (user) {
                return res.status(400).json({message: 'Adresse email déjà utilisée'})
            }
        })
    bcrypt.hash(req.body.password, 10)
        .then(async hash => {
            //email encryption
            const cipher = crypto.createCipher(algorythm, cryptoKey);
            let crypted = cipher.update(req.body.email, 'utf8', 'hex');
            crypted += cipher.final('hex');
            const user = await User.create({
                lastname: req.body.lastname,
                firstname: req.body.firstname,
                email: crypted,
                picture: `${req.protocol}://${req.get('host')}/images/default-avatar.jpg`,
                password: hash,
                roles: 'ROLE_USER'
            })
            return res.status(201).json({user});
        })
        .catch(error => res.status(500).json({error: error}));
};

exports.login = async (req, res) => {
    //email encryption
    const cipher = crypto.createCipher(algorythm, cryptoKey);
    let crypted = cipher.update(req.body.email, 'utf8', 'hex');
    crypted += cipher.final('hex');
    const email = crypted;
    const user = await User.findOne({where: {email: email}})

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
        .catch(error => res.status(500).json({error}));

};

exports.getAllUsers = async (req, res) => {
    const users = await User.findAll();
    return res.status(200).json({users})
};

exports.getOneUser = async (req, res) => {
    const user = await User.findByPk(req.params.id);
    //email decryption
    const decipher = crypto.createDecipher(algorythm, cryptoKey);
    let dec = decipher.update(user.email, 'hex', 'utf8');
    dec += decipher.final('utf8');
    user.email = dec;
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
                //email encryption
                const cipher = crypto.createCipher(algorythm, cryptoKey);
                let crypted = cipher.update(req.body.email, 'utf8', 'hex');
                crypted += cipher.final('hex');
                user.email = crypted;
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