import { useState } from "react";

export default function App() {
  return <Quiz />;
}

const COLORS: Record<string, { plant: string; tagline: string; desc: string; texasPlant: string; bg: string; accent: string; text: string }> = {
  Green: {
    plant: "Foliage",
    tagline: "The garden doesn't work without you and honestly neither do I.",
    desc: "You exist in my garden through the freezes, always holding your ground. Holding down the work when the blooms have spent all their energy. No matter the season, the garden always looks alive with you around and that's not a coincidence, that's just what you do.",
    texasPlant: "Cedar Elm (Ulmus crassifolia)",
    bg: "#EAF3DE", accent: "#639922", text: "#27500A",
  },
  Indigo: {
    plant: "My Lobelia",
    tagline: "My favorite, and I will say it to your face.",
    desc: "My all time favorite plant lives in this category. My lobelia is constantly blooming, getting bigger, and bringing so much calm to the wild energy of everything around it. Unbothered, consistent and always becoming more.",
    texasPlant: "Blue Lobelia (Lobelia appendiculata)",
    bg: "#EEEDFE", accent: "#7F77DD", text: "#3C3489",
  },
  Lavender: {
    plant: "My Salvia",
    tagline: "Didn't see you coming but now I can't imagine it without you.",
    desc: "Give my salvias a little bit of sun and they explode into the biggest burst of color. That's you. When you show up, you show up big. Resilient, constantly blooming, evergreen and always supporting every flower around you while doing it.",
    texasPlant: "Mealy Blue Sage (Salvia farinacea)",
    bg: "#F0EFFE", accent: "#AFA9EC", text: "#534AB7",
  },
  White: {
    plant: "My Yarrow",
    tagline: "You make everyone around you better and you don't even try that hard.",
    desc: "You glow even at nighttime. All of my white flowers tower over the others, but what I love most is what they do to the flowers beside them. They encourage everything around them to stretch a little taller. Inspiring, growth-minded, and the kind of presence people are always grateful to be next to.",
    texasPlant: "Western Yarrow (Achillea millefolium)",
    bg: "#F5F4F0", accent: "#888780", text: "#444441",
  },
  "Baby Pink": {
    plant: "My Phlox",
    tagline: "Somehow you fit everywhere and everyone loves you for it.",
    desc: "The first color you see when you walk into my garden. From some of my tallest flowers to the ones closest to the ground, pink exists everywhere and that's exactly you. You move through any room, any crowd, any dynamic and just fit. Welcoming, adaptable, and the reason people feel comfortable the moment they arrive.",
    texasPlant: "Prairie Phlox (Phlox pilosa)",
    bg: "#FBEAF0", accent: "#D4537E", text: "#72243E",
  },
  Coral: {
    plant: "My Guara",
    tagline: "You walk in and literally everything shifts. It's actually crazy.",
    desc: "Vibrant without trying, magnetic without performing AND the first color people's eyes go to in my garden. There's something about you that makes everyone around you feel like the best version of themselves. You don't have to do anything extra. You just have to show up.",
    texasPlant: "Whirling Butterflies (Gaura lindheimeri)",
    bg: "#FAECE7", accent: "#D85A30", text: "#712B13",
  },
  Yellow: {
    plant: "My African Lily",
    tagline: "I waited all season for you and you never disappoint. Never.",
    desc: "My most awaited bloom in the entire garden. I watch for it every season and it never disappoints and neither do you. You turn strangers into friends before the night is even over. Loud in the best way, warm in every way. The party doesn't really start until you decide it does.",
    texasPlant: "Engelmann's Daisy (Engelmannia peristenia)",
    bg: "#FAEEDA", accent: "#BA7517", text: "#633806",
  },
};

const QUESTIONS = [
  { text: "You're in a room full of strangers — how do you make friends?", opts: [{ id: "A", text: "I find a quiet corner and wait for someone to come to me" }, { id: "B", text: "I stick close to the one person I already know" }, { id: "C", text: "I join a small conversation that's already happening" }, { id: "D", text: "I introduce myself to everyone and get the party started" }] },
  { text: "You have a free Saturday with no plans — how does your ideal day look?", opts: [{ id: "A", text: "Home, snacks, cozy — absolutely no human contact required" }, { id: "B", text: "A slow solo adventure — coffee shop, bookstore, a walk" }, { id: "C", text: "A chill hangout with one or two close friends" }, { id: "D", text: "I'm already texting the group chat — we're doing something" }] },
  { text: "You're handed a magic wand — what do you do with it?", opts: [{ id: "A", text: "Wish for a private island where no one can bother me" }, { id: "B", text: "Wish for the ability to always know the right thing to say" }, { id: "C", text: "Wish for the perfect group of people who just get me" }, { id: "D", text: "Wish for the ability to make everyone feel welcomed and loved instantly" }] },
  { text: "A stranger compliments your outfit — what happens next?", opts: [{ id: "A", text: "I say thank you and immediately look at my phone" }, { id: "B", text: "I smile, say thanks, and hope that's the end of it" }, { id: "C", text: "I compliment them back and we have a quick cute moment" }, { id: "D", text: "We're now best friends and I know their whole life story" }] },
  { text: "You wake up and you're famous overnight — what do you do?", opts: [{ id: "A", text: "Panic, turn off my phone, and hide under the covers" }, { id: "B", text: "Quietly enjoy it from a distance — no interviews please" }, { id: "C", text: "Celebrate with my close circle and take it one step at a time" }, { id: "D", text: "I'm already planning my first public appearance and loving every second" }] },
  { text: "What's your role in the friend group?", opts: [{ id: "A", text: "The homebody everyone checks on because they love me" }, { id: "B", text: "The deep thinker everyone calls for real advice" }, { id: "C", text: "The glue that quietly holds everything together" }, { id: "D", text: "The social director — I plan everything and know everybody" }] },
  { text: "You're introduced to your friend's entire friend group — what's your vibe?", opts: [{ id: "A", text: "Polite smiles and counting down until I can go home" }, { id: "B", text: "Observing first, warming up slowly — I'll get there" }, { id: "C", text: "I'm friendly right away but stick to a few good convos" }, { id: "D", text: "I came, I vibed, I left with four new phone numbers" }] },
  { text: "What do your friends come to you for?", opts: [{ id: "A", text: "A safe, quiet space to vent without judgment" }, { id: "B", text: "Honest, thoughtful advice they can actually trust" }, { id: "C", text: "Emotional support and someone who truly listens" }, { id: "D", text: "Hype, energy, and the feeling that everything will be okay" }] },
  { text: "What does a night out with you always guarantee?", opts: [{ id: "A", text: "An early exit and a very detailed debrief the next morning" }, { id: "B", text: "Good conversation and at least one meaningful moment" }, { id: "C", text: "Laughs, realness, and memories with the people I love" }, { id: "D", text: "A story worth telling — something always happens" }] },
  { text: "You have a friend crush on someone — how do you tell them and make it official?", opts: [{ id: "A", text: "I admire them from afar and hope they notice me eventually" }, { id: "B", text: "I like a few of their posts and hope that sends a message" }, { id: "C", text: "I find a low-key reason to hang out — keep it natural" }, { id: "D", text: "I walk straight up and say 'I think we should be friends' — manifested" }] },
];

type Screen = "landing" | "quiz" | "loading" | "result" | "admin";
type Answer = { option: string; text: string; question: string };

function Quiz() {
  const [screen, setScreen] = useState<Screen>("landing");
  const [name, setName] = useState("");
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [result, setResult] = useState<{ color: string; reason: string } | null>(null);
  const [adminPass, setAdminPass] = useState("");
  const [adminUnlocked, setAdminUnlocked] = useState(false);
  const [adminError, setAdminError] = useState("");
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [expandedRow, setExpandedRow] = useState<number | null>(null);

  const reset = () => {
    setScreen("landing"); setName(""); setCurrent(0); setAnswers([]); setResult(null);
    setAdminPass(""); setAdminUnlocked(false); setAdminError(""); setSubmissions([]);
  };

  const selectAnswer = async (optId: string) => {
    const q = QUESTIONS[current];
    const opt = q.opts.find((o) => o.id === optId)!;
    const newAnswers = [...answers, { option: optId, text: opt.text, question: q.text }];
    setAnswers(newAnswers);
    if (current < QUESTIONS.length - 1) {
      setCurrent(current + 1);
    } else {
      setScreen("loading");
      try {
        const res = await fetch("/api/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: name.trim(), answers: newAnswers }),
        });
        const data = await res.json();
        if (data.error) throw new Error(data.error);
        setResult({ color: data.color, reason: data.reason });
      } catch {
        setResult({ color: "Coral", reason: "Something went beautifully wrong — but you're still coral." });
      }
      setScreen("result");
    }
  };

  const loginAdmin = async () => {
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: adminPass }),
    });
    const data = await res.json();
    if (data.success) {
      setAdminUnlocked(true);
      setAdminError("");
      loadSubmissions(adminPass);
    } else {
      setAdminError(data.error || "Incorrect password.");
    }
  };

  const loadSubmissions = async (pass?: string) => {
    const res = await fetch("/api/admin/submissions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: pass ?? adminPass }),
    });
    const data = await res.json();
    setSubmissions(data.submissions || []);
  };

  const S = {
    wrap: { maxWidth: 600, margin: "0 auto", padding: "2.5rem 1.25rem", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", color: "#1a1a18" } as React.CSSProperties,
    card: { background: "#fff", border: "1px solid #e8e6e0", borderRadius: 16, padding: "2rem" } as React.CSSProperties,
    h1: { fontSize: 22, fontWeight: 500, marginBottom: 6 } as React.CSSProperties,
    sub: { fontSize: 15, color: "#6b6b68", lineHeight: 1.6, marginBottom: "1.5rem" } as React.CSSProperties,
    input: { width: "100%", padding: "11px 14px", border: "1px solid #ddd", borderRadius: 10, fontSize: 15, marginBottom: "1rem", outline: "none", background: "#fafaf8", boxSizing: "border-box" } as React.CSSProperties,
    btnPrimary: { width: "100%", padding: "12px", background: "#639922", color: "#fff", border: "none", borderRadius: 10, fontSize: 15, fontWeight: 500, cursor: "pointer" } as React.CSSProperties,
    btnDisabled: { width: "100%", padding: "12px", background: "#b5c9a0", color: "#fff", border: "none", borderRadius: 10, fontSize: 15, fontWeight: 500, cursor: "not-allowed" } as React.CSSProperties,
    btnOutline: { padding: "9px 20px", background: "transparent", border: "1px solid #ddd", borderRadius: 10, fontSize: 14, cursor: "pointer", color: "#444" } as React.CSSProperties,
    optBtn: { display: "block", width: "100%", textAlign: "left", padding: "13px 16px", marginBottom: 10, background: "#f7f6f2", border: "1px solid #e8e6e0", borderRadius: 10, cursor: "pointer", fontSize: 14, lineHeight: 1.5, color: "#1a1a18" } as React.CSSProperties,
    adminLink: { textAlign: "center", marginTop: "1.5rem", fontSize: 12, color: "#aaa", cursor: "pointer" } as React.CSSProperties,
    notice: { fontSize: 12, color: "#888", marginTop: "1rem", lineHeight: 1.6 } as React.CSSProperties,
    error: { color: "#c0392b", fontSize: 13, marginBottom: "0.75rem" } as React.CSSProperties,
  };

  if (screen === "landing") {
    return (
      <div style={{ ...S.wrap, background: "#fafaf8", minHeight: "100vh" }}>
        <h1 style={S.h1}>What color are you in my garden?</h1>
        <p style={S.sub}>10 questions. One color. Your Texas native plant match.</p>
        <div style={S.card}>
          <label style={{ fontSize: 13, color: "#888", display: "block", marginBottom: 6 }}>Your name</label>
          <input style={S.input} type="text" placeholder="Enter your name" maxLength={50} value={name} onChange={(e) => setName(e.target.value)} onKeyDown={(e) => e.key === "Enter" && name.trim() && setScreen("quiz")} autoFocus />
          <p style={S.notice}>Your name and answers are saved for review by the quiz creator only.</p>
          <button style={name.trim() ? { ...S.btnPrimary, marginTop: "1rem" } : { ...S.btnDisabled, marginTop: "1rem" }} onClick={() => name.trim() && setScreen("quiz")} disabled={!name.trim()}>Start the quiz →</button>
        </div>
        <p style={S.adminLink} onClick={() => setScreen("admin")}>Admin access</p>
      </div>
    );
  }

  if (screen === "quiz") {
    const q = QUESTIONS[current];
    const pct = Math.round((current / QUESTIONS.length) * 100);
    return (
      <div style={{ ...S.wrap, background: "#fafaf8", minHeight: "100vh" }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "#888", marginBottom: 8 }}>
          <span>Question {current + 1} of {QUESTIONS.length}</span>
          <span>{pct}%</span>
        </div>
        <div style={{ height: 4, background: "#eee", borderRadius: 2, marginBottom: "2rem", overflow: "hidden" }}>
          <div style={{ height: "100%", background: "#639922", borderRadius: 2, width: `${pct}%`, transition: "width 0.35s ease" }} />
        </div>
        <div style={S.card}>
          <p style={{ fontSize: 16, fontWeight: 500, lineHeight: 1.6, marginBottom: "1.5rem" }}>{q.text}</p>
          {q.opts.map((o) => (
            <button key={o.id} style={S.optBtn} onClick={() => selectAnswer(o.id)}>
              <span style={{ fontWeight: 600, color: "#888", marginRight: 10 }}>{o.id}.</span>{o.text}
            </button>
          ))}
          {current > 0 && (
            <button style={{ ...S.btnOutline, marginTop: 4 }} onClick={() => { setCurrent(current - 1); setAnswers(answers.slice(0, -1)); }}>← Back</button>
          )}
        </div>
      </div>
    );
  }

  if (screen === "loading") {
    return (
      <div style={{ ...S.wrap, background: "#fafaf8", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center" }}>
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          <div style={{ width: 44, height: 44, border: "3px solid #e0e0e0", borderTopColor: "#639922", borderRadius: "50%", animation: "spin 0.9s linear infinite", margin: "0 auto 1.5rem" }} />
          <p style={{ color: "#888", fontSize: 15 }}>Finding your garden color…</p>
        </div>
      </div>
    );
  }

  if (screen === "result" && result) {
    const c = COLORS[result.color] || COLORS["Coral"];
    return (
      <div style={{ ...S.wrap, background: "#fafaf8", minHeight: "100vh" }}>
        <div style={{ background: c.bg, border: `1px solid ${c.accent}33`, borderRadius: 16, padding: "2rem", marginBottom: "1rem" }}>
          <span style={{ display: "inline-block", padding: "4px 14px", borderRadius: 8, fontSize: 12, fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", background: `${c.accent}22`, color: c.text, marginBottom: 10 }}>{result.color}</span>
          <p style={{ fontSize: 26, fontWeight: 500, color: c.text, marginBottom: 4 }}>{c.plant}</p>
          <p style={{ fontSize: 14, fontStyle: "italic", color: c.accent, marginBottom: "1rem" }}>"{c.tagline}"</p>
          <p style={{ fontSize: 15, lineHeight: 1.75, color: c.text, marginBottom: "1.25rem" }}>{c.desc}</p>
          <div style={{ background: "rgba(255,255,255,0.5)", borderLeft: `3px solid ${c.accent}`, borderRadius: 10, padding: "12px 16px", marginBottom: "1rem" }}>
            <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: c.text, opacity: 0.7, marginBottom: 4 }}>Your Texas Native Plant Match</p>
            <p style={{ fontSize: 14, fontWeight: 500, color: c.text }}>{c.texasPlant}</p>
          </div>
          {result.reason && <p style={{ fontSize: 13, fontStyle: "italic", color: c.text, opacity: 0.75, marginTop: "0.75rem" }}>"{result.reason}"</p>}
        </div>
        <button style={S.btnPrimary} onClick={reset}>Take it again</button>
      </div>
    );
  }

  if (screen === "admin") {
    if (!adminUnlocked) {
      return (
        <div style={{ ...S.wrap, background: "#fafaf8", minHeight: "100vh" }}>
          <div style={S.card}>
            <h1 style={{ ...S.h1, marginBottom: "0.5rem" }}>Admin access</h1>
            <p style={S.sub}>Enter your password to view submissions.</p>
            <input style={S.input} type="password" placeholder="Password" value={adminPass} onChange={(e) => setAdminPass(e.target.value)} onKeyDown={(e) => e.key === "Enter" && loginAdmin()} autoFocus />
            {adminError && <p style={S.error}>{adminError}</p>}
            <div style={{ display: "flex", gap: 10 }}>
              <button style={{ ...S.btnPrimary, width: "auto", padding: "10px 24px" }} onClick={loginAdmin}>Unlock</button>
              <button style={S.btnOutline} onClick={() => setScreen("landing")}>Back</button>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div style={{ ...S.wrap, background: "#fafaf8", minHeight: "100vh" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
          <h1 style={S.h1}>Submissions ({submissions.length})</h1>
          <div style={{ display: "flex", gap: 10 }}>
            <button style={S.btnOutline} onClick={() => loadSubmissions()}>Refresh</button>
            <button style={S.btnOutline} onClick={() => { setAdminUnlocked(false); setAdminPass(""); setSubmissions([]); setScreen("landing"); }}>Sign out</button>
          </div>
        </div>
        {submissions.length === 0 ? (
          <div style={S.card}><p style={{ color: "#888" }}>No submissions yet.</p></div>
        ) : submissions.map((s, i) => {
          const c = COLORS[s.color] || COLORS["Coral"];
          const isOpen = expandedRow === i;
          const dt = new Date(s.timestamp).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit" });
          return (
            <div key={i} style={{ background: "#fff", border: "1px solid #e8e6e0", borderRadius: 12, marginBottom: 10, overflow: "hidden" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 16px", cursor: "pointer" }} onClick={() => setExpandedRow(isOpen ? null : i)}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <div style={{ width: 34, height: 34, borderRadius: "50%", background: c.bg, border: `2px solid ${c.accent}`, color: c.text, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 600, flexShrink: 0 }}>{(s.color || "?")[0]}</div>
                  <div style={{ marginLeft: 12 }}>
                    <p style={{ fontSize: 15, fontWeight: 500 }}>{s.name}</p>
                    <p style={{ fontSize: 12, color: "#888", marginTop: 2 }}>{s.color} · {c.plant} · {dt}</p>
                  </div>
                </div>
                <span style={{ color: "#bbb", fontSize: 12 }}>{isOpen ? "▲" : "▼"}</span>
              </div>
              {isOpen && (
                <div style={{ padding: "0 16px 16px", borderTop: "1px solid #f0ede8" }}>
                  {s.reason && <p style={{ fontSize: 13, fontStyle: "italic", color: "#888", marginBottom: "1rem" }}>"{s.reason}"</p>}
                  <p style={{ fontSize: 12, fontWeight: 600, color: "#888", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.05em" }}>Answers</p>
                  {(s.answers || []).map((a: Answer, j: number) => (
                    <div key={j} style={{ marginBottom: 10 }}>
                      <p style={{ fontSize: 12, color: "#888" }}>{j + 1}. {a.question}</p>
                      <p style={{ fontSize: 13, color: "#1a1a18", marginTop: 2, paddingLeft: 12 }}><strong>{a.option}.</strong> {a.text}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  }

  return null;
}
