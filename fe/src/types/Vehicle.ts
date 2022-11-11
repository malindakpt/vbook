export interface Vehicle {
    regNo: string;
    manufac: number;
    brand: number; 
    chassis: string;
    type: number;
    fuel: number;
    transmission: number;
    model: string;

    // Added by server
    id?: number;
    createdAt?: string;
    updatedAt?: string;
    UserId?: number;
}