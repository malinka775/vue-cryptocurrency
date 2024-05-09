import axios from 'axios';

const config = {
  myApiKey: '23de8390d1ab938e15aaf4753b6663e03d060c1f',
  testAddress: '1335zLG7fgUpMAvjy5Ga2FmPzSASFHrc1u',
};

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

const cryptoApisAxiosConfig = {
  baseURL: 'https://rest.cryptoapis.io',
  headers: {
    'Content-Type': 'application/json',
    'X-API-Key': config.myApiKey,
  },
};

const binanceAxiosInstance = axios.create(binanceAxiosConfig);
const alternAxiosInstance = axios.create(alternAxiosConfig);
const cryptoApisAxiosInstance = axios.create(cryptoApisAxiosConfig);

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

async function getCurrencyAllUsdtPairs(currency = 'USDT') {
  try {
    const response = await binanceAxiosInstance.get('/ticker/price');
    const pairs = response.data;
    const regExp = new RegExp(`${currency}$`);
    const currencyPairs = [];
    // eslint-disable-next-line
    for (const pair of pairs) {
      const { symbol } = pair;
      if (symbol.match(regExp)) {
        currencyPairs.push({
          id: symbol,
          currency: symbol.slice(0, -4),
          baseCurrency: currency,
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

async function getWalletBalance(address = config.testAddress, blockchain = 'binance-smart-chain') {
  try {
    const response = await cryptoApisAxiosInstance.get(`/blockchain-data/${blockchain}/testnet/addresses/${address}/balance`);
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

export {
  getCurrencyPrice, getCurrencyAllUsdtPairs, getFearAndGreedIndex, getWalletBalance,
};
