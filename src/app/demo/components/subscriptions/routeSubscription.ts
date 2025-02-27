import {SubscriptionListComponent} from "./subscription-list/subscription-list.component";
import {CreateSubscriptionComponent} from "./create-subscription/create-subscription.component";

export default [
    {
        path: 'list',
        component: SubscriptionListComponent,
    },
    {
        path: 'create',
        component: CreateSubscriptionComponent,
    },
];
