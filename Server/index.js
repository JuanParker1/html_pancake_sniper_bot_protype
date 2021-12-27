
// Nossos Módulos
const __wallet = require("./modules/wallet.js");
const __logStorer = require("./modules/logStorer")

// Outros
const express = require("express");
const req = require('express/lib/request');
const app = express()
var bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
const cors = require('cors');
app.use(cors())
app.listen(300, () => { "Ouvindo na porta 300" })

// Requisições HTTP
app.post("/modules/logStorer/insertlog", __logStorer.insertLog)
app.post('/modules/logStorer/getLogs', __logStorer.getLogs)
app.post('/modules/wallet/getWalletBalance', __wallet.getWalletBalance)