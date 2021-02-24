const express = require('express')
require('./db/connect')
require("./batchJob");
const app = express()

app.get('/', (req, res) => {
  res.send("ok")
})

module.exports = app
