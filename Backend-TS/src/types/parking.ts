export enum ParkingSpotType {
  COMPACT = 'COMPACT',  
    LARGE = 'LARGE',
    MOTORCYCLE = 'MOTORCYCLE',
}

export interface ParkingSpot {
    spotId: string;
    spotType: ParkingSpotType;
    isOccupied: boolean;
    vehicle?: string; // Vehicle ID reference
}