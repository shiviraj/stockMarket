const axios = require("axios");
const app = require("./src/app")
const port = process.env.PORT
app.listen(port, () => console.log('server is listening on', port))

const awakeServer = () =>
  axios.get('https://shivi-awake-workers.herokuapp.com')

setInterval(awakeServer, 300000)
