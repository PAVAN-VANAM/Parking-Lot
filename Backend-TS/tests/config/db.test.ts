import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import connectDB from "../../src/config/db";

describe("Database Connection (db.ts)", () => {
  let mongoServer: MongoMemoryServer;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
  });

  afterAll(async () => {
    await mongoose.disconnect();
    if (mongoServer) await mongoServer.stop();
  });

  afterEach(async () => {
    jest.restoreAllMocks(); // restore any mocks between tests
  });

  test("should connect to MongoDB successfully", async () => {
    process.env.MONGO_URI = mongoServer.getUri();
    await connectDB();
    expect(mongoose.connection.readyState).toBe(1); // 1 = connected
  });

  test("should handle connection failure", async () => {
    // Provide invalid URI
    process.env.MONGO_URI = "mongodb://invalidhost:27017/testdb";

    // Spy on console.error to check error logging
    const consoleSpy = jest.spyOn(console, "error").mockImplementation(() => {});

    // Prevent process.exit from actually exiting during test
    const exitSpy = jest.spyOn(process, "exit").mockImplementation(((code?: number) => {
      throw new Error("process.exit called"); // throw to catch in test
    }) as any);

    await expect(connectDB()).rejects.toThrow("process.exit called");

    expect(consoleSpy).toHaveBeenCalled(); // ensure error was logged
    expect(exitSpy).toHaveBeenCalledWith(1);
  });
});
