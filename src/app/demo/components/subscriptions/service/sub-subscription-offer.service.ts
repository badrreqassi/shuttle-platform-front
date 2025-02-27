import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {SearchRequest} from "../../../../common/models/SearchRequest";
import {SubscriptionResponse} from "../response/SubscriptionResponse";
import {environment} from "../../../../../environments/environment";
import {SubscriptionRequest} from "../request/SubscriptionRequest";


@Injectable({
  providedIn: 'root'
})
export class SubSubscriptionOfferService {

  constructor( private readonly http: HttpClient ) {
  }

  getAllSubSubscriptionOffer(searchRequest: SearchRequest):Observable<SubscriptionResponse[]> {
      return this.http.post<SubscriptionResponse[]>(`${environment.mainApiUrl}/subscriptionOffer/search`,searchRequest);
  }
  getAllSubSubscriptionOfferByCompany(id: number):Observable<SubscriptionResponse[]> {
      return this.http.get<SubscriptionResponse[]>(`${environment.mainApiUrl}/subscriptionOffer/transportCompany/${id}`);
  }
  getAllSubSubscriptionOfferByUser(id: number):Observable<SubscriptionResponse[]> {
      return this.http.get<SubscriptionResponse[]>(`${environment.mainApiUrl}/subscriptionOffer/user/${id}`);
  }
  createNewOffer(request: SubscriptionRequest):Observable<SubscriptionResponse> {
      return this.http.post<SubscriptionResponse>(`${environment.mainApiUrl}/subscriptionOffer/create`,request);
  }
  subscriptionToOffer(userId : number, offerId : number) : Observable<SubscriptionResponse> {
      return this.http.put<SubscriptionResponse>(`${environment.mainApiUrl}/subscriptionOffer/booking/${offerId}/${userId}`,{});
  }
  cancelSubscriptionToOffer(userId : number, offerId : number) : Observable<void> {
      return this.http.put<void>(`${environment.mainApiUrl}/subscriptionOffer/cancel/${offerId}/${userId}`,{});
  }
}
