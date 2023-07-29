const routes = require('express').Router();

routes.use('/futebol1', require('./futebol1'));

module.exports = routes;