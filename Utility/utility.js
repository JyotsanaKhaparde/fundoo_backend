const jwt = require('jsonwebtoken');
module.exports = {
    tokenGenerated(payload) {
        const jwtToken = jwt.sign({ payload }, 'secretkey', { expiresIn: '24h' });
        const obj = {
            success: true,
            message: 'Authentication successful!',
            token: jwtToken
        }
        return obj;
    }
}