<template>
  <div class="currency-item">
    <span class="currency-item__name"> {{ currencyName }} </span>
    <span class="currency-item__rate">
      <span class="currency-item__rate-number">{{ rate }}</span>
       {{ baseCurrencyName }}
    </span>
  </div>
</template>

<script setup>
defineProps({
  currencyName: {
    type: String,
    default: '',
  },
  rate: {
    type: String,
    default: '',
  },
  baseCurrencyName: {
    type: String,
    default: '',
  },
});
</script>

<style scoped>
.currency-item {
  width: 100%;
}
</style>
