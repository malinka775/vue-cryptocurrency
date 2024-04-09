<template>
  <div class="home">
    <HelloWorld />
    <VButton label="Submit"/>
    <CurrencyItem
      v-for="currency in currencies"
      :key="currency.id"
      :base-currency-name="currency.baseCurrency"
      :currency-name="currency.currency"
      :rate="currency.price"
    />
  </div>
</template>

<script setup>

import { onBeforeMount, computed } from 'vue';
import { useCurrenciesStore } from '@/store/index';
import CurrencyItem from '@/components/CurrencyItem.vue';
import HelloWorld from '@/components/HelloWorld.vue';
import { getCurrencyAllUsdtPairs, getFearAndGreedIndex } from '@/api/currency';

const store = useCurrenciesStore();
const currencies = computed(() => store.currencies);

onBeforeMount(async () => {
  const curr = await getCurrencyAllUsdtPairs();
  store.setCurrencies(curr);
});

getFearAndGreedIndex();

</script>
