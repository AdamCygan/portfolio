import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

const MONGO_URL = process.env.MONGO_URL || "";

let mongoMemoryServer: MongoMemoryServer | null = null;

export const connectToDatabase = async () => {
  try {
    if (process.env.USE_MEMORY_DB === "true") {
      mongoMemoryServer = await MongoMemoryServer.create();
      const memoryUri = mongoMemoryServer.getUri();
      console.log("Using In-Memory MongoDB:", memoryUri);

      await mongoose.connect(memoryUri);
    } else {
      await mongoose.connect(MONGO_URL);
      console.log("Connected to MongoDB Atlas");
    }
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    process.exit(1);
  }
};

export const disconnectFromDatabase = async () => {
  try {
    if (mongoMemoryServer) {
      await mongoose.connection.dropDatabase();
      await mongoose.connection.close();
      await mongoMemoryServer.stop();

      console.log("Disconnected from In-Memory MongoDB");
    } else {
      await mongoose.connection.close();

      console.log("Disconnected from MongoDB Atlas");
    }
  } catch (error) {
    console.error("Error during database disconnection:", error);
  }
};
