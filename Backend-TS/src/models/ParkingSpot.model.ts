import { Schema } from "mongoose";
import { ParkingSpotType } from "../types/parking.js";

export const ParkingSpotSchema = new Schema(
    {
        spotId: { type: String, required: true, unique: true },
        spotType: { 
            type: String, 
            enum: Object.values(ParkingSpotType), 
            required: true 
        },
        isOccupied: { type: Boolean, default: false },
        vehicle: { type: Schema.Types.ObjectId, ref: 'Vehicle', default: null } // Reference to Vehicle ID
    },
    {_id: false,
     timestamps: true }
);