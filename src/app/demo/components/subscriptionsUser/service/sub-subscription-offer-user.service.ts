import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {SearchRequest} from "../../../../common/models/SearchRequest";
 import {environment} from "../../../../../environments/environment";
import {SubscriptionRequestUser} from "../request/SubscriptionRequestUser";
import {SubscriptionResponseUser} from "../response/SubscriptionResponseUser";
import {SubscriptionRequest} from "../../subscriptions/request/SubscriptionRequest";


@Injectable({
  providedIn: 'root'
})
export class SubSubscriptionOfferUserService {

  constructor( private readonly http: HttpClient ) {}


  getAllSubSubscriptionUserOfferByUser(id: number):Observable<SubscriptionResponseUser[]> {
      return this.http.get<SubscriptionResponseUser[]>(`${environment.mainApiUrl}/subscriptionRequest/all/${id}`);
  }
    getAllSubSubscriptionUserOffer():Observable<SubscriptionResponseUser[]> {
      return this.http.get<SubscriptionResponseUser[]>(`${environment.mainApiUrl}/subscriptionRequest/all`);
  }
  createNewOfferUser(request: SubscriptionRequestUser):Observable<SubscriptionResponseUser> {
      return this.http.post<SubscriptionResponseUser>(`${environment.mainApiUrl}/subscriptionRequest/create`,request);
  }
  transferSubscriptionRequestToOffer( requestOfferId : number, request : SubscriptionRequest) : Observable<SubscriptionResponseUser> {
      return this.http.post<SubscriptionResponseUser>(`${environment.mainApiUrl}/subscriptionRequest/transfer/${requestOfferId}`,request);
  }
  cancelSubscriptionRequestToOffer( requestOfferId : number) : Observable<void> {
      return this.http.delete<void>(`${environment.mainApiUrl}/subscriptionRequest/cancel/${requestOfferId}`);
  }
}
