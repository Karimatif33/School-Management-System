const jwt = require('jsonwebtoken')

const generateToken = (id) => {
return jwt.sign({id}, 'soon', {expiresIn:'2d'})
}
module.exports = generateToken;
