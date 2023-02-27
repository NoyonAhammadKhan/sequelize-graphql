
const jwt=require("jsonwebtoken")
const jwtConfig = require('../config/jwt.config');

function setJWT(id,email){
    const token=jwt.sign({id, email},jwtConfig.JWT_SECRET, {
        expiresIn: jwtConfig.JWT_LIFE_TIME
    });
    return token;
}

module.exports=setJWT;

