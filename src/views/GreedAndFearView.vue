<template>
  <div class="gnf">
    <VContainer class="gnf-article">
      <h1 class="gnf-title">What's greed and fear index?</h1>
      <p class="gnf-text">
        Greed and fear refer to two opposing emotional states theorized as factors causing the unpredictability and volatility of the stock market, and irrational market behavior inconsistent with the efficient-market hypothesis. Greed and fear relate to an old Wall Street saying: "financial markets are driven by two powerful emotions – greed and fear."
      </p>
      <p class="gnf-text">
        Greed and fear are among the animal spirits that Keynes identified as profoundly affecting economies and markets. Warren Buffett found an investing rule in acting contrary to such prevailing moods, advising that the timing of buying or selling stocks should be "fearful when others are greedy and greedy only when others are fearful." He uses the overall Market capitalization-to-GDP ratio to indicate relative value of the stock market in general, hence this ratio has become known as the "Buffett indicator".
      </p>
      <p class="gnf-text gnf-text-end">
          <a
          class="gnf-link"
          href="https://en.wikipedia.org/wiki/Greed_and_fear"
          rel="noopener noreferrer nofollow"
          target="_black"
        >
          Read more on Wikipedia
        </a>
      </p>
    </VContainer>
    <VContainer class="gnf-article gnf-center">
      <h2 class="gnf-title">Greed and fear index today is {{ gnf }}</h2>
      <VSpinner v-if="isImgLoading"/>
      <img v-else class="gnf-img" :src="imgSrc" alt="Latest Crypto Greed & Fear Index" />
    </VContainer>

  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useCurrenciesStore } from '@/store/index';

const imgSrc = ref(null);
const isImgLoading = ref(false);

const loadImg = async () => {
  isImgLoading.value = true;
  const image = new Image();
  image.src = 'https://alternative.me/crypto/fear-and-greed-index.png';
  image.onload = () => {
    imgSrc.value = image.src;
    isImgLoading.value = false;
  };
};
loadImg();
const store = useCurrenciesStore();
const gnf = computed(() => store.gnfCoefficient);
</script>

<style scoped>
.gnf {
  padding: 15px;
  display: flex;
  flex-direction: column;
  gap: 30px;
}
.gnf-title {
  margin-top: 0;
}
.gnf-article {
  padding: 10px;
  width: 100%;
}

.gnf-text {
  text-indent: 30px;
  text-align: justify;
}

.gnf-text-end {
  text-align: end;
}

.gnf-img {
  text-align: center;
  width: 100%;
  max-width: 450px;
}

.gnf-center {
  text-align: center;
}

.gnf-link {
  color: var(--text-color-secondary);
  text-decoration: none;
}

.gnf-link:visited {
  color: var(--text-color-secondary);
}
</style>
