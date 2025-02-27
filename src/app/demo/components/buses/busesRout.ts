import {ListBusesComponent} from "./list-buses/list-buses.component";
import {CreateBusComponent} from "./create-bus/create-bus.component";

export default [
    {
        path: 'list',
        component: ListBusesComponent,
    },
    {
        path: 'create',
        component: CreateBusComponent,
    },
];
