'use strict'

let Admin = require("../models/admin");
let bcrypt = require("bcrypt-nodejs");

const registro_admin = async function(req, res) {
    let data = req.body;
    let admin_arr = [];

    admin_arr = await Admin.find({email: data.email});
    if (admin_arr.length == 0) {
        if (data.password) {
            bcrypt.hash(data.password, null, null, async function(err, hash) {
                if (hash) {
                    data.password = hash;
                    await Admin.create(data);
                    res.status(200).send({message: "Administrador agregado"});
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
    registro_admin
}