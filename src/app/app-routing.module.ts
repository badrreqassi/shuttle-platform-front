import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { AppLayoutComponent } from './layout/app.layout.component';
import { environment } from '../environments/environment';
import {AuthGuard} from "./common/Guard/AuthGuard";
import {UserTypeEnum} from "./common/enum/typeUser";

@NgModule({
    imports: [
        RouterModule.forRoot(
            [
                {
                    path: '',
                    redirectTo: environment.homeRedirectUri,
                    pathMatch: 'full',
                },
                {
                    path: '',
                    component: AppLayoutComponent,
                    data: { role: UserTypeEnum.NORMAL }, // Only company users can access this route
                    children: [
                        {
                            path: 'dash',
                            loadChildren: () =>
                                import(
                                    './demo/components/dashboard/dashboard.module'
                                ).then((m) => m.DashboardModule),
                        },
                        {
                            path: 'subscription',
                            loadChildren: () =>import('./demo/components/subscriptions/routeSubscription')
                        },{
                            path: 'request',
                            loadChildren: () =>import('./demo/components/subscriptionsUser/routeSubscriptionUser')
                        },
                        {
                            path: 'bus',
                            loadChildren: () =>import('./demo/components/buses/busesRout')
                        }
                    ],
                },
                {
                    path: 'filter',
                    loadChildren: () =>
                        import('./demo/components/filter/routeFilter'),
                },
                {
                    path: 'auth',
                    loadChildren: () =>
                        import('./demo/components/auth/auth.module').then(
                            (m) => m.AuthModule,
                        ),
                },
                { path: 'notfound', component: NotfoundComponent },
                { path: '**', redirectTo: '/notfound' },
            ],
            {
                scrollPositionRestoration: 'enabled',
                anchorScrolling: 'enabled',
                onSameUrlNavigation: 'reload',
                useHash: false,
            },
        ),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {}
