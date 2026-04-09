import { Router, type IRouter } from "express";
import rateLimit from "express-rate-limit";
import Database from "@replit/database";
import { logger } from "../lib/logger";

const router: IRouter = Router();
const db = new Database();

const adminLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { error: "Too many login attempts. Please try again later." },
});

router.post("/login", adminLimiter, (req, res) => {
  const { password } = req.body as { password?: string };
  const ADMIN_PASSWORD = process.env["ADMIN_PASSWORD"];
  if (!password || !ADMIN_PASSWORD || password !== ADMIN_PASSWORD) {
    res.status(401).json({ error: "Incorrect password." });
    return;
  }
  res.json({ success: true });
});

router.post("/submissions", adminLimiter, async (req, res) => {
  const { password } = req.body as { password?: string };
  const ADMIN_PASSWORD = process.env["ADMIN_PASSWORD"];
  if (!password || !ADMIN_PASSWORD || password !== ADMIN_PASSWORD) {
    res.status(401).json({ error: "Unauthorized." });
    return;
  }
  try {
    const allKeys = await db.list("submission_");
    const entries: unknown[] = [];
    for (const key of allKeys) {
      try {
        const val = await db.get(key);
        entries.push(typeof val === "string" ? JSON.parse(val) : val);
      } catch (_e) {}
    }
    (entries as Array<{ timestamp: string }>).sort(
      (a, b) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
    );
    res.json({ submissions: entries });
  } catch (err) {
    logger.error({ err }, "Submissions error");
    res.status(500).json({ error: "Could not load submissions." });
  }
});

export default router;
