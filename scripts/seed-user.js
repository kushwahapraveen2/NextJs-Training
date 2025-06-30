const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function seedUser() {
  try {
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: "test@example.com" },
    });

    if (existingUser) {
      console.log("Test user already exists:", existingUser.email);
      return;
    }

    // Hash password
    const passwordHash = await bcrypt.hash("password123", 12);

    // Create test user
    const user = await prisma.user.create({
      data: {
        name: "Test User",
        username: "testuser",
        email: "test@example.com",
        mobileNumber: "+1234567890",
        passwordHash,
        role: "user",
        isActive: true,
      },
    });

    console.log("Test user created successfully:", {
      id: user.id,
      email: user.email,
      name: user.name,
    });

    console.log("\nYou can now login with:");
    console.log("Email: test@example.com");
    console.log("Password: password123");
  } catch (error) {
    console.error("Error creating test user:", error);
  } finally {
    await prisma.$disconnect();
  }
}

seedUser();
