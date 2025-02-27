import {Component, OnInit} from '@angular/core';
import {FlexModule} from "@angular/flex-layout";
import {ChipsModule} from "primeng/chips";
import {FormsModule} from "@angular/forms";
import {InputNumberModule} from "primeng/inputnumber";
import {FieldsetModule} from "primeng/fieldset";
import {CheckboxModule} from "primeng/checkbox";
import {ButtonModule} from "primeng/button";
import {AuthService} from "../../auth/service/authService";
import {BusesService} from "../service/bus.service";
import {BusRequest} from "../model/request/BusRequest";
import {MessageService} from "primeng/api";
import {ToastModule} from "primeng/toast";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";

@Component({
  selector: 'app-create-bus',
  standalone: true,
    imports: [
        FlexModule,
        ChipsModule,
        FormsModule,
        InputNumberModule,
        FieldsetModule,
        CheckboxModule,
        ButtonModule,
        ToastModule
    ],
    providers: [MessageService],
  templateUrl: './update-bus.component.html',
  styleUrl: './update-bus.component.scss'
})
export class UpdateBusComponent implements OnInit {
    registrationNumber: string;
    model: string;
    capacity: number;
    airConditioning=false;
    wifi = false;
  constructor(  private readonly dialogRef: DynamicDialogRef,
    public  config: DynamicDialogConfig,
                  public messageService: MessageService, private readonly busService :BusesService ,private readonly authService: AuthService) {
  }
    ngOnInit(): void {
     const data =  this.config.data.dataBus;
        this.registrationNumber =data.registrationNumber;
        this.model = data.model
        this.capacity = data.capacity;
        this.airConditioning = data.airConditioning;
        this.wifi = data.wifi;
    }

    updateBus():void {
       const userId = JSON.parse( this.authService.getToken()).id
        if(this.registrationNumber && this.model && this.capacity){
            const request = {
                transportCompany : userId,
                registrationNumber : this.registrationNumber,
                model: this.model,
                capacity : this.capacity,
                airConditioning : this.airConditioning,
                wifi : this.wifi,
            } as BusRequest
            this.busService.updateBus(userId,request).subscribe(
                (data)=>{
                    if(data){
                        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'create Success' });
                    this.clearForm();
                    }else {
                        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'somthing went wrong' });

                    }
                }
            )

        }else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'somthing went wrong' });
        }


    }

    private clearForm():void {
        this.dialogRef.close();
  }


}
