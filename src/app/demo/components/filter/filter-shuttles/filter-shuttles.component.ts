import {Component} from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { AvatarFilterComponent } from '../avatar-filter/avatar-filter.component';
import { AppConfigModule } from '../../../../layout/config/config.module';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { StyleClassModule } from 'primeng/styleclass';
 import { RippleModule } from 'primeng/ripple';
import { AppTopBarComponent } from '../../../../layout/app.topbar.component';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import {FilterBarComponent} from "../filter-bar/filter-bar.component";
import {LayoutService} from "../../../../layout/service/app.layout.service";
import {Router} from "@angular/router";
import {BffFilter} from "../model/BffFilter";


@Component({
    selector: 'app-filter-shuttles',
    standalone: true,
    imports: [
        FlexModule,
        AvatarFilterComponent,
        AppConfigModule,
        ButtonModule,
        DividerModule,
        StyleClassModule,
        RippleModule,
        AppTopBarComponent,
        DropdownModule,
        FormsModule,
        CalendarModule,
        FilterBarComponent,
    ],
    templateUrl: './filter-shuttles.component.html',
    styleUrl: './filter-shuttles.component.scss',
})
export class FilterShuttlesComponent {
      constructor(
        public layoutService: LayoutService,
        public router: Router,
    ) {}



    onSearch(data : BffFilter):void {
        void this.router.navigate(['/filter/offers'], {
            state: {
                cityFrom: data.cityFrom,
                cityTo: data.cityTo,
                startDate: data.startDate,
                endDate: data.endDate,
            },
        });
    }
}
