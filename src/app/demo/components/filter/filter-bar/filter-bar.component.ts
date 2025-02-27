import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CalendarModule} from "primeng/calendar";
import {DropdownModule} from "primeng/dropdown";
import {FlexModule} from "@angular/flex-layout";
import {LayoutService} from "../../../../layout/service/app.layout.service";
import {Router} from "@angular/router";
import {BasicResponse} from "../../../../common/models/BasicResponse";
import { cities } from 'list-of-moroccan-cities';
import {FormsModule} from "@angular/forms";
import {BffFilter} from "../model/BffFilter";
import * as dayjs from "dayjs";
import {SearchRequest} from "../../../../common/models/SearchRequest";
import {SubSubscriptionOfferService} from "../../subscriptions/service/sub-subscription-offer.service";

@Component({
  selector: 'app-filter-bar',
  standalone: true,
    imports: [
        CalendarModule,
        DropdownModule,
        FlexModule,
        FormsModule
    ],
  templateUrl: './filter-bar.component.html',
  styleUrl: './filter-bar.component.scss'
})
export class FilterBarComponent  implements OnInit {
    @Output() filter:EventEmitter<BffFilter> = new EventEmitter();
    @Output() onFilter:EventEmitter<SearchRequest> = new EventEmitter();
    cities: BasicResponse[];
    citiesTo: BasicResponse[];
    cityFrom: BasicResponse;
    cityTo: BasicResponse;
    loading = false;
    rangeDates: Date[] = [new Date(), new Date()];
    minDate = new Date();
    request: SearchRequest;
    @Input('bffFilter')set  bffFilterInput(data: BffFilter) {
        this.bffFilter = data;
        this.cityTo = data.cityTo;
        this.cityFrom = data.cityFrom;
        this.rangeDates = [data.startDate, data.endDate]
    }
    bffFilter!: BffFilter;
    constructor(
        public layoutService: LayoutService,
        public router: Router,
        private readonly subSubscriptionOffer :SubSubscriptionOfferService,
    ) {}

    ngOnInit(): void {
        this.cities = cities;
        this.citiesTo = cities;
    }

    search(): void {
        if (this.cityTo && this.cityFrom && this.rangeDates.length > 0) {
            if(!this.bffFilter){
                this.filter.emit({cityTo : this.cityTo,cityFrom : this.cityFrom,startDate : this.rangeDates[0], endDate : this.rangeDates[1]});
            }else {
                this.request = {
                    departureCity :this.cityFrom.name,
                    arrivalCity :  this.cityTo.name ,
                    startDate: dayjs(this.rangeDates[0]).format('YYYY-MM-DD'),
                    endDate  :  dayjs(this.rangeDates[1]).format('YYYY-MM-DD'),
                }
                this.onFilter.emit(this.request)
            }
        }
    }

    onChangeCityFrom(): void {
        if (this.cityFrom != null) {
            this.citiesTo = cities.filter((el) => el.id != this.cityFrom.id);
        } else {
            this.citiesTo = cities;
        }
    }

    onChangeCityTo(): void {
        if (this.cityTo != null) {
            this.cities = cities.filter((el) => el.id != this.cityTo.id);
        } else {
            this.cities = cities;
        }
    }

}
