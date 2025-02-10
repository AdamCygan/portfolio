import { connectToDatabase, disconnectFromDatabase } from "../db/config";
import { UserModel } from "../db/users";
import { users } from "./users";

const seedDatabase = async () => {
  process.env.USE_MEMORY_DB = "true";

  await connectToDatabase();

  console.log("Clearing existing data...");
  await UserModel.deleteMany({});

  console.log("Seeding database with test data...");
  await UserModel.insertMany(users);

  console.log("Database seeded successfully!");
  await disconnectFromDatabase();
  process.exit();
};

seedDatabase().catch((error) => {
  console.error("Failed to seed database:", error);
  process.exit(1);
});
