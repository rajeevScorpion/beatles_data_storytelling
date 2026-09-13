import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";

interface Counters {
  visits: number;
  plays: number;
  lastUpdated?: string;
}

const DATA_DIR = path.join(process.cwd(), "data");
const COUNTER_FILE = path.join(DATA_DIR, "telemetry_counters.json");

const DEFAULT_COUNTERS: Counters = {
  visits: 746,
  plays: 315,
};

let memoryCounters: Counters = { ...DEFAULT_COUNTERS };

function loadCounters(): Counters {
  try {
    if (fs.existsSync(COUNTER_FILE)) {
      const raw = fs.readFileSync(COUNTER_FILE, "utf-8");
      const parsed = JSON.parse(raw);
      return {
        visits: Math.max(DEFAULT_COUNTERS.visits, typeof parsed.visits === "number" ? parsed.visits : DEFAULT_COUNTERS.visits),
        plays: Math.max(DEFAULT_COUNTERS.plays, typeof parsed.plays === "number" ? parsed.plays : DEFAULT_COUNTERS.plays),
        lastUpdated: parsed.lastUpdated || new Date().toISOString(),
      };
    }
  } catch (err) {
    console.error("Error loading counters file:", err);
  }
  return { ...DEFAULT_COUNTERS };
}

function saveCounters(counters: Counters): void {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    const dataToSave = {
      ...counters,
      lastUpdated: new Date().toISOString(),
    };
    fs.writeFileSync(COUNTER_FILE, JSON.stringify(dataToSave, null, 2), "utf-8");
  } catch (err) {
    console.error("Error saving counters file:", err);
  }
}

// Initialize on startup
memoryCounters = loadCounters();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // Get current counters
  app.get("/api/telemetry", (_req, res) => {
    res.json(memoryCounters);
  });

  // Record a visit (increments visits by 1)
  app.post("/api/telemetry/visit", (_req, res) => {
    memoryCounters.visits += 1;
    saveCounters(memoryCounters);
    res.json(memoryCounters);
  });

  // Record a play event (increments plays by 1)
  app.post("/api/telemetry/play", (_req, res) => {
    memoryCounters.plays += 1;
    saveCounters(memoryCounters);
    res.json(memoryCounters);
  });

  // Vite middleware for development vs static build in production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true, host: "0.0.0.0", port: PORT },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.use((_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT} [visits: ${memoryCounters.visits}, plays: ${memoryCounters.plays}]`);
  });
}

startServer();
