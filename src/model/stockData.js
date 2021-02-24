const mongoose = require('mongoose');

const StockData = new mongoose.Schema(
  {
    "key": {type: String, unique: true, required: true},
    "priority": {type: Number},
    "symbol": {type: String, required: true},
    "identifier": {type: String},
    "series": {type: String},
    "open": {type: Number, required: true},
    "dayHigh": {type: Number, required: true},
    "dayLow": {type: Number, required: true},
    "lastPrice": {type: Number, required: true},
    "previousClose": {type: Number, required: true},
    "change": {type: Number, required: true},
    "pChange": {type: Number, required: true},
    "totalTradedVolume": {type: Number},
    "totalTradedValue": {type: Number},
    "lastUpdateTime": {type: Number},
    "yearHigh": {type: Number, required: true},
    "ffmc": {type: Number},
    "yearLow": {type: Number, required: true},
    "nearWKH": {type: Number},
    "nearWKL": {type: Number},
    "perChange365d": {type: Number},
    "date365dAgo": {type: Number},
    "chart365dPath": {type: String},
    "date30dAgo": {type: Number},
    "perChange30d": {type: Number},
    "chart30dPath": {type: String},
    "chartTodayPath": {type: String},
    "meta": {
      "symbol": {type: String},
      "companyName": {type: String},
      "industry": {type: String},
      "activeSeries": [{type: String}],
      "debtSeries": [{type: String}],
      "tempSuspendedSeries": [{type: String}],
      "isFNOSec": {type: Boolean},
      "isCASec": {type: Boolean},
      "isSLBSec": {type: Boolean},
      "isDebtSec": {type: Boolean},
      "isSuspended": {type: Boolean},
      "isETFSec": {type: Boolean},
      "isDelisted": {type: Boolean},
      "isin": {type: String}
    }
  });

module.exports = mongoose.model('Stock', StockData);
