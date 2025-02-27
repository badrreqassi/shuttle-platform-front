import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {SearchRequest} from "../../../../common/models/SearchRequest";
import {Location, CommonModule} from "@angular/common";
import {SubSubscriptionOfferService} from "../../subscriptions/service/sub-subscription-offer.service";
import * as dayjs from "dayjs";
import {FlexModule} from "@angular/flex-layout";
import {AppTopBarComponent} from "../../../../layout/app.topbar.component";
import {FilterBarComponent} from "../filter-bar/filter-bar.component";
import {BffFilter} from "../model/BffFilter";
import {CardModule} from "primeng/card";
import {CheckboxModule} from "primeng/checkbox";
import {FormsModule} from "@angular/forms";
import {SubscriptionResponse} from "../../subscriptions/response/SubscriptionResponse";
import {ItemOfferComponent} from "../item-offer/item-offer.component";

@Component({
    selector: 'app-list-offers',
    standalone: true,
    imports: [CommonModule, FlexModule, AppTopBarComponent, FilterBarComponent, CardModule, CheckboxModule, FormsModule, ItemOfferComponent],
    templateUrl: './list-offers.component.html',
    styleUrl: './list-offers.component.scss',
})
export class ListOffersComponent implements OnInit {
    request: SearchRequest;
    bffFilter: BffFilter;
    airConditioning =false;
    wifi = false;
     listOffers: SubscriptionResponse[] = [];
     filterList: SubscriptionResponse[] = [];
    constructor(private readonly location: Location, private readonly router: Router,
                private readonly subSubscriptionOffer :SubSubscriptionOfferService,
    ) {
        if(this.location.getState()){
            const state = this.location.getState() as BffFilter;
              this.request = {
                departureCity :state.cityFrom.name,
                 arrivalCity :  state.cityTo.name ,
                 startDate: dayjs(state.startDate).format('YYYY-MM-DD'),
                 endDate  :  dayjs(state.endDate).format('YYYY-MM-DD'),
            }
            this.bffFilter = state;
         }
    }
    ngOnInit(): void {
        this.subSubscriptionOfferList();
    }

    private subSubscriptionOfferList():void {
        this.subSubscriptionOffer.getAllSubSubscriptionOffer(this.request).subscribe(
            (data) => {
                 this.listOffers = data;
                 this.filterList = data;
            }
        )
    }

    handleFilter($event: SearchRequest):void {
        this.request = $event
        this.subSubscriptionOfferList()
    }
    filterBy(wifi :boolean , air :boolean ){
        if(wifi === false && air=== false){
            console.log("sdsd",  this.listOffers)
            this.filterList = [...this.listOffers];
        }
        this.filterList = this.listOffers.filter(offer => {
            // Check if any bus in the offer has the required amenities
            return offer.buses.some(bus => bus.wifi === wifi || bus.airConditioning === air);
        });
        console.log(this.listOffers.filter(offer => {
            // Check if any bus in the offer has the required amenities
            return offer.buses.some(bus => bus.wifi === wifi || bus.airConditioning === air);
        }))
    }
}
