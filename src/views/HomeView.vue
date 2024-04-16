<!-- eslint-disable max-len -->
<!-- eslint-disable import/no-unresolved -->
<!-- eslint-disable no-unused-vars -->
<!-- eslint-disable no-useless-return -->
<!-- eslint-disable no-unused-vars -->
<template>
  <div class="home">
    <VContainer class="currency-container">
      <div class="currency-wrapper">
        <div class="currency-list">
        <CurrencyItem
          v-for="currency in currenciesToShow"
          :key="currency.id"
          :base-currency-name="currency.baseCurrency"
          :currency-name="currency.currency"
          :rate="currency.price"
        />
        </div>
      </div>
      <VPagination
        :template="{
            '568px': 'FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink',
            default: 'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport'
        }"
        :rows="ITEMS_PER_PAGE"
        :totalRecords="currencies.length"
        @page="updateCurrencies"
        class="currency-pagination"
      >
      </VPagination>
    </VContainer>
  </div>
</template>

<script setup>

import { onBeforeMount, ref } from 'vue';
// import { useCurrenciesStore } from '@/store/index';
import CurrencyItem from '@/components/CurrencyItem.vue';
// import { getCurrencyAllUsdtPairs, getFearAndGreedIndex } from '@/api/currency';

// const store = useCurrenciesStore();
// const currencies = computed(() => store.currencies);

const currencies = [
  {
    id: 'BTCUSDT', currency: 'BTC', baseCurrency: 'USDT', price: '68861.61000000',
  },
  {
    id: 'ETHUSDT', currency: 'ETH', baseCurrency: 'USDT', price: '3501.36000000',
  },
  {
    id: 'BNBUSDT', currency: 'BNB', baseCurrency: 'USDT', price: '579.10000000',
  },
  {
    id: 'BCCUSDT', currency: 'BCC', baseCurrency: 'USDT', price: '448.70000000',
  },
  {
    id: 'NEOUSDT', currency: 'NEO', baseCurrency: 'USDT', price: '19.44000000',
  },
  {
    id: 'LTCUSDT', currency: 'LTC', baseCurrency: 'USDT', price: '98.12000000',
  },
  {
    id: 'QTUMUSDT', currency: 'QTUM', baseCurrency: 'USDT', price: '4.62500000',
  },
  {
    id: 'BTCUSDT1', currency: 'BTC', baseCurrency: 'USDT', price: '68861.61000000',
  },
  {
    id: 'ETHUSDT1', currency: 'ETH', baseCurrency: 'USDT', price: '3501.36000000',
  },
  {
    id: 'BNBUSDT1', currency: 'BNB', baseCurrency: 'USDT', price: '579.10000000',
  },
  {
    id: 'BCCUSDT1', currency: 'BCC', baseCurrency: 'USDT', price: '448.70000000',
  },
  {
    id: 'NEOUSDT1', currency: 'NEO', baseCurrency: 'USDT', price: '19.44000000',
  },
  {
    id: 'LTCUSDT1', currency: 'LTC', baseCurrency: 'USDT', price: '98.12000000',
  },
  {
    id: 'QTUMUSDT1', currency: 'QTUM', baseCurrency: 'USDT', price: '4.62500000',
  },
  {
    id: 'BTCUSDT2', currency: 'BTC', baseCurrency: 'USDT', price: '68861.61000000',
  },
  {
    id: 'ETHUSDT2', currency: 'ETH', baseCurrency: 'USDT', price: '3501.36000000',
  },
  {
    id: 'BNBUSDT2', currency: 'BNB', baseCurrency: 'USDT', price: '579.10000000',
  },
  {
    id: 'BCCUSDT2', currency: 'BCC', baseCurrency: 'USDT', price: '448.70000000',
  },
  {
    id: 'NEOUSDT2', currency: 'NEO', baseCurrency: 'USDT', price: '19.44000000',
  },
  {
    id: 'LTCUSDT2', currency: 'LTC', baseCurrency: 'USDT', price: '98.12000000',
  },
  {
    id: 'QTUMUSDT2', currency: 'QTUM', baseCurrency: 'USDT', price: '4.62500000',
  },
];
const ITEMS_PER_PAGE = 10;
const currenciesToShow = ref(currencies.slice(0, ITEMS_PER_PAGE));
const updateCurrencies = ({ page }) => {
  // eslint-disable-next-line max-len
  currenciesToShow.value = currencies.slice(page * ITEMS_PER_PAGE, (page + 1) * ITEMS_PER_PAGE);
};
onBeforeMount(async () => {
  console.log(1);
  // const curr = await getCurrencyAllUsdtPairs();
  // store.setCurrencies(curr);
});

// getFearAndGreedIndex();

</script>

<style>
.home {
  display: flex;
  height: calc(100vh - 82px);
  flex-direction: column;
  padding: 15px;
}
.currency-list {
  display: flex;
  flex-direction: column;
  gap: 0.5em;
}
.currency-container {
  flex-grow: 1;
  display: grid;
  grid-template-rows: 1fr auto;
  padding: 10px;
  max-height: 100%;
}

.currency-wrapper {
  overflow: auto;
}

.currency-pagination {
  padding: 0;
}

.currency-pagination .p-paginator {
  padding: 0;
}
</style>
