import { ParkingLot,ParkingLotDocument } from "../models/ParkingLot.model.js";
import { ParkingFloor, ParkingFloorDocument } from "../models/ParkingFloor.model.js";
import { ParkingSpotType } from "../types/parking.js";

/**
 * Create a new Parking Lot
 */
export const createParkingLot = async (name: string): Promise<ParkingLotDocument> => {
  const lot = new ParkingLot({ name, floors: [] });
  return await lot.save();
};


/**
 * Add a new floor to an existing Parking Lot
 */
export const addFloorToLot = async (
  lotId: string,
  floorNumber: number,
  spots: { spotId: string; spotType: ParkingSpotType }[]
): Promise<ParkingFloorDocument> => {
  // Verify parking lot exists
  const lot = await ParkingLot.findById(lotId);
  if (!lot) {
    throw new Error("Parking lot not found");
  }

  // Create Floor with embedded spots
  const floor = new ParkingFloor({
    floorNumber,
    spots: spots.map((s) => ({
      ...s,
      isOccupied: false,
      vehicle: null,
    })),
    parkingLot: lotId,
  });

  await floor.save();

  // Link floor to lot
  lot.floors.push(floor.id.toString());
  await lot.save();

  return floor;
};

/**
 * Get all floors of a parking lot
 */
export const listFloors = async (lotId: string): Promise<ParkingFloorDocument[]> => {
  const lot = await ParkingLot.findById(lotId).populate("floors");
  if (!lot) {
    throw new Error("Parking lot not found");
  }
  return lot.floors as unknown as ParkingFloorDocument[];
};

/**
 * Get floor details by ID
 */
export const getFloorById = async (floorId: string): Promise<ParkingFloorDocument | null> => {
  const floor = await ParkingFloor.findById(floorId);
  if (!floor) {
    throw new Error("Floor not found");
  }
  return floor;
};