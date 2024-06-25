const jwt = require('jsonwebtoken');
const secret = "Udit@123$%&*456780";

function generateToken(user) {
    return jwt.sign({ id: user._id, email: user.email }, secret, { expiresIn: '1d' });
}

function getUser(token) {
    if (!token) {
        return null;
    }

    try {
        const user = jwt.verify(token, secret);
        return user;
    } catch (err) {
        return null;
    }
}

module.exports = { generateToken, getUser };
