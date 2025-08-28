import {Request , Response , NextFunction} from  'express';
import * as parkingLotService from '../services/parkingLot.services.js';
import { ParkingSpotType } from '../types/parking.js';

// create parking lot
export const createParkingLot = async (req: Request, res : Response, next : NextFunction) => {
    try {
        const {name} = req.body;
        if(!name) {
            return res.status(400).json({message : "Parking lot name is required"});
        }
        const parkingLot = await parkingLotService.createParkingLot(name);
        res.status(201).json(parkingLot);
    } catch (error) {
        next(error);
    }
};

// Add Floor to parking lot
export const addFloorToParkingLot = async (req: Request, res : Response, next: NextFunction) => {
    try {
        const {lotId} = req.params;
        const {floorNumber, spots} = req.body;
        
        if(!floorNumber || !spots) {
            return res.status(400).json({message : "Floor number ans Spots is required"});
        }
        const floor = await parkingLotService.addFloorToLot(lotId, floorNumber, spots);
        res.status(201).json(floor);
    } catch (error) {
        next(error);
    }
};

// Get all Floors in a Lot
export const getFloors = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { lotId } = req.params;
    const floors = await parkingLotService.listFloors(lotId);
    res.status(200).json(floors);
  } catch (error) {
    next(error);
  }
};

// Get a Floor by ID
export const getFloor = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { floorId } = req.params;
    const floor = await parkingLotService.getFloorById(floorId);
    res.status(200).json(floor);
  } catch (error) {
    next(error);
  }
};