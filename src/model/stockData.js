const mongoose = require('mongoose');

const StockData = new mongoose.Schema(
  {
    key: {type: String, unique: true, required: true},
    LongName: {type: String, required: true},
    UlaValue: {type: Number, required: true},
    LastTrdTime: {type: Number, required: true},
    ATP: {type: Number, required: true},
    PercentChange: {type: Number, required: true},
    Symbol: {type: String, required: true},
    Price: {type: Number, required: true},
    Change: {type: Number, required: true},
    Volume: {type: Number, required: true},
    TurnOver: {type: Number, required: true},
    Open: {type: Number, required: true},
    High: {type: Number, required: true},
    Low: {type: Number, required: true},
    PreCloseRate: {type: Number, required: true},
    OI: {type: Number, required: true},
    upperCircuit: {type: Number, required: true},
    lowerCircuit: {type: Number, required: true},
    Wk52High: {type: Number, required: true},
    W2AvgQ: {type: Number, required: true},
    Wk52low: {type: Number, required: true},
    MCapFF: {type: Number, required: true},
    MCapFull: {type: Number, required: true},
  });

module.exports = mongoose.model('Stock', StockData);
