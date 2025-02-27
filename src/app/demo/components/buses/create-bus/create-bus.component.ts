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
  templateUrl: './create-bus.component.html',
  styleUrl: './create-bus.component.scss'
})
export class CreateBusComponent {
    registrationNumber: string;
    model: string;
    capacity: number;
    airConditioning=false;
    wifi = false;
  constructor( public messageService: MessageService, private readonly busService :BusesService ,private readonly authService: AuthService) {
  }

    createBus():void {
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
            this.busService.createBus(request).subscribe(
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
        this.registrationNumber =''
        this.model =''
        this.capacity = undefined
        this.airConditioning = false;
        this.wifi = false;
    }
}
