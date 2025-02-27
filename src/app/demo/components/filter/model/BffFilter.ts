import {BasicResponse} from "../../../../common/models/BasicResponse";

export interface BffFilter {
    cityTo :BasicResponse,
    cityFrom:BasicResponse,
    startDate : Date,
    endDate : Date,
}
