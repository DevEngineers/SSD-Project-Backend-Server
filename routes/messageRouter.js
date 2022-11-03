const express = require("express");
const bodyParser = require("body-parser");
const messageController =require("../controllers/messageController");
const keycloak = require('../keycloak-config').getKeycloak();

const messageRouter = express.Router();

messageRouter.use(bodyParser.json());

messageRouter.post('/worker', keycloak.protect('worker'),messageController.createMessageWorker);

messageRouter.post('/manager', keycloak.protect('manager'),messageController.createMessageManager);

messageRouter.get('/',keycloak.protect(['worker','manager']),messageController.getMessage);

messageRouter.get('/:id',keycloak.protect(['worker','manager']),messageController.getMessageByName);

messageRouter.put('/', keycloak.protect(['worker','manager']),messageController.UpdateMessage);

messageRouter.delete('/',keycloak.protect(['worker','manager']),messageController.deleteMessage);

module.exports = messageRouter;

