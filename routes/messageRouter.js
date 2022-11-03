const express = require("express");
const bodyParser = require("body-parser");
const messageController =require("../controllers/messageController");

const messageRouter = express.Router();

messageRouter.use(bodyParser.json());

messageRouter.post('/',messageController.createMessage);

messageRouter.get('/',messageController.getMessage);

messageRouter.get('/:id',messageController.getMessageByID);

messageRouter.put('/:id',messageController.UpdateMessage);

messageRouter.delete('/:id',messageController.deleteMessage);

module.exports = messageRouter;