import { createApp } from 'vue';
import { createPinia } from 'pinia';
import PrimeVue from 'primevue/config';
import App from './App.vue';
import router from './router';
import 'primevue/resources/primevue.min.css';
import 'primevue/resources/themes/lara-light-blue/theme.css';
import components from './components/UI/ui-components';
import './styles/styles.css';

const pinia = createPinia();
const app = createApp(App);
app.use(router);
app.use(PrimeVue);
app.use(pinia);
components.forEach((cmp) => app.component(cmp.name, cmp.component));
app.mount('#app');
