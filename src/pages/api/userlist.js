import pool from "../../../lib/db";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const result = await pool.query("SELECT * FROM users");
      return res.status(200).json({ users: result.rows });
    } catch (error) {
      console.error("GET Error:", error);
      return res.status(500).json({ error: "Database error" });
    }
  }

  if (req.method === "POST") {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({ error: "Name and email are required" });
    }

    try {
      await pool.query("INSERT INTO users (name, email) VALUES ($1, $2)", [
        name,
        email,
      ]);
      return res.status(201).json({ message: "User created successfully" });
    } catch (error) {
      console.error("POST Error:", error);
      return res.status(500).json({ error: "Failed to insert user" });
    }
  }

  // Method not allowed
  return res.status(405).json({ error: "Method not allowed" });
}
