import { ref } from 'vue';
import { defineStore } from 'pinia';

// eslint-disable-next-line import/prefer-default-export
export const useCurrenciesStore = defineStore('currencies', () => {
  const currencies = ref(null);
  const availableCurrencies = ref(null);
  const gnfCoefficient = ref(null);
  function setCurrencies(value) {
    currencies.value = value;
  }
  function setAvailableCurrencies(value) {
    availableCurrencies.value = value;
  }
  function setGnfCoefficient(coef) {
    gnfCoefficient.value = coef;
  }
  return {
    currencies,
    setCurrencies,
    gnfCoefficient,
    setGnfCoefficient,
    availableCurrencies,
    setAvailableCurrencies,
  };
});
