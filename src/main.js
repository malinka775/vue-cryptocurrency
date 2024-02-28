import { createApp } from 'vue';
import PrimeVue from 'primevue/config';
import Button from 'primevue/button';
import App from './App.vue';
import router from './router';
import 'primevue/resources/primevue.min.css';
import 'primevue/resources/themes/lara-light-blue/theme.css';

const app = createApp(App);
app.use(router);
app.use(PrimeVue);
app.component('Ui-button', Button);
app.mount('#app');
