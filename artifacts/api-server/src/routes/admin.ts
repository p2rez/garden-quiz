import { Router, type IRouter } from "express";
import Database from "@replit/database";
import { logger } from "../lib/logger";

const router: IRouter = Router();
const db = new Database();

router.post("/login", (req, res) => {
  const { password } = req.body as { password?: string };
  const ADMIN_PASSWORD = process.env["ADMIN_PASSWORD"];
  if (!password || !ADMIN_PASSWORD || password !== ADMIN_PASSWORD) {
    res.status(401).json({ error: "Incorrect password." });
    return;
  }
  res.json({ success: true });
});

router.post("/submissions", async (req, res) => {
  const { password } = req.body as { password?: string };
  const ADMIN_PASSWORD = process.env["ADMIN_PASSWORD"];
  if (!password || !ADMIN_PASSWORD || password !== ADMIN_PASSWORD) {
    res.status(401).json({ error: "Unauthorized." });
    return;
  }
  try {
    const listResult = await db.list("submission_");
    if (!listResult.ok) throw new Error(listResult.error?.message ?? "Database list failed");
    const allKeys = listResult.value;
    const entries: unknown[] = [];
    for (const key of allKeys) {
      try {
        const getResult = await db.get(key);
        if (getResult.ok) {
          const val = getResult.value;
          entries.push(typeof val === "string" ? JSON.parse(val) : val);
        }
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
