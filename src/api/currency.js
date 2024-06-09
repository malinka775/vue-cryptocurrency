import ApiWorker from './index.js';

const ERROR_MESSAGE_DEFAULT = 'Something went wrong. Please try again later';

const binanceAxiosConfig = {
  baseURL: 'https://api.binance.com/api/v3',
  headers: {
    'Content-Type': 'application/json',
  },
};

const alternAxiosConfig = {
  baseURL: 'https://api.alternative.me',
  headers: {
    'Content-Type': 'application/json',
  },
};

const binanceAxiosInstance = new ApiWorker(binanceAxiosConfig).getInstance();
const alternAxiosInstance = new ApiWorker(alternAxiosConfig, true).getInstance();

async function getListOfAvailableBaseCurrencies() {
  try {
    const response = await binanceAxiosInstance.get('/exchangeInfo');
    const symbols = response.data.symbols.map((symbol) => symbol.quoteAsset);
    return new Set(symbols);
  } catch (e) {
    throw new Error(e.message || ERROR_MESSAGE_DEFAULT);
  }
}
async function getAllBaseCurrencyPairs(currency = 'USDT') {
  const currencyName = currency.toUpperCase();
  try {
    const response = await binanceAxiosInstance.get('/ticker/price');
    const pairs = response.data;
    const regExp = new RegExp(`${currencyName}$`);
    const currencyPairs = [];
    pairs.forEach(({ symbol, price }) => {
      if (symbol.match(regExp)) {
        currencyPairs.push({
          id: symbol,
          currency: symbol.slice(0, -currencyName.length),
          baseCurrency: currencyName,
          price,
        });
      }
    });
    return currencyPairs;
  } catch (e) {
    throw new Error(e.message || ERROR_MESSAGE_DEFAULT);
  }
}

async function getFearAndGreedIndex() {
  try {
    const response = await alternAxiosInstance.get('/fng');
    const indexData = response.data.contents;
    return JSON.parse(indexData);
  } catch (e) {
    throw new Error(e.message || ERROR_MESSAGE_DEFAULT);
  }
}

export { getAllBaseCurrencyPairs, getFearAndGreedIndex, getListOfAvailableBaseCurrencies };
