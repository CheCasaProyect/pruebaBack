export declare class CreateReservationDTO {
    propertyId: string;
    userId: string;
    requestedAt: Date;
    checkIn: Date;
    checkOut: Date;
    pax: number;
    totalPrice?: number;
}
