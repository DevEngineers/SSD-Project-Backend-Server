const Message = require("../models/Message");

exports.createMessage = async (req,res,next) => {    
    console.log(req.body);
    await Message.insertMany(req.body)
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

exports.getMessage = async (req,res,next) =>{
    await Message.find({})
        .then((message) =>{
            res.statusCode = 200;
            res.setHeader("Content-Type","application/json")
            res.json(message);
        },(err) =>{
            next(err);
        })
        .catch((err) =>{
            next(err);
        })
};

exports.getMessageByID = async (req,res,next) => {
    await Message.findById(req.params.id)
        .then((message) => {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json(message);
        },(err) => {
            next(err);
        })
        .catch((err) => {
            next(err);
        })
};

exports.UpdateMessage = async (req, res, next) => {
    await Message.findOneAndUpdate(req.params.id,{
        $set:req.body
    },{ new :true })
        .then((message) => {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json(message);
        },(err) => {
            next(err);
        })
        .catch((err) => {
            next(err);
        })
};

exports.deleteMessage = async (req, res, next) => {
    await Message.findByIdAndRemove(req.params.id,)
        .then(() => {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json({data:"Success"});
        },(err) => {
            next(err);
        })
        .catch((err) => {
            next(err);
        })
};