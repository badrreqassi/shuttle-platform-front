import {Component, OnInit} from '@angular/core';
import {ButtonModule} from "primeng/button";
import {CardModule} from "primeng/card";
import {DateDifferencePipe} from "../../filter/pipes/diffDate";
import {FlexModule} from "@angular/flex-layout";
import { NgIf } from "@angular/common";
import { cities } from 'list-of-moroccan-cities';
import {DropdownModule} from "primeng/dropdown";
import {BasicResponse} from "../../../../common/models/BasicResponse";
import {FormsModule} from "@angular/forms";
import {BusResponse} from "../../buses/model/response/busResponse";
import {CalendarModule} from "primeng/calendar";
import * as dayjs from 'dayjs';
import {MultiSelectModule} from "primeng/multiselect";
import {AuthService} from "../../auth/service/authService";
import {BusesService} from "../../buses/service/bus.service";
import {DialogService, DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {MessageService} from "primeng/api";
import {CreateBusComponent} from "../../buses/create-bus/create-bus.component";
import {SubscriptionRequest} from "../request/SubscriptionRequest";
import {SubSubscriptionOfferService} from "../service/sub-subscription-offer.service";
import {ToastModule} from "primeng/toast";
import {InputNumberModule} from "primeng/inputnumber";
import {SubSubscriptionOfferUserService} from "../../subscriptionsUser/service/sub-subscription-offer-user.service";

@Component({
  selector: 'app-create-subscription-user',
  standalone: true,
    imports: [
        ButtonModule,
        CardModule,
        DateDifferencePipe,
        FlexModule,
        NgIf,
        DropdownModule,
        FormsModule,
        CalendarModule,
        MultiSelectModule,
        ToastModule,
        InputNumberModule
    ],
    providers:[MessageService,DialogService,DynamicDialogRef],
  templateUrl: './create-subscription.component.html',
  styleUrl: './create-subscription.component.scss'
})
export class CreateSubscriptionComponent implements OnInit {
    cities =  cities;
    cityFrom:BasicResponse;
    buses: BusResponse[] = [];
    busesSelection: BusResponse[] = [];
    startDate: Date;
    minDate = new Date();
    departureTime: Date;
    arrivalCities =  cities;
    arrivalCity: BasicResponse;
    endDateArrival: Date;
    arrivalTime: Date;
    ref: DynamicDialogRef | undefined;
     userId: number;
     fromRequest = false;

    constructor( private readonly dialogRef: DynamicDialogRef,
        private readonly subSubscriptionOfferUserService:SubSubscriptionOfferUserService, public config: DynamicDialogConfig, private readonly subSubscriptionOfferService : SubSubscriptionOfferService,public messageService: MessageService,public dialogService: DialogService,private readonly busesService: BusesService, private readonly authService :AuthService
    ) {
    }

    onChangeCityFrom():void {

    }
    onChangeCityArrival():void {

    }


    protected readonly dayjs = dayjs;
    maxSubscribers!: number;

    ngOnInit(): void {
        if(this.config.data){
            this.fromRequest = true;
            const data = this.config.data.requestOffer;
            this.startDate = dayjs(data.startDate).toDate();
            this.endDateArrival = dayjs(data.endDate).toDate();
            this.departureTime = dayjs(data.startDate+data.departureTime).toDate()
            this.arrivalTime =  dayjs(data.endDate+data.arrivalTime).toDate();
            this.cityFrom = this.cities.find(el=> el.label === data.departureCity);
            this.arrivalCity = this.cities.find(el=> el.label === data.arrivalCity);;
            this.getAllBusesByUser();
        }

    }

    createNewBus():void {
        this.ref = this.dialogService.open(CreateBusComponent, {
            header: 'New Bus',
            width: '700px',
            contentStyle: { overflow: 'auto' },
            baseZIndex: 10000,
            maximizable: true
        });

        this.ref.onClose.subscribe(() => {
                this.getAllBusesByUser();
        });
    }
    private getAllBusesByUser() {
        this.userId = JSON.parse(this.authService.getToken()).id;
        const start = dayjs(this.startDate).format('YYYY-MM-DD');
        const end = dayjs(this.endDateArrival).format('YYYY-MM-DD');
        this.busesService.getAllBusesFree(this.userId,start,end).subscribe(
            (data) => {
                this.buses = data;
            }
        )
    }

    creatOffer():void {
        if(this.cityFrom && this.busesSelection.length>0 && this.startDate && this.endDateArrival&& this.cityFrom && this.departureTime&& this.arrivalTime &&this.arrivalCity && this.maxSubscribers){
            const request = {
                buses: this.busesSelection.map(element => { return element.id}),
                departureCity :  this.cityFrom.name,
                arrivalCity :  this.arrivalCity.name,
                departureTime:  dayjs(this.departureTime).format('HH:mm:ss'),
                arrivalTime :  dayjs(this.arrivalTime).format('HH:mm:ss'),
                startDate: dayjs(this.startDate).format('YYYY-MM-DD'),
                endDate : dayjs(this.endDateArrival).format('YYYY-MM-DD'),
                transportCompanyId : this.userId,
                maxSubscribers : this.maxSubscribers
            } as SubscriptionRequest;
            if(this.fromRequest){
                this.subSubscriptionOfferUserService.transferSubscriptionRequestToOffer(this.config.data.requestOffer.id as number, request).subscribe(
                    data=> {
                            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'create Success' });
                            this.clearDate();
                            this.dialogRef.close(true);

                    }
                )
            }else {
                this.subSubscriptionOfferService.createNewOffer(request).subscribe(
                    data=> {
                        if(data){
                            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'create Success' });
                            this.clearDate();
                        }else {
                            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'somthing went wrong' });

                        }
                    }
                )
            }

        } else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'somthing went wrong' });
        }
    }

    handleBusDate() :void {
       if(this.startDate && this.endDateArrival){
           this.getAllBusesByUser();
       }
    }

    private clearDate(): void {
        this.busesSelection = [];
        this.startDate = null;
        this.endDateArrival = null;
        this.departureTime = null;
        this.arrivalTime =null;
        this.cityFrom = null;
        this.arrivalCity = null;
        this.maxSubscribers = null;
    }
}
