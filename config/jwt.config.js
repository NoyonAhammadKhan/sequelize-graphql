const dotenv = require('dotenv');
dotenv.config();

const JWTConfig ={
    JWT_SECRET:process.env.JWT_SECRET,
    JWT_LIFE_TIME:process.env.JWT_LIFE_TIME
}

module.exports = JWTConfig