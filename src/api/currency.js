import axios from 'axios';

const binanceAxiosConfig = {
  baseURL: 'https://api.binance.com/api/v3',
  headers: {
    'Content-Type': 'application/json',
  },
};

const alternAxiosConfig = {
  baseURL: `https://api.allorigins.win/get?url=${encodeURIComponent('https://api.alternative.me')}`,
  headers: {
    'Content-Type': 'application/json',
  },
};

const binanceAxiosInstance = axios.create(binanceAxiosConfig);
const alternAxiosInstance = axios.create(alternAxiosConfig);
async function getListOfAvailableAssets() {
  try {
    const response = await binanceAxiosInstance.get('/exchangeInfo');
    console.log('resp', response);
    const symbols = response.data.symbols.map((symbol) => symbol.quoteAsset);
    return new Set(symbols);
  } catch (e) {
    if (e.response) {
      console.log(e.response);
    } else {
      console.log(e.message || 'Something went wrong. Please try again later');
    }
    throw new Error(e.message);
  }
}
async function getAllBaseCurrencyPairs(currency = 'USDT') {
  const currencyName = currency.toUpperCase();
  try {
    const response = await binanceAxiosInstance.get('/ticker/price');
    const pairs = response.data;
    const regExp = new RegExp(`${currencyName}$`);
    const currencyPairs = [];
    // eslint-disable-next-line
    for (const pair of pairs) {
      const { symbol } = pair;
      if (symbol.match(regExp)) {
        currencyPairs.push({
          id: symbol,
          currency: symbol.slice(0, -currencyName.length),
          baseCurrency: currencyName,
          price: pair.price,
        });
      }
    }
    console.log('currencyPairs', currencyPairs);
    return currencyPairs;
  } catch (e) {
    if (e.response) {
      console.log(e.response);
    } else {
      console.log(e.message || 'Something went wrong. Please try again later');
    }
    throw new Error(e.message);
  }
}

async function getFearAndGreedIndex() {
  try {
    const response = await alternAxiosInstance.get('/fng');
    const indexData = response.data.contents;
    return JSON.parse(indexData);
  } catch (e) {
    if (e.response) {
      console.log(e.response);
    } else {
      console.log(e.message || 'Something went wrong. Please try again later');
    }
    throw new Error(e.message);
  }
}

export { getAllBaseCurrencyPairs, getFearAndGreedIndex, getListOfAvailableAssets };
