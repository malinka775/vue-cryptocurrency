<template>
  <div class="home">
    <VContainer class="currency-container">
      <div class="input-wrapper">
        <IconField iconPosition="left" class="input-field">
          <InputIcon class="pi pi-search inpit-icon"  @click="searchPairs"/>
          <InputText
            v-model="inputValue"
            class="input-text"
            placeholder="Enter base currency, e.g. USDT"
            @keypress.enter="searchPairs"/>
        </IconField>
      </div>
      <div class="currency-wrapper">
        <ProgressSpinner v-if="isLoading"/>
        <div v-else-if="currenciesToShow?.length > 0" class="currency-list">
          <CurrencyItem
            v-for="currency in currenciesToShow"
            :key="currency.id"
            :base-currency-name="currency.baseCurrency"
            :currency-name="currency.currency"
            :rate="currency.price"
          />
        </div>
        <div v-else>
          We weren't able to find pairs for base currency named "{{ searchedCurrencyName }}"
        </div>
      </div>
      <VPagination
        :template="{
            '568px': 'FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink',
            default:
              'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport',
        }"
        v-if="currencies.length > 0"
        v-model:first="offset"
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

import { ref, computed, onMounted } from 'vue';
import { useCurrenciesStore } from '@/store/index';
import CurrencyItem from '@/components/CurrencyItem.vue';
import { getAllBaseCurrencyPairs, getListOfAvailableAssets } from '@/api/currency';

const ITEMS_PER_PAGE = 10;

const inputValue = ref('');
const searchedCurrencyName = ref('');
const currenciesToShow = ref([]);
const offset = ref(0);
const isLoading = ref(false);

const store = useCurrenciesStore();
const fetchInitialData = async () => {
  isLoading.value = true;
  const curr = await getAllBaseCurrencyPairs();
  isLoading.value = false;
  store.setCurrencies(curr);
  const assets = await getListOfAvailableAssets();
  store.setAvailableCurrencies(assets);
};
await fetchInitialData();
const currencies = computed(() => store.currencies);

const searchPairs = async () => {
  isLoading.value = true;
  searchedCurrencyName.value = inputValue.value;
  if (inputValue.value === '' || !store.availableCurrencies.has(searchedCurrencyName.value.toUpperCase())) {
    isLoading.value = false;
    currenciesToShow.value = [];
    store.setCurrencies([]);
    return;
  }
  const searchedCurrencies = await getAllBaseCurrencyPairs(searchedCurrencyName.value);
  isLoading.value = false;
  store.setCurrencies(searchedCurrencies);
  currenciesToShow.value = searchedCurrencies.slice(0, ITEMS_PER_PAGE);
  offset.value = 0;
};

const updateCurrencies = ({ page }) => {
  currenciesToShow.value = currencies.value.slice(page * ITEMS_PER_PAGE, (page + 1) * ITEMS_PER_PAGE);
};

onMounted(() => {
  currenciesToShow.value = currencies.value.slice(0, ITEMS_PER_PAGE);
});

</script>

<style>
.home {
  display: flex;
  height: calc(100vh - 82px);
  flex-direction: column;
  padding: 15px;
}

.input-wrapper {
  display: flex;
  height: fit-content;
  justify-content: flex-end;
  margin-bottom: 15px;
}
.inpit-icon {
  cursor: pointer;
}
.input-text {
  width: 100%;
}

.input-field {
  width: 100%;
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

@media screen and (max-width: 568px) {
  .input-text {
    font-size: 12px;
  }
}
</style>
