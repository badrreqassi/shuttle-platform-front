import {Component, Input, OnInit} from '@angular/core';
import {SubSubscriptionOfferUserService} from "../service/sub-subscription-offer-user.service";
import {AuthService} from "../../auth/service/authService";
 import {ButtonModule} from "primeng/button";
import { DatePipe, NgForOf, NgIf} from "@angular/common";
import {DialogModule} from "primeng/dialog";
import {DropdownModule} from "primeng/dropdown";
import {FileUploadModule} from "primeng/fileupload";
import {InputNumberModule} from "primeng/inputnumber";
import {InputTextModule} from "primeng/inputtext";
import {InputTextareaModule} from "primeng/inputtextarea";
import {RadioButtonModule} from "primeng/radiobutton";
import {RatingModule} from "primeng/rating";
import {ReactiveFormsModule} from "@angular/forms";
import {RippleModule} from "primeng/ripple";
import {MessageService, SharedModule} from "primeng/api";
import {TableModule} from "primeng/table";
import {ToastModule} from "primeng/toast";
import {ToolbarModule} from "primeng/toolbar";
import {FormatTimePipe} from "../../filter/pipes/formatDateTime";
import {FlexModule} from "@angular/flex-layout";
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";
import {CreateSubscriptionUserComponent} from "../create-subscription-user/create-subscription-user.component";
import {SubSubscriptionOfferService} from "../../subscriptions/service/sub-subscription-offer.service";
import {SubscriptionResponseUser} from "../response/SubscriptionResponseUser";
import {CreateSubscriptionComponent} from "../../subscriptions/create-subscription/create-subscription.component";

@Component({
  selector: 'app-subscription-user-list',
  standalone: true,
    imports: [
        ButtonModule,
        DialogModule,
        DropdownModule,
        FileUploadModule,
        InputNumberModule,
        InputTextModule,
        InputTextareaModule,
        RadioButtonModule,
        RatingModule,
        ReactiveFormsModule,
        RippleModule,
        SharedModule,
        TableModule,
        ToastModule,
        ToolbarModule,
        DatePipe,
        NgForOf,
        FormatTimePipe,
        FlexModule,
        NgIf
    ],
    providers: [MessageService,DialogService],
  templateUrl: './subscription-user-list.component.html',
  styleUrl: './subscription-user-list.component.scss'
})
export class SubscriptionUserListComponent implements OnInit {
     data!: SubscriptionResponseUser[];
     cols: any[];
     ref: DynamicDialogRef | undefined;
     roleCreate = false;
     userId: number;
    @Input() readOnly  = false

    constructor( private readonly subSubscriptionOfferService : SubSubscriptionOfferService, public messageService: MessageService, public dialogService: DialogService, private subSubscriptionOfferUserService : SubSubscriptionOfferUserService , private readonly authService: AuthService) {
    }
    ngOnInit(): void {
        this.getAllByUserId();
        this.roleCreate = !!this.authService.isLoggedInAsCompany()
        this.cols = [
            { field: 'user', header: 'User' },
            { field: 'startDate', header: 'Start Date' },
            { field: 'endDate', header: 'End Date' },
            { field: 'departureTime', header: 'Departure Time' },
            { field: 'arrivalTime', header: 'Arrival Time' },
            { field: 'departureCity', header: 'Departure City' },
            { field: 'arrivalCity', header: 'arrival City' },


        ];

    }

    private getAllByUserId() {
        this.userId = JSON.parse(this.authService.getToken()).id;
        if(this.authService.isLoggedInAsUser()){
            this.subSubscriptionOfferUserService.getAllSubSubscriptionUserOfferByUser(this.userId).subscribe(
                (data)=> {
                    this.data = data;
                }
            )
        }else {

            this.subSubscriptionOfferUserService.getAllSubSubscriptionUserOffer().subscribe(
                (data)=> {
                    this.data = data;
                }
            )
        }

    }

    createOfferUser():void {
        this.ref = this.dialogService.open(CreateSubscriptionUserComponent, {
            header: 'New Subscription',
            width: '700px',
            contentStyle: { overflow: 'auto' },
            data :{
                id : this.userId
            },
            baseZIndex: 10000,
            maximizable: true
        });

        this.ref.onClose.subscribe(( ) => {
                this.getAllByUserId();
        });
    }

    cancelOffer(product: SubscriptionResponseUser):void {
        this.subSubscriptionOfferUserService.cancelSubscriptionRequestToOffer(product.id).subscribe(
            (data)=> {
                this.getAllByUserId();
            }
        )
    }

    transferIntoOffer(product: SubscriptionResponseUser):void {
        this.ref = this.dialogService.open(CreateSubscriptionComponent, {
            header: 'New Subscription',
            width: '700px',
            contentStyle: { overflow: 'auto' },
            data :{
                id : this.userId,
                requestOffer : product
            },
            baseZIndex: 10000,
            maximizable: true
        });

        this.ref.onClose.subscribe(( ) => {
            this.getAllByUserId();
        });    }

}
