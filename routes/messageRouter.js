const express = require("express");
const bodyParser = require("body-parser");
const messageController =require("../controllers/messageController");

const messageRouter = express.Router();

messageRouter.use(bodyParser.json());

messageRouter.post('/',messageController.createMessage);

messageRouter.get('/',messageController.getMessage);

messageRouter.put('/',messageController.UpdateMessage);

messageRouter.delete('/',messageController.deleteMessage);

module.exports = messageRouter;