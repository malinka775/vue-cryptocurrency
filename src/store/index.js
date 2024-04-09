import { ref } from 'vue';
import { defineStore } from 'pinia';

// eslint-disable-next-line import/prefer-default-export
export const useCurrenciesStore = defineStore('currencies', () => {
  const currencies = ref(null);
  function setCurrencies(value) {
    currencies.value = value;
  }
  return { currencies, setCurrencies };
});
