<!-- eslint-disable dot-notation -->
<!-- eslint-disable quotes -->
<!-- eslint-disable max-len -->
<template>
  <div class="header">
    <nav>
      <router-link to="/">
        <VButton
          label="Home"
          severity="secondary"
          class="p-button-sm"
        />
      </router-link>
      <router-link to="/greed-and-fear">
        <VButton
          label="Greed and fear index"
          severity="secondary"
          class="p-button-sm"
        />
      </router-link>
    </nav>

    <router-link to="/greed-and-fear" class="gnf" v-if="isShowGnfIndex" >
      <span v-tooltip.bottom="'Greed and fear index'">GNF</span>
      <span> index today: {{ gnf }}</span>
    </router-link>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useCurrenciesStore } from '@/store/index';
import { getFearAndGreedIndex } from '@/api/currency';

const router = useRouter();
const isShowGnfIndex = computed(() => router.currentRoute.value.href !== '/greed-and-fear');
const coef = await getFearAndGreedIndex();
const store = useCurrenciesStore();
store.setGnfCoefficient(coef.data[0].value);
const gnf = store.gnfCoefficient;
</script>

<style scoped>
.header {
  padding: 15px;
  display: flex;
  align-items: center;
}
.gnf {
  margin-left: auto;
  text-decoration: none;
}
.gnf:visited {
  color: inherit;
}
nav {
  display: flex;
  gap: 15px;
}

nav a .p-button:focus {
  box-shadow: none;
}

nav a.router-link-exact-active .p-button {
  background-color: #334155;
  border-color: #334155;
}

@media screen and (max-width: 568px) {
  .gnf {
    display: none;
  }
}
</style>
