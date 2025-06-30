const { PrismaClient } = require("@prisma/client");
const { v4: uuidv4 } = require("uuid");

const prisma = new PrismaClient();

async function seedDiary() {
  try {
    // Get the test user
    const user = await prisma.user.findUnique({
      where: { email: "test@example.com" },
    });

    if (!user) {
      console.log("Test user not found. Please run seed-user.js first.");
      return;
    }

    // Check if diary already exists
    const existingDiary = await prisma.diary.findFirst({
      where: { authorId: user.id },
    });

    if (existingDiary) {
      console.log("Test diary already exists for user:", user.email);
      return;
    }

    // Create test diary
    const diary = await prisma.diary.create({
      data: {
        id: uuidv4(),
        title: "My First Travel Adventure",
        slug: "my-first-travel-adventure",
        content:
          "This is my first diary entry about my amazing travel adventure. I visited beautiful places and met wonderful people. The weather was perfect and the experience was unforgettable!",
        coverImage: "https://picsum.photos/800/600?random=1",
        images: [
          "https://picsum.photos/800/600?random=2",
          "https://picsum.photos/800/600?random=3",
        ],
        location: "Paris, France",
        weatherAtTime: {
          condition: "Sunny",
          temperature: 22,
          location: "Paris",
        },
        isPublic: true,
        authorId: user.id,
        likes: 5,
      },
    });

    console.log("Test diary created successfully:", {
      id: diary.id,
      title: diary.title,
      author: user.name,
    });
  } catch (error) {
    console.error("Error creating test diary:", error);
  } finally {
    await prisma.$disconnect();
  }
}

seedDiary();
