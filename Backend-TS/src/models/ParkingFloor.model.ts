import { Document, model, Schema, Types } from "mongoose";
import { ParkingSpotSchema } from "./ParkingSpot.model.js";

export interface ParkingFloorDocument extends Document {
    floorNumber: number;
    spots: typeof ParkingSpotSchema[];
    parkingLot: Types.ObjectId; // Reference to ParkingLot
}

const ParkingFloorSchema = new Schema<ParkingFloorDocument>({
    floorNumber: { type: Number, required: true },
    spots: { type: [ParkingSpotSchema], default: [] },
    parkingLot: { type: Schema.Types.ObjectId, ref: 'ParkingLot' },
}, { timestamps: true }
);


export const ParkingFloor = model<ParkingFloorDocument>('ParkingFloor', ParkingFloorSchema);