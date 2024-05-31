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
