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
      <router-link to="/about">
        <VButton
          label="About"
          severity="secondary"
          class="p-button-sm"
        />
      </router-link>
    </nav>
  </div>
</template>

<style scoped>
nav {
  padding: 15px;
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
</style>
