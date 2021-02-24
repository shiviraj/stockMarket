const express = require('express')
require('./db/connect')
require("./batchJob");
const app = express()


module.exports = app
