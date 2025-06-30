// lib/middleware.ts
import { verifyToken } from "./auth";
import cookie from "cookie";

export function getUserIdFromRequest(req: any) {
  const cookies = cookie.parse(req.headers.cookie || "");
  const token = cookies.token;
  if (!token) return null;

  try {
    const decoded = verifyToken(token);
    return decoded.userId;
  } catch {
    return null;
  }
}
