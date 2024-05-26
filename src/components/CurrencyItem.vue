<template>
  <div class="currency-item">
    <div class="currency-item__name"> {{ currencyName }} </div>
    <div class="currency-item__rate">
      <div class="currency-item__rate-number">{{ rate }}</div>
       {{ baseCurrencyName }}
    </div>
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
  font-weight: 500;
  background: #f5f9ff;
  border: 1px solid #d0e1fd;
  padding: 1em 1.5em;
  display: flex;
  justify-content: space-between;
}

.currency-item__rate {
  display: flex;
  gap: 8px;
}

@media screen and (max-width: 568px) {
  .currency-item {
    padding: 1em 0.5em;
  }
}
</style>
