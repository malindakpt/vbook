export interface Record {
    date: number;
    type: number;
    millage: number; 
    desc: string;

    // Added by server
    id?: number;
    createdAt?: string;
    updatedAt?: string;
    UserId?: number;
    VehicleId?: number;
}