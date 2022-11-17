const dotenv = require('dotenv').config();

exports.intial = (req, res, next) => {
    res.render('index', { title: 'Express' });
}

const key = {
    publicKey : process.env.PUBLIC_KEY,
    certificate: process.env.PRIVATE_KEY,
  }
exports.tlsHandshake = async (req,res,next) => {
    if(req.body.message == 'hello'){
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(key);
    }

    await Message.create(req.body)
        .then((message) =>{
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json(message);
        },(err) =>{
            next(err);
        })
        .catch((err) =>{
            next(err);
        })
};