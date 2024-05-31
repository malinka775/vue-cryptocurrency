import { createApp } from 'vue';
import { createPinia } from 'pinia';
import PrimeVue from 'primevue/config';
import Tooltip from 'primevue/tooltip';
import App from './App.vue';
import router from './router';
import components from './components/UI/ui-components';
import 'primevue/resources/primevue.min.css';
import './styles/styles.css';

const pinia = createPinia();
const app = createApp(App);

app.use(router);
app.use(PrimeVue);
app.use(pinia);
app.directive('tooltip', Tooltip);

components.forEach((cmp) => app.component(cmp.name, cmp.component));

app.mount('#app');
