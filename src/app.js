const axios = require("axios");

const verifySymbol = async function (symbol) {
  console.log(symbol)
  const {data} = await axios.get(`https://www.nseindia.com/api/equity-stockIndices?index=NIFTY 50`)
  console.log(data)
}

