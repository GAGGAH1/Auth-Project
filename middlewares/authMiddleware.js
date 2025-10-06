const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.headers["authorization"] || req.query.token || req.body.token;
    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Authorization token required'
        });
    }
    
    try {
        const bearer = token.split(' ');
        if(bearer.length !== 2 || bearer[0] !== 'Bearer') {
            return res.status(401).json({
                success: false,
                message: 'Invalid token format'
            });
        }
        const tokenValue = bearer[1];

        const decoded = jwt.verify( tokenValue, process.env.JWT_SECRET);
        req.user = decoded.user;
        
    } catch (error) {
        console.error('Token verification error:', error);
        return res.status(401).json({
            success: false,
            message: 'Invalid or expired token'
        });
    }

    return next();
};

module.exports = { verifyToken };