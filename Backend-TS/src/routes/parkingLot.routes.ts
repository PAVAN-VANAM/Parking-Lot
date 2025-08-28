import { Router } from "express";
import * as controller from "../controllers/parkingLot.controller.js";

const router = Router();

/**
 * Parking Lot routes
 */
router.post("/", controller.createParkingLot);           // Create lot
router.get("/:lotId/floors", controller.getFloors);      // List floors in lot

/**
 * Floor routes
 */
router.post("/:lotId/floors", controller.addFloorToParkingLot);      // Add floor
router.get("/floor/:floorId", controller.getFloor);      // Get floor by id

export default router;
