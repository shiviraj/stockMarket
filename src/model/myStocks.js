const mongoose = require('mongoose');

const StockData = new mongoose.Schema({
  symbol: {type: String, required: true},
  qty: {type: Number, required: true, default: 1},
  costPrice: {type: Number, required: true},
  alertOnGainPercentage: {type: Number, default: 10},
  alertOnLossPercentage: {type: Number, default: 5},
  purchasedOn: {type: Number, default: new Date()}
});

module.exports = mongoose.model('MyStock', StockData);
