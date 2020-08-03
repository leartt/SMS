const jwt = require('jsonwebtoken');

const verifyAuth = (req, res, next) => {
    const token = req.headers['authorization']
    
    if(!token) return res.status(401).json('Access Denied')
    
    try {
        const verified = jwt.verify(token.split(' ')[1], process.env.secret);
        req.user = verified;
        next();
    }
    catch(err) {
        res.status(401).json({msg: 'Invalid token'});
    }
}

module.exports = verifyAuth;