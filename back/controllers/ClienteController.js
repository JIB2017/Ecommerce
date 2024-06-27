'use strict'

let Cliente = require("../models/cliente");
let bcrypt = require("bcrypt-nodejs");

const registro_cliente = async function(req, res) {
    let data = req.body;
    let cliente_arr = [];

    cliente_arr = await Cliente.find({email: data.email});
    if (cliente_arr.length == 0) {
        if (data.password) {
            bcrypt.hash(data.password, null, null, async function(err, hash) {
                if (hash) {
                    data.password = hash;
                    await Cliente.create(data);
                    res.status(200).send({message: "Cliente agregado"});
                } else {
                    res.status(200).send({message: "errorServer", data: undefined});
                }
            })
        } else {
            res.status(200).send({message: "No se ingreso contraseña", data: undefined});
        }
       
    } else {
        res.status(200).send({message: "El correo ya esta en uso", data: undefined})
    }
}

module.exports = {
    registro_cliente
}