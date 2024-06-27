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

const login_admin = async function(req, res) {
    let data = req.body;
    let admin_login = [];
    
    admin_login = await Admin.find({email: data.email});
    // buscamos si ya existe
    if (admin_login.length == 0) {
        res.status(200).send({message: "No se encontro el correo"});
    } else {
        // LOGIN
        let admin = admin_login[0];
        console.log(admin)
        
        bcrypt.compare(data.password, admin.password, function(error, check) {
            if (check) {
                res.status(200).send({data: admin});
            } else {
                res.status(200).send({message: "La contraseña es incorrecta", data: undefined});
            }
        })
    }
}

module.exports = {
    registro_admin,
    login_admin,
}