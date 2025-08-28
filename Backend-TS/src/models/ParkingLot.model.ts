import {Schema, model, Document} from 'mongoose';

export interface ParkingLotDocument extends Document {
  name: string;
  floors: string[]; // references to ParkingFloor
}


const ParkingLotSchema = new Schema<ParkingLotDocument>(
  {
    name: { type: String, required: true },
    floors: [{ type: Schema.Types.ObjectId, ref: "ParkingFloor" }],
  },
  { timestamps: true }
);

export const ParkingLot = model<ParkingLotDocument>('ParkingLot', ParkingLotSchema);