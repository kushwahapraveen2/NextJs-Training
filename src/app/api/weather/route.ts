import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// Validation schema for weather request
const weatherSchema = z.object({
  location: z.string().min(1, "Location is required"),
});

// Mock weather data - in a real app, you'd call a weather API
const getMockWeatherData = (location: string) => {
  const conditions = [
    { icon: "☀️", condition: "Sunny", temperature: 25 },
    { icon: "☁️", condition: "Cloudy", temperature: 18 },
    { icon: "🌧️", condition: "Rainy", temperature: 12 },
    { icon: "❄️", condition: "Snowy", temperature: -2 },
    { icon: "⛈️", condition: "Stormy", temperature: 15 },
    { icon: "🌫️", condition: "Foggy", temperature: 8 },
  ];

  const randomCondition =
    conditions[Math.floor(Math.random() * conditions.length)];

  return {
    icon: randomCondition.icon,
    temperature: randomCondition.temperature,
    condition: randomCondition.condition,
    location: location,
    timestamp: new Date().toISOString(),
  };
};

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const location = searchParams.get("location");

    if (!location) {
      return NextResponse.json(
        { error: "Location parameter is required" },
        { status: 400 }
      );
    }

    // Validate input
    const validationResult = weatherSchema.safeParse({ location });
    if (!validationResult.success) {
      return NextResponse.json(
        { error: "Invalid input", details: validationResult.error.errors },
        { status: 400 }
      );
    }

    // Get weather data (mock for now)
    const weatherData = getMockWeatherData(location);

    return NextResponse.json(weatherData);
  } catch (error) {
    console.error("Error fetching weather:", error);
    return NextResponse.json(
      { error: "Failed to fetch weather data" },
      { status: 500 }
    );
  }
}
