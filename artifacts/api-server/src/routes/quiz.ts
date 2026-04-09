import { Router, type IRouter } from "express";
import rateLimit from "express-rate-limit";
import Database from "@replit/database";
import { logger } from "../lib/logger";

const router: IRouter = Router();
const db = new Database();

const quizLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 10,
  message: { error: "Too many requests. Please try again later." },
});

const QUESTIONS = [
  "You're in a room full of strangers — how do you make friends?",
  "You have a free Saturday with no plans — how does your ideal day look?",
  "You're handed a magic wand — what do you do with it?",
  "A stranger compliments your outfit — what happens next?",
  "You wake up and you're famous overnight — what do you do?",
  "What's your role in the friend group?",
  "You're introduced to your friend's entire friend group — what's your vibe?",
  "What do your friends come to you for?",
  "What does a night out with you always guarantee?",
  "You have a friend crush on someone — how do you tell them and make it official?",
];

router.post("/submit", quizLimiter, async (req, res) => {
  try {
    const { name, answers } = req.body as {
      name: unknown;
      answers: unknown;
    };

    if (!name || typeof name !== "string" || name.trim().length === 0) {
      res.status(400).json({ error: "Invalid name." });
      return;
    }
    if (
      !Array.isArray(answers) ||
      answers.length !== 10 ||
      !answers.every(
        (a) =>
          a &&
          typeof a === "object" &&
          typeof a.option === "string" &&
          typeof a.text === "string",
      )
    ) {
      res.status(400).json({ error: "Invalid answers." });
      return;
    }

    const safeName = name.trim().slice(0, 50);

    const answerSummary = QUESTIONS.map((q, i) => {
      const a = answers[i] as { option: string; text: string };
      return `Q${i + 1}: ${q}\nAnswer (${a.option}): ${a.text}`;
    }).join("\n\n");

    const prompt = `You are a personality quiz algorithm. Based on the user's answers below, determine which color best matches their personality from this list: Green, Indigo, Lavender, White, Baby Pink, Coral, Yellow.

Color personalities (from most introverted to most extroverted):
- Green: The quiet backbone. Steady, grounded, always present. Prefers solitude or small circles.
- Indigo: The calm constant. Deep, thoughtful, unbothered. Introspective but deeply loved.
- Lavender: The unexpected burst. Quiet but impactful when present. Selective with energy.
- White: The inspiring presence. Thoughtful advisor, growth-minded, elevates others quietly.
- Baby Pink: The universal fit. Adaptable, warm, comfortable in most social settings.
- Coral: The magnetic force. Naturally draws people, vibrant without trying, energizing presence.
- Yellow: The awaited bloom. Highly extroverted, the life of the party, turns strangers into friends instantly.

Analyze the full pattern of answers holistically like a recommendation algorithm.

User's answers:
${answerSummary}

Respond with ONLY a JSON object (no markdown, no explanation):
{"color": "ColorName", "reason": "A single warm, personal sentence under 20 words explaining why this color fits them."}`;

    const ANTHROPIC_API_KEY = process.env["ANTHROPIC_API_KEY"];
    if (!ANTHROPIC_API_KEY) {
      logger.error("ANTHROPIC_API_KEY is not set");
      res.status(500).json({ error: "Server misconfigured." });
      return;
    }

    const apiRes = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 200,
        messages: [{ role: "user", content: prompt }],
      }),
    });

    const apiData = (await apiRes.json()) as {
      content?: Array<{ text?: string }>;
    };
    const text =
      apiData.content?.map((b) => b.text ?? "").join("") ?? "";
    const clean = text.replace(/```json|```/g, "").trim();
    const { color, reason } = JSON.parse(clean) as {
      color: string;
      reason: string;
    };

    const entry = {
      id: `submission_${Date.now()}`,
      name: safeName,
      answers,
      color,
      reason,
      timestamp: new Date().toISOString(),
    };

    await db.set(entry.id, JSON.stringify(entry));

    res.json({ color, reason });
  } catch (err) {
    logger.error({ err }, "Submit error");
    res.status(500).json({ error: "Something went wrong. Please try again." });
  }
});

export default router;
