<template>
  <div class="home">
    <HelloWorld />
    <img src="https://alternative.me/crypto/fear-and-greed-index.png" alt="Latest Crypto Fear & Greed Index" />
  </div>
</template>

<script setup>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';
import { getCurrencyAllUsdtPairs, getFearAndGreedIndex } from '@/api/currency';

getCurrencyAllUsdtPairs();
getFearAndGreedIndex();

</script>
