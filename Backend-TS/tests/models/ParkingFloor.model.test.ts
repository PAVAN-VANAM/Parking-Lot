
import mongoose, { Types } from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import { ParkingFloor } from "../../src/models/ParkingFloor.model";
import { ParkingSpotSchema } from "../../src/models/ParkingSpot.model";

describe("ParkingFloor Model - Full Coverage", () => {
  let mongoServer: MongoMemoryServer;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
  });

  afterAll(async () => {
    await mongoose.disconnect();
    if (mongoServer) await mongoServer.stop();
  });

  afterEach(async () => {
    await ParkingFloor.deleteMany({});
    jest.restoreAllMocks();
  });

  test("should create a ParkingFloor successfully with spots", async () => {
    const floor = await ParkingFloor.create({
      floorNumber: 1,
      spots: [
        { number: "A1", type: "COMPACT", isOccupied: false } as any,
        { number: "A2", type: "LARGE", isOccupied: true } as any,
      ],
      parkingLot: new Types.ObjectId(),
    });

    expect(floor.floorNumber).toBe(1);
    expect(floor.spots.length).toBe(2);
    expect(floor.spots[0].number).toBe("A1");
    expect(floor.spots[1].isOccupied).toBe(true);
    expect(floor.parkingLot).toBeDefined();
  });

  test("should create a ParkingFloor with empty spots array if not provided", async () => {
    const floor = await ParkingFloor.create({
      floorNumber: 2,
      parkingLot: new Types.ObjectId(),
    });

    expect(floor.spots).toEqual([]);
    expect(floor.floorNumber).toBe(2);
  });

  test("should fail if floorNumber is missing", async () => {
    let error;
    try {
      await ParkingFloor.create({ spots: [], parkingLot: new Types.ObjectId() });
    } catch (e) {
      error = e;
    }

    expect(error).toBeDefined();
    expect(error.name).toBe("ValidationError");
    expect(error.errors.floorNumber).toBeDefined();
  });

  test("should find ParkingFloor by ID", async () => {
    const created = await ParkingFloor.create({
      floorNumber: 3,
      spots: [],
      parkingLot: new Types.ObjectId(),
    });

    const found = await ParkingFloor.findById(created._id);
    expect(found).not.toBeNull();
    expect(found?.floorNumber).toBe(3);
  });

  test("should return all ParkingFloors", async () => {
    await ParkingFloor.create({ floorNumber: 1, spots: [], parkingLot: new Types.ObjectId() });
    await ParkingFloor.create({ floorNumber: 2, spots: [], parkingLot: new Types.ObjectId() });

    const floors = await ParkingFloor.find({});
    expect(floors.length).toBe(2);
    expect(floors.map(f => f.floorNumber)).toEqual([1, 2]);
  });

  test("should correctly handle nested ParkingSpot subdocuments", async () => {
    const floor = await ParkingFloor.create({
      floorNumber: 4,
      spots: [{ number: "B1", type: "HANDICAP", isOccupied: false } as any],
      parkingLot: new Types.ObjectId(),
    });

    const spot = floor.spots[0];
    expect(spot.number).toBe("B1");
    expect(spot.type).toBe("HANDICAP");
    expect(spot.isOccupied).toBe(false);

    // Modify subdocument and save
    spot.isOccupied = true;
    await floor.save();

    const updated = await ParkingFloor.findById(floor._id);
    expect(updated?.spots[0].isOccupied).toBe(true);
  });
});
