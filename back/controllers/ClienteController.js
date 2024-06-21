'use strict'

let Cliente = require("../models/cliente");

const registro_cliente = async function(req, res) {
    res.status(200).send({message: "Hola Mundo"})
}

module.exports = {
    registro_cliente
}