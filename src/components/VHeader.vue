<!-- eslint-disable dot-notation -->
<!-- eslint-disable quotes -->
<!-- eslint-disable max-len -->
<template>
  <div class="header">
    <nav>
      <router-link to="/">
        <VButton
          label="Home"
          :severity="getSeverity('home')"
          class="p-button-sm"
        />
      </router-link>
      <router-link to="/greed-and-fear">
        <VButton
          label="Greed and fear idx"
          :severity="getSeverity('greed-and-fear')"
          class="p-button-sm"
        />
      </router-link>
    </nav>

    <VButton
      v-tooltip.bottom="'Toggle between dark and light modes'"
      class="p-button-sm theme-toggle"
      outlined
      severity="contrast"
      :label="isDarkTheme ? 'Go light' : 'Go dark'"
      @click="handleThemeToggle"
    />
  </div>
</template>

<script setup>
import { usePrimeVue } from 'primevue/config';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useCurrenciesStore } from '@/store/index';
import { getFearAndGreedIndex } from '@/api/currency';

const router = useRouter();
const coef = await getFearAndGreedIndex();
const store = useCurrenciesStore();
store.setGnfCoefficient(coef.data[0].value);

const THEMES = {
  DARK: 'lara-dark-pink',
  LIGHT: 'lara-light-pink',
};

const isDarkTheme = ref(true);

const getSeverity = (routeName) => (router.currentRoute.value.name === routeName ? 'primary' : 'secondary');

const PrimeVue = usePrimeVue();

const handleThemeToggle = () => {
  isDarkTheme.value = !isDarkTheme.value;
  const newTheme = isDarkTheme.value ? THEMES.DARK : THEMES.LIGHT;
  const prevTheme = isDarkTheme.value ? THEMES.LIGHT : THEMES.DARK;

  PrimeVue.changeTheme(prevTheme, newTheme, 'theme-link', () => {});
};
</script>

<style scoped>
.header {
  padding: 15px;
  display: flex;
  align-items: center;
}
.theme-toggle {
  margin-left: auto;
}

nav {
  display: flex;
  gap: 15px;
}

@media screen and (max-width: 568px) {
  .gnf {
    display: none;
  }
}
</style>
