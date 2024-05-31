import Button from 'primevue/button';
import Paginator from 'primevue/paginator';
import Skeleton from 'primevue/skeleton';
import Dropdown from 'primevue/dropdown';
import VSpinner from './VSpinner.vue';
import VContainer from './VContainer.vue';

const components = [
  { component: Button, name: 'VButton' },
  { component: Paginator, name: 'VPagination' },
  { component: Skeleton, name: 'VSkeleton' },
  { component: Dropdown, name: 'VDropdown' },
  { component: VSpinner, name: 'VSpinner' },
  { component: VContainer, name: 'VContainer' },
];

export default components;
