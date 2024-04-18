<template>
  <Suspense>
    <VHeader/>
  </Suspense>
    <Suspense>
    <router-view/>
  </Suspense>
</template>

<script setup>
import VHeader from './components/VHeader.vue';
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #f5f9ff;
  min-height: 100vh;
}

.page {
  display: flex;
  height: 100vh;
  flex-direction: column;
}

</style>
