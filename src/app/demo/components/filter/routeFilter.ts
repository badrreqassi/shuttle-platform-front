import { FilterShuttlesComponent } from './filter-shuttles/filter-shuttles.component';
import { ListOffersComponent } from './list-offers/list-offers.component';

export default [
    {
        path: '',
        component: FilterShuttlesComponent,
    },
    {
        path: 'offers',
        component: ListOffersComponent,
    },
];
