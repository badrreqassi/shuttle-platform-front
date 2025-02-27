import {TransportCompany} from "../../../TransportCompany/model/response/TransportCompany";

export interface BusResponse {
    id:number;
    transportCompany : TransportCompany ;
    registrationNumber : string
    model : string
    capacity :number
    airConditioning  :boolean;
    wifi  :boolean;
    startActiveDate  :Date;
    endActiveDate  :Date;
    subscriptionOffers: [],
}
