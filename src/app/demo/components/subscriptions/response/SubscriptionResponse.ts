import {TransportCompany, User} from "../../TransportCompany/model/response/TransportCompany";
import {BusResponse} from "../../buses/model/response/busResponse";

export interface SubscriptionResponse {
    id : number
    buses : BusResponse[]
    transportCompany: TransportCompany;
    startDate : Date
    endDate : Date
    departureTime : Date
    arrivalTime : Date
    departureCity : string
    arrivalCity : string
    currentSubscribers : User[]
    maxSubscribers : number

}
