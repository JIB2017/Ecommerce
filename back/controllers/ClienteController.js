'use strict'

let Cliente = require("../models/cliente");
let bcrypt = require("bcrypt-nodejs");
let jwt = require("../helpers/jwt");

const registro_cliente = async function(req, res) {
    let data = req.body;
    let cliente_arr = [];

    cliente_arr = await Cliente.find({email: data.email});
    // buscamos si ya existe
    if (cliente_arr.length == 0) {
        // pregunta si el usuario ingreso una contraseña
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

const login_cliente = async function(req, res) {
    let data = req.body;
    let cliente_login = [];
    
    cliente_login = await Cliente.find({email: data.email});
    // buscamos si ya existe
    if (cliente_login.length == 0) {
        res.status(200).send({message: "No se encontro el correo"});
    } else {
        // LOGIN
        let user = cliente_login[0];
        console.log(user)
        
        bcrypt.compare(data.password, user.password, async function(error, check) {
            if (check) {
                res.status(200).send({
                    data: user,
                    token: jwt.createToken(user),
                });
            } else {
                res.status(200).send({message: "La contraseña es incorrecta", data: undefined});
            }
        })
    }
}

module.exports = {
    registro_cliente,
    login_cliente,
}