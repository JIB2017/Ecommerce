'use strict'

const express = require("express");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");

let port = process.env.PORT || 4201;
const app = express();
let cliente_route = require("./routes/cliente");
let admin_route = require("./routes/admin");


mongoose.connect("mongodb://127.0.0.1:27017/Ecommerce")
.then(() => {
    console.log("Servidor corriendo...");
        app.listen(port, function() {
            console.log("Servidor corriendo en el puerto " + port);
        })
})
.catch((err, res) => {
    console.log(err);
});

app.use(bodyparser.urlencoded({extended: true}))
app.use(bodyparser.json({limit: "50mb", extended: true}))

app.use((req,res,next) => {
    res.header("Access-Control-Allow-Origins", "*");
    res.header("Access-Control-Allow-Headers", "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Access-Controll-Allow-Request-Method");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
    res.header("Allow", "GET, PUT, POST, DELETE, OPTIONS");
    next();
});

app.use("/api",cliente_route);
app.use("/api",admin_route);

module.exports = app;