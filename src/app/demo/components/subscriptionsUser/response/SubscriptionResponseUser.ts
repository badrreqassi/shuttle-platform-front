import {TransportCompany, User} from "../../TransportCompany/model/response/TransportCompany";
import {BusResponse} from "../../buses/model/response/busResponse";

export interface SubscriptionResponseUser {
    id : number
    user: User;
    startDate : Date
    endDate : Date
    departureTime : Date
    arrivalTime : Date
    departureCity : string
    arrivalCity : string
    currentSubscribers : User[]

}
