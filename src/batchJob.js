const axios = require("axios");
const moment = require("moment-timezone");
const StockData = require('./model/stockData')

const TIMEZONE = 'Asia/Kolkata'

const parseData = function (data) {
  const time = moment(data.LastTrdTime, "DD MMM YYYY HH:mm").tz(TIMEZONE)
  data.LastTrdTime = time
  data.Symbol = data.ScripName
  data.key = `${data.Symbol} ${time.toJSON()}`
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

const getData = async function () {
  const {data} = await axios.get(process.env.BSE_URI, {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:85.0) Gecko/20100101 Firefox/85.0',
    params: {flag: 'Equity', ddlVal1: 'All', ddlVal2: 'All', m: 0, pgN: pageNo++}
  })
  return data;
}

const fetchAndSaveStockData = async function () {
  try {
    if (pageNo === 21) return pageNo = 1
    const data = await getData();
    data.forEach(stockData => {
      new StockData(parseData(stockData)).save().catch(e => ({}))
    })
    retry = 0
    console.log('update data of page:', pageNo - 1, moment().utc().tz(TIMEZONE).format('MMM DD, YYYY hh:mm:ss:A'))
    return await fetchAndSaveStockData()
  } catch (e) {
    retry++;
    return (retry < 3) && await fetchAndSaveStockData()
  }
}

const isMarketOpen = function () {
  const today = moment().format('YYYY-MM-DD')
  const now = moment().utc().tz(TIMEZONE);
  return now.isBetween(`${today}T08:30:00+05:30`, `${today}T16:30:00+05:30`) && moment().utc().day()
}

const runBatchJob = async function () {
  if (isMarketOpen())
    await fetchAndSaveStockData();

}

const main = async () => {
  await runBatchJob()
  setInterval(runBatchJob, 900000)
}

main()

