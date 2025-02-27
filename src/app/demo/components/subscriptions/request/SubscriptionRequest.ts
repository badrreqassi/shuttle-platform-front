export interface SubscriptionRequest {
    buses: number[]; // List of bus IDs (Long in Java maps to number in TypeScript)
    transportCompanyId: number; // Transport company ID (Long in Java maps to number in TypeScript)
    startDate: string; // LocalDate in Java maps to string in TypeScript (ISO format: "yyyy-MM-dd")
    endDate: string; // LocalDate in Java maps to string in TypeScript (ISO format: "yyyy-MM-dd")
    departureTime: string; // LocalTime in Java maps to string in TypeScript (ISO format: "HH:mm:ss")
    arrivalTime: string; // LocalTime in Java maps to string in TypeScript (ISO format: "HH:mm:ss")
    departureCity: string; // Departure city
    arrivalCity: string; // Arrival city
    maxSubscribers: number;
}
