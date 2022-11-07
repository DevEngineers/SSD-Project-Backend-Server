const Message = require("../models/Message");
const multer = require('multer');

const fileStorageEngine = multer.diskStorage({
    destination: (req,file,cd) =>{
        console.log("storage 01 ");
        cd(null,'./Files')
    },
    filename: (req,file,cd) =>{
        console.log("storage 02");
        cd(null, Date.now()+'--'+file.name)
    }
});
const upload = multer ({storage:fileStorageEngine});

exports.createMessageWorker = async (req,res,next) => {    
    console.log(req.body);
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

            file.mv('./Files/' + Date.now()+'--'+file.name);

            res.send({
                statusCode:200,
                message:'file uploaded'
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