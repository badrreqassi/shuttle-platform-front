import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../../../environments/environment";
import {BusResponse} from "../model/response/busResponse";
import {BusRequest} from "../model/request/BusRequest";




@Injectable({
  providedIn: 'root'
})
export class BusesService {

  constructor( private readonly http: HttpClient ) {
  }


  getAllBusesFree(id: number ,startDate :string, endDate: string):Observable<BusResponse[]> {
      return this.http.get<BusResponse[]>(`${environment.mainApiUrl}/bus/free?transportCompanyId=${id}&startDate=${startDate}&endDate=${endDate}`);
  }
  createBus(request :BusRequest):Observable<BusResponse> {
      return this.http.post<BusResponse>(`${environment.mainApiUrl}/bus/create`,request);
  }

  updateBus(id: number, request :BusRequest):Observable<BusResponse> {
      return this.http.put<BusResponse>(`${environment.mainApiUrl}/bus/update/${id}`,request);
  }
  getAllBusesByUserId(id : number) : Observable<BusResponse[]> {
      return this.http.get<BusResponse[]>(`${environment.mainApiUrl}/bus/all/${id}`)
  }
   deleteBus(id: number) : Observable<void> {
      return this.http.delete<void>(`${environment.mainApiUrl}/bus/delete/${id}`);
   }
}
