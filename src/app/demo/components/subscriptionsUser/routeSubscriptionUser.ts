import {SubscriptionUserListComponent} from "./subscription-user-list/subscription-user-list.component";
import {CreateSubscriptionUserComponent} from "./create-subscription-user/create-subscription-user.component";

export default [
    {
        path: 'list',
        component: SubscriptionUserListComponent,
    },
    {
        path: 'create',
        component: CreateSubscriptionUserComponent,
    },
];
