const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {

        console.log(req.headers.authorization);
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        const userId = decodedToken.userId;
        if (req.body.user_id && req.body.user_id != userId) {
            throw 'Identifiants invalides'
        } else {
            next();
        }
};