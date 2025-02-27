import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard.component';
import { ChartModule } from 'primeng/chart';
import { MenuModule } from 'primeng/menu';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { StyleClassModule } from 'primeng/styleclass';
import { PanelMenuModule } from 'primeng/panelmenu';
import { DashboardsRoutingModule } from './dashboard-routing.module';
import {FlexModule} from "@angular/flex-layout";
import {SubscriptionUserListComponent} from "../subscriptionsUser/subscription-user-list/subscription-user-list.component";
import {SubscriptionListComponent} from "../subscriptions/subscription-list/subscription-list.component";
import {ListBusesComponent} from "../buses/list-buses/list-buses.component";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ChartModule,
        MenuModule,
        TableModule,
        StyleClassModule,
        PanelMenuModule,
        ButtonModule,
        DashboardsRoutingModule,
        FlexModule,
        SubscriptionUserListComponent,
        SubscriptionListComponent,
        ListBusesComponent,
    ],
    declarations: [DashboardComponent],
})
export class DashboardModule {}
