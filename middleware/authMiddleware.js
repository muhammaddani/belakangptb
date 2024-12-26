const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).send('Authorization header is missing.');
        }

        const token = authHeader.split(' ')[1];
        if (!token) {
            return res.status(401).send('Bearer token is not provided.');
        }

        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                // Penanganan jika token kadaluwarsa atau invalid
                const message = err.name === 'TokenExpiredError' ? 'Token expired.' : 'Token is invalid.';
                return res.status(403).send(message);
            }
            req.userId = decoded.id;  // asumsikan payload token memiliki id user
            next();
        });
    } catch (error) {
        res.status(401).send('Authentication failed.');
    }
};