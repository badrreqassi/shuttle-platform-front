export interface SearchRequest {
    departureCity : string,
    arrivalCity : string
    departureTime? : Date,
    arrivalTime ?: Date,
    startDate : string,
    endDate : string,
}
