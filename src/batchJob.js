const axios = require("axios");
const moment = require("moment");
const StockData = require('./model/stockData')


const parseData = function (data) {
  data.lastUpdateTime = moment(data.lastUpdateTime, "DD-MMM-YYYY HH:mm:ss")
  data.date365dAgo = moment(data.date365dAgo, "DD-MMM-YYYY")
  data.date30dAgo = moment(data.date30dAgo, "DD-MMM-YYYY")
  data.key = `${data.symbol} ${data.lastUpdateTime}`
  return data
}

let retry = 0;
const fetchAndSaveStockData = async function () {
  try {
    const {data} = await axios.get(process.env.NSE_URI)
    for (const stockData of data.data) {
      const parsedData = parseData(stockData)
      await new StockData(parsedData).save().catch(e => {
      })
    }
    retry = 0
  } catch (e) {
    retry++;
    return (retry < 3) && await fetchAndSaveStockData()
  }

}

const runBatchJob = async function () {
  await fetchAndSaveStockData();

}

const main = async () => {
  await runBatchJob()
  setInterval(runBatchJob, 600000)
}

main()

