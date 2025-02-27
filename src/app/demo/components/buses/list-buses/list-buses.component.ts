import {Component, Input, OnInit} from '@angular/core';
import {ButtonModule} from "primeng/button";
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {FlexModule} from "@angular/flex-layout";
import {RippleModule} from "primeng/ripple";
import {MessageService, SharedModule} from "primeng/api";
import {TableModule} from "primeng/table";
import {ToastModule} from "primeng/toast";
import {ToolbarModule} from "primeng/toolbar";
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";
import {AuthService} from "../../auth/service/authService";
import {CreateBusComponent} from "../create-bus/create-bus.component";
import {BusResponse} from "../model/response/busResponse";
import {BusesService} from "../service/bus.service";
import {UpdateBusComponent} from "../update-bus/update-bus.component";

@Component({
  selector: 'app-list-buses',
  standalone: true,
    imports: [
        ButtonModule,
        DatePipe,
        FlexModule,
        NgForOf,
        RippleModule,
        SharedModule,
        TableModule,
        ToastModule,
        ToolbarModule,
        NgIf
    ],
    providers:[MessageService,DialogService],
  templateUrl: './list-buses.component.html',
  styleUrl: './list-buses.component.scss'
})
export class ListBusesComponent implements OnInit {
    cols: any[];
    ref: DynamicDialogRef | undefined;
    refUpdate: DynamicDialogRef | undefined;
    userId: number;
    buses: BusResponse[];
    @Input() readOnly = false

    constructor( public messageService: MessageService,public dialogService: DialogService,private readonly busService : BusesService , private readonly authService: AuthService) {
    }
    ngOnInit(): void {
        this.getAllBusesByUser();
        this.cols = [
            { field: 'transportCompany', header: 'User' },
            { field: 'registrationNumber', header: 'Registration' },
            { field: 'model', header: 'Model' },
            { field: 'capacity', header: 'capacity' },
            { field: 'airConditioning', header: 'Air Conditioning' },
            { field: 'wifi', header: 'Wifi' },
            { field: 'startActiveDate', header: 'Start Active Date' },
            { field: 'endActiveDate', header: 'End Active Date' },


        ];

    }


    createNewBuses():void {
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
    updateNewBuses( row  :BusResponse):void {
        this.refUpdate = this.dialogService.open(UpdateBusComponent, {
            header: 'Update Bus',
            width: '700px',
            contentStyle: { overflow: 'auto' },
            data :{
                dataBus :row,
            },
            baseZIndex: 10000,
            maximizable: true
        });

        this.refUpdate.onClose.subscribe(() => {
            this.getAllBusesByUser();
        });
    }
    private getAllBusesByUser() {
        this.userId = JSON.parse(this.authService.getToken()).id;
        this.busService.getAllBusesByUserId(this.userId).subscribe(
            (data)=>{
                this.buses = data;
            }
        )
    }

    deleteBus(product: BusResponse):void {
        this.busService.deleteBus(product.id).subscribe(
            ()=>{
                this.getAllBusesByUser();
            }
        )
    }
}
