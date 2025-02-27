import {Component, Input, OnInit} from '@angular/core';
import {SubSubscriptionOfferService} from "../service/sub-subscription-offer.service";
import {AuthService} from "../../auth/service/authService";
import {SubscriptionResponse} from "../response/SubscriptionResponse";
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
import {CreateSubscriptionComponent} from "../create-subscription/create-subscription.component";

@Component({
  selector: 'app-subscription-list',
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
  templateUrl: './subscription-list.component.html',
  styleUrl: './subscription-list.component.scss'
})
export class SubscriptionListComponent implements OnInit {
     data!: SubscriptionResponse[];
     cols: any[];
     ref: DynamicDialogRef | undefined;
     roleCreate = false;
     userId: number;
    @Input() readOnly = false

    constructor( public messageService: MessageService,public dialogService: DialogService,private subSubscriptionOfferService : SubSubscriptionOfferService , private authService: AuthService) {
    }
    ngOnInit(): void {
        this.getAllByUserId();
         this.cols = [
            { field: 'transportCompany', header: 'User' },
            { field: 'buses', header: 'Buses' },
            { field: 'startDate', header: 'Start Date' },
            { field: 'endDate', header: 'End Date' },
            { field: 'departureTime', header: 'Departure Time' },
            { field: 'arrivalTime', header: 'Arrival Time' },
            { field: 'departureCity', header: 'Departure City' },
            { field: 'arrivalCity', header: 'arrival City' },


        ];

    }

    private getAllByUserId():void {
        this.userId = JSON.parse(this.authService.getToken()).id;
        if (this.authService.isLoggedInAsCompany()) {
            this.roleCreate = true;
            this.subSubscriptionOfferService.getAllSubSubscriptionOfferByCompany(this.userId).subscribe(
                (data) => {
                    this.data = data;
                }
            )
        } else {
            this.roleCreate = false;
            this.subSubscriptionOfferService.getAllSubSubscriptionOfferByUser(this.userId).subscribe(
                  (data)=> {
                      this.data = data;
                  }
              )

        }
    }

    createNewOffer() {
        this.ref = this.dialogService.open(CreateSubscriptionComponent, {
            header: 'New Subscription',
            width: '700px',
            contentStyle: { overflow: 'auto' },
            baseZIndex: 10000,
            maximizable: true
        });

        this.ref.onClose.subscribe(( ) => {
                this.getAllByUserId();
        });
    }

    cancelOffer(product: SubscriptionResponse):void {
        this.subSubscriptionOfferService.cancelSubscriptionToOffer(this.userId, product.id).subscribe(
            (data)=> {
              this.getAllByUserId();
            }
        )
    }
}
