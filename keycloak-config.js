var session = require('express-session');
var Keycloak = require('keycloak-connect');

let _keycloak;

let keycloakConfig = {
    "realm": "SSD-Project-Realm",
    "bearerOnly": true,
    "serverUrl": "http://localhost:8080/auth/",
    "sslRequired": "external",
    "resource": "node-express-server",
    "confidentialPort": 0,
    "realmPublicKey:":"MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAgJ4f3YgONpC/6PR/9eyd8g+CFkJbRe0tz9H25/fO0yNHEn7oLNsal+BgmF4W3ayHW3u+dAqpc8oaL/nrfU6UPF03ipBzdfxIG2Cu4T04MAmyTpc5ir8a8iqlfOGM4BAs9nqadVDO4mbtihREw2weV8kY2rgCYg3jjYzYo1mfHCxFxeSInKqfPy4yco8PuhVS1inSDvFj5OxVBIgvuPWHlxAUZuB1gFswLuUEZnbD7Q3dLMYLTU00KF6Z1vDunm3XHrjFh7fEgbW5pU8iraQ52L/pjS0PbrsFc4vXkwRC2Tr5ObiKbiuqOr20TW2akOPOvmv4SYdGeKX2SDDrM108PwIDAQAB"
}

const initKeycloak = () => {
    if (_keycloak) {
        console.warn("Trying to init Keycloak again!");
        return _keycloak;
    } 
    else {
        console.log("Initializing Keycloak...");
        var memoryStore = new session.MemoryStore();
        _keycloak = new Keycloak({ store: memoryStore }, keycloakConfig);
        return _keycloak;
    }
}

const getKeycloak = () => {
    if (!_keycloak){
        console.error('Keycloak has not been initialized. Please called init first.');
    } 
    return _keycloak;
}

module.exports = {
    initKeycloak,
    getKeycloak
};