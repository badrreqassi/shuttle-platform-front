import {Component, Input} from '@angular/core';
import {SubscriptionResponse} from "../../subscriptions/response/SubscriptionResponse";
import {FlexModule} from "@angular/flex-layout";
import {CardModule} from "primeng/card";
import {DateDifferencePipe} from "../pipes/diffDate";
import {DatePipe, NgForOf, NgIf, NgStyle} from "@angular/common";
import {FormatTimePipe} from "../pipes/formatDateTime";
import {TooltipModule} from "primeng/tooltip";
import {ButtonModule} from "primeng/button";
import {AuthService} from "../../auth/service/authService";
import {SubSubscriptionOfferService} from "../../subscriptions/service/sub-subscription-offer.service";
import {log} from "@angular-devkit/build-angular/src/builders/ssr-dev-server";
import {MessageService} from "primeng/api";
import {Router} from "@angular/router";

@Component({
  selector: 'app-item-offer',
  standalone: true,
    imports: [
        FlexModule,
        CardModule,
        DateDifferencePipe,
        FormatTimePipe,
        NgForOf,
        NgIf,
        TooltipModule,
        NgStyle,
        ButtonModule
    ],
    providers: [MessageService],
  templateUrl: './item-offer.component.html',
  styleUrl: './item-offer.component.scss'
})
export class ItemOfferComponent {
    @Input() item!: SubscriptionResponse;
    isLoginUser = false
    constructor(private readonly router: Router,public messageService: MessageService,private readonly subSubscriptionOfferService : SubSubscriptionOfferService,private readonly authService :  AuthService) {
        this.isLoginUser  = this.authService.isLoggedInAsUser();
     }
    SubSubscriptionToOffer(id:number):void {
        const userID = JSON.parse(this.authService.getToken()).id ;
        this.subSubscriptionOfferService.subscriptionToOffer(userID,id).subscribe({
            next: ()=> {
                this.router.navigate(['/subscription/list']);
            },
            error: ()=> {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'User is already subscribed to this offer' });
            },
            }
         )
    }
}
