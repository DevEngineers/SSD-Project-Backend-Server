const express = require('express');
const bodyParser = require("body-parser");
const router = express.Router();
const indexController = require('../controllers/index');
const keycloak = require('../keycloak-config').getKeycloak();

router.use(bodyParser.json());
/* GET home page. */
router.get('/', indexController.intial);
router.post('/', keycloak.protect(['worker','manager']),indexController.tlsHandshake);

module.exports = router;
