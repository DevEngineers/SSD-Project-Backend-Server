const Message = require("../models/Message");
const os = require('os');
const mkdirp = require('mkdirp');
const fs = require('fs');


exports.createMessageWorker = async (req,res,next) => {
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

exports.createMessageManager = async(req,res,next) => {
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

exports.managerUploadFile = (req,res,next) => {
    try{
        if(!req.files){
            res.send({
                statusCode: 403,
                message: 'No file for upload'
            });
        }else if (req.files){
            // declaring file property
            const file = req.files.file;

            // get the current logged-in OS username directory
            const homeDir = os.userInfo().homedir;

            // declare files save folder path 
            const directory = `${homeDir}/Desktop/Files`;

            // ""./desktop/Files" Create the folder
            if(!fs.existsSync(directory)){
                const made = mkdirp.sync(`${directory}`);
            }

            // folder location + file Name(data + filaName)
            if(fs.existsSync(directory)){
                const location = `${directory}/` + Date.now()+'--'+file.name;
                file.mv(location);
            
                res.send({
                    statusCode:200,
                    body:location
                })
            }
        }
    } catch(err) {
        res.status(500).send(err);
    }
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

exports.getMessageByName = async (req,res,next) => {
    const name = req.params.id;
    await Message.find({user:req.params.id})
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
