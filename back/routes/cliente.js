'use strict'

let express = require("express");
let clienteController = require("../controllers/ClienteController");

let api = express.Router();

api.post("/registro_cliente", clienteController.registro_cliente);

module.exports = api;