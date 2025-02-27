import {SubscriptionResponse} from "../../../subscriptions/response/SubscriptionResponse";
import {SubscriptionResponseUser} from "../../../subscriptionsUser/response/SubscriptionResponseUser";
import {BusResponse} from "../../../buses/model/response/busResponse";

export interface WrapperProfileBff {
    username: string;
    email: string;
    offers : SubscriptionResponse[]
    offersUser : SubscriptionResponseUser[]
    buses : BusResponse[]
}
