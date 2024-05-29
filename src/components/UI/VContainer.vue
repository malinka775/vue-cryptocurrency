<template>
  <div class="container">
    <slot/>
  </div>
</template>

<style scoped>
.container {
  background: var(--surface-50);
    color: var(--surface-500);
    box-shadow: 1px 2px 6px -2px var(--primary-color);
}
</style>
