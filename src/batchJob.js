const axios = require("axios");
const moment = require("moment");
const StockData = require('./model/stockData')


const parseData = function (data) {
  const time = moment(data.LastTrdTime, "DD MMM YYYY HH:mm")
  data.LastTrdTime = time
  data.Symbol = data.ScripName
  data.key = `${data.Symbol} ${time}`
  data.UlaValue = +data.UlaValue
  data.ATP = +data.ATP
  data.upperCircuit = +data.upperCircuit
  data.lowerCircuit = +data.lowerCircuit
  data.Wk52High = +data.Wk52High
  data.W2AvgQ = +data.W2AvgQ
  data.Wk52low = +data.Wk52low
  data.MCapFF = +data.MCapFF
  data.MCapFull = +data.MCapFull
  return data
}

let retry = 0;
let pageNo = 1;
const fetchAndSaveStockData = async function () {
  try {
    const {data} = await axios.get(process.env.BSE_URI, {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:85.0) Gecko/20100101 Firefox/85.0',
      params: {flag: 'Equity', ddlVal1: 'All', ddlVal2: 'All', m: 0, pgN: pageNo++}
    })
    if (!data.length) return pageNo = 1
    for (const stockData of data) {
      const parsedData = parseData(stockData)
      await new StockData(parsedData).save().catch(e => {
      })
    }
    retry = 0
    console.log('update data of page:', pageNo - 1, moment().format("MMM DD, YYYY HH:mm:ss"))
    return await fetchAndSaveStockData()
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

