import Button from 'primevue/button';
import Card from 'primevue/card';
import Paginator from 'primevue/paginator';
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
import InputText from 'primevue/inputtext';
import Skeleton from 'primevue/skeleton';
import Dropdown from 'primevue/dropdown';
import VSpinner from './VSpinner.vue';
import VContainer from './VContainer.vue';

const components = [
  { component: Button, name: 'VButton' },
  { component: Card, name: 'VCard' },
  { component: Paginator, name: 'VPagination' },
  { component: IconField, name: 'IconField' },
  { component: InputIcon, name: 'InputIcon' },
  { component: InputText, name: 'InputText' },
  { component: Skeleton, name: 'VSkeleton' },
  { component: Dropdown, name: 'VDropdown' },
  { component: VSpinner, name: 'VSpinner' },
  { component: VContainer, name: 'VContainer' },
];

export default components;
