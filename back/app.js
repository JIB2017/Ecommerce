'use strict'

const express = require("express");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");

let port = process.env.PORT || 4201;
const app = express();


mongoose.connect("mongodb://127.0.0.1:27017/Ecommerce")
.then(() => {
    console.log("Servidor corriendo...");
        app.listen(port, function() {
            console.log("Servidor corriendo en el puerto " + port);
        })
})
.catch((err, res) => {
    console.log(err);
})

module.exports = app;