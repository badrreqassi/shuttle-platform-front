import {User} from "../../TransportCompany/model/response/TransportCompany";

export interface SubscriptionRequestUser {
    user: User;
    startDate: string; // LocalDate in Java maps to string in TypeScript (ISO format: "yyyy-MM-dd")
    endDate: string; // LocalDate in Java maps to string in TypeScript (ISO format: "yyyy-MM-dd")
    departureTime: string; // LocalTime in Java maps to string in TypeScript (ISO format: "HH:mm:ss")
    arrivalTime: string; // LocalTime in Java maps to string in TypeScript (ISO format: "HH:mm:ss")
    departureCity: string; // Departure city
    arrivalCity: string; // Arrival city
}
