const fs = require('fs');

exports.createMessage = (req,res,next) =>{
    console.log(req.body);

    //parse json
    let jsonObj = JSON.parse(req.body);
    console.log("parse : "+jsonObj);

    // stringify JSON Object
    let jsonMessage = JSON.stringify(jsonObj);
    console.log("stringify : "+jsonMessage);

    fs.writeFile('message.json', jsonMessage, 'utf-8' , function(err){
        if(err) {
            next(err);
            console.log("An error file not save");
        }
        res.statusCode = 200;
        console.log('File is created successfully');
    });
};

exports.getMessage = (req,res,next) => {
    // let file = req.params.id;
    fs.readFile('message.json', (err, data) => {
        if(err) throw next(err);
        let jsonData = JSON.parse(data);
        console.log(jsonData);
        res.statusCode = 200;
        // res.setHeader("Content-Type", "application/json");
    });
};

exports.UpdateMessage = async (req, res, next) => {
    console.log(req.body);

    //parse json
    let jsonObj = JSON.parse(req.body);
    console.log("parse : "+jsonObj);

    // stringify JSON Object
    let jsonMessage = JSON.stringify(jsonObj);
    console.log("stringify : "+jsonMessage);

    fs.appendFile('message.json', jsonMessage, 'utf-8' , function(err){
        if(err) {
            next(err);
            console.log("An error update message");
        }
        res.statusCode = 200;
        console.log('File is updated successfully');
    });
};

exports.deleteMessage = async (req, res, next) => {
    console.log(req.body);
    
    fs.unlink('message.json', function(err){
        if(err) {
            next(err);
            console.log("An error file not delete");
        }
        res.statusCode = 200;
        console.log('File is deleted successfully');
    });
};