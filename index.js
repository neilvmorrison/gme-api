const Koa = require('koa');
const axios = require('axios');
const cheerio = require('cheerio');

const PORT = process.env.PORT || 4000;
const app = new Koa();
const url = 'https://finance.yahoo.com/quote/GME/';

app.use(async (ctx) => {
  const { data } = await axios.get(url);
  const $ = cheerio.load(data);
  const priceComponent = $('span[data-reactid="32"]').text();
  const marketPrice = priceComponent.replace('FinancialsFull screen', '')
  ctx.body = marketPrice;
})

app.listen(PORT, () => {
  console.log('Listening on port: ', PORT)
})