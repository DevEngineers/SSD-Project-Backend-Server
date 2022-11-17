const dotenv = require('dotenv').config();

exports.intial = (req, res, next) => {
    res.render('index', { title: 'Express' });
}

const key = {
    publicKey : process.env.PUBLIC_KEY,
    certificate: process.env.PRIVATE_KEY,
  }
exports.tlsHandshake = async (req,res,next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");       
    res.json(key);
};