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

async function getCurrencyPrice(currency, baseCurrency) {
  const params = { symbol: `${currency}${baseCurrency}` };
  try {
    const response = await binanceAxiosInstance.get('/ticker/price', { params });
    console.log(response);
  } catch (e) {
    if (e.response) {
      console.log(e.response);
    } else {
      console.log(e.message || 'Something went wrong. Please try again later');
    }
    throw new Error(e.message);
  }
}

async function getCurrencyAllUsdtPairs() {
  try {
    const response = await binanceAxiosInstance.get('/ticker/price');
    const pairs = response.data;
    const regExp = /USDT$/;
    const usdtPairs = [];
    // eslint-disable-next-line
    for (const pair of pairs) {
      const { symbol } = pair;
      if (symbol.match(regExp)) {
        usdtPairs.push({
          id: symbol,
          currency: symbol.slice(0, -4),
          baseCurrency: 'USDT',
          price: pair.price,
        });
      }
    }
    return usdtPairs;
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

export { getCurrencyPrice, getCurrencyAllUsdtPairs, getFearAndGreedIndex };
