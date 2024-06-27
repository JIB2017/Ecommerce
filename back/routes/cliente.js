'use strict'

let express = require("express");
let clienteController = require("../controllers/ClienteController");

let api = express.Router();

api.post("/registro_cliente", clienteController.registro_cliente);
api.post("/login_cliente", clienteController.login_cliente);

module.exports = api;