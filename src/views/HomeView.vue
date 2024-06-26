<template>
  <div class="home">
    <VContainer v-if="isPageLoading" class="spinner-container">
      <VSpinner/>
    </VContainer>
    <VContainer v-else class="currency-container">
      <div class="dropdown-wrapper">
        <span class="dropdown-info-text"> Select base currency</span>
        <VDropdown
          filter
          v-model="currency"
          :options="filterOptions"
          optionLabel="name"
          placeholder="Select currency, e.g. USDT"
          class="currency-dropdown" />
      </div>
      <div class="currency-wrapper">
        <div class="currency-list">
          <template v-if="isLoading">
            <VSkeleton v-for='index in ITEMS_PER_PAGE' :key="index" height='56px' borderRadius="5px"/>
          </template>
          <template v-else-if="currenciesToShow?.length > 0">
            <CurrencyItem
              v-for="currency in currenciesToShow"
              :key="currency.id"
              :base-currency-name="currency.baseCurrency"
              :currency-name="currency.currency"
              :rate="currency.price"
            />
          </template>
          <template v-else>
            <p class="error">
              Some problem occured while fetching data. Please try again later :'(
            </p>
          </template>
        </div>
      </div>
      <VPagination
        :template="{
            '380px': 'PrevPageLink CurrentPageReport NextPageLink',
            '620px': 'FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink',
            default:
              'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport',
        }"
        v-if="currencies?.length > ITEMS_PER_PAGE"
        v-model:first="offset"
        :rows="ITEMS_PER_PAGE"
        :totalRecords="currencies?.length"
        @page="updateCurrencies"
        class="currency-pagination"
      >
      </VPagination>
    </VContainer>
  </div>
</template>

<script setup>

import {
  ref, computed, onMounted, watch,
} from 'vue';
import { useCurrenciesStore } from '@/store/index';
import CurrencyItem from '@/components/CurrencyItem.vue';
import { getAllBaseCurrencyPairs, getListOfAvailableBaseCurrencies } from '@/api/currency';

const store = useCurrenciesStore();

const ITEMS_PER_PAGE = 10;

const currenciesToShow = ref([]);
const offset = ref(0);
const isPageLoading = ref(false);
const isLoading = ref(false);
const currency = ref({ name: 'USDT' });

const filterOptions = computed(() => {
  const availableCurrencies = store.availableCurrencies || [];
  return Array.from(availableCurrencies).map((cur) => ({ name: cur }));
});

const fetchInitialData = async () => {
  isPageLoading.value = true;
  isLoading.value = true;
  try {
    const curr = await getAllBaseCurrencyPairs();
    store.setCurrencies(curr);
    const assets = await getListOfAvailableBaseCurrencies();
    store.setAvailableCurrencies(assets);
  } catch (e) {
    console.log('An error occured while fetching initial data:', e);
  } finally {
    isLoading.value = false;
    isPageLoading.value = false;
  }
};

const currencies = computed(() => store.currencies || []);

onMounted(async () => {
  await fetchInitialData();
  currenciesToShow.value = currencies.value?.slice(0, ITEMS_PER_PAGE);
});

const searchPairs = async (baseCurrency) => {
  isLoading.value = true;
  if (baseCurrency === '' || !store.availableCurrencies.has(baseCurrency)) {
    isLoading.value = false;
    currenciesToShow.value = [];
    store.setCurrencies([]);
    return;
  }
  try {
    const searchedCurrencies = await getAllBaseCurrencyPairs(baseCurrency);
    store.setCurrencies(searchedCurrencies);
    currenciesToShow.value = searchedCurrencies?.slice(0, ITEMS_PER_PAGE);
    offset.value = 0;
  } catch (e) {
    console.log('An error occured while fetching currency pairs:', e);
  } finally {
    isLoading.value = false;
  }
};

const updateCurrencies = ({ page }) => {
  currenciesToShow.value = currencies?.value?.slice(page * ITEMS_PER_PAGE, (page + 1) * ITEMS_PER_PAGE);
};

watch(currency, (newValue, oldValue) => {
  if (newValue.name === oldValue.name) {
    return;
  }
  searchPairs(newValue.name);
});

</script>

<style>
.home {
  display: flex;
  height: calc(100vh - 82px);
  flex-direction: column;
  padding: 15px;
}

.spinner-container {
  padding: 1em;
  display: flex;
  flex-grow: 1;
  justify-content: center;
  align-items: center;
}

.dropdown-wrapper {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  margin-bottom: 15px;
}

.dropdown-info-text {
  margin: 0.5em;
  font-size: 1rem;
}

.p-dropdown-placeholder {
  font-size: 10px;
}

.currency-dropdown {
  min-width: 270px;
  flex-grow: 1;
  max-width: 500px;
}

.currency-list {
  display: flex;
  flex-direction: column;
  gap: 0.5em;
}
.currency-container {
  flex-grow: 1;
  display: grid;
  grid-template-rows: auto 1fr auto;
  padding: 10px;
  max-height: 100%;
}

.currency-wrapper {
  overflow: scroll;
}

.currency-pagination {
  padding: 10px 0 0;
}

.currency-pagination .p-paginator {
  padding: 0;
}

.error {
  padding: 1em;
  text-align: center;
}

</style>
