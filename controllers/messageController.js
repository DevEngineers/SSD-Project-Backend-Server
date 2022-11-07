const Message = require("../models/Message");

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

            /**
             *  folder location + file Name(data + filaName)
             */
            const location = `C://Users//{userName}//Desktop//Files//` + Date.now()+'--'+file.name;

            file.mv(location);
            
            res.send({
                statusCode:200,
                body:location
            })
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

const fileUpload = (fileData) => {
    console.log("On fileUpload", fileData);
    

    upload.single("file");
}