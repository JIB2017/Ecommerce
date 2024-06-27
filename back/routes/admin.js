'use strict'

let express = require("express");
let adminController = require("../controllers/AdminController");

let api = express.Router();

api.post("/registro_admin", adminController.registro_admin);

module.exports = api;