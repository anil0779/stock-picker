import axios from 'axios';

const apiKey = 'FJBGSC5V1UGNDIMW';

export const getStocksAutoSuggestions = (keywords) => {
    const url = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${keywords}&apikey=${apiKey}`;
    return axios.get(url);
};

export const getStockOverview = (symbol) => {
    const url = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${symbol}&apikey=${apiKey}`;
    return axios.get(url);
};