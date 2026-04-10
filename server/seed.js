require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./models/User");

const seedData = async () => {
  try {
    // Connect to DB
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected for seeding...");

    // Clear existing users to avoid duplicates
    await User.deleteMany();
    console.log("Old users cleared.");

    // Create Admin
    const admin = new User({
      name: "Admin Curator",
      email: "admin@brewedcraft.com",
      password: "admin123", // Pre-save hook will hash this
      role: "admin",
    });

    // Create Chef
    const chef = new User({
      name: "Executive Chef",
      email: "chef@brewedcraft.com",
      password: "chef123", // Pre-save hook will hash this
      role: "chef",
    });

    await admin.save();
    await chef.save();

    console.log("Seeding successful!");
    console.log("Admin: admin@brewedcraft.com / admin123");
    console.log("Chef: chef@brewedcraft.com / chef123");

    process.exit();
  } catch (error) {
    console.error("Error with seeding:", error);
    process.exit(1);
  }
};

seedData();
