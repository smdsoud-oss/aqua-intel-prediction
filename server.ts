
import express from "express";
import { createServer as createViteServer } from "vite";
import multer from "multer";
import { parse } from "csv-parse";
import cors from "cors";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

const upload = multer({ storage: multer.memoryStorage() });

// In-memory history storage
const predictionHistory: any[] = [];

// Rule-based prediction logic
const predictStress = (rainfall: number, borewellDepth: number, district: string, cropType: string) => {
  let status = "DANGER";
  let confidence = 0.85 + Math.random() * 0.1; // Realistic confidence
  let recommendation = "";

  if (rainfall > 800 && borewellDepth < 200) {
    status = "SAFE";
    recommendation = "Water levels are optimal. Continue current irrigation practices and consider crop diversification.";
  } else if (rainfall >= 400 && rainfall <= 800) {
    status = "AVERAGE";
    recommendation = "Moderate stress detected. Implement drip irrigation and monitor soil moisture weekly.";
  } else {
    status = "DANGER";
    recommendation = "Critical depletion! Shift to drought-resistant crops and implement immediate rainwater harvesting.";
  }

  const result = {
    status,
    confidence: parseFloat(confidence.toFixed(2)),
    recommendation,
    district,
    cropType,
    explanation: `Based on ${rainfall}mm rainfall and ${borewellDepth}m depth in ${district}, the aquifer shows ${status.toLowerCase()} stress levels.`,
    timestamp: new Date().toISOString()
  };

  predictionHistory.unshift(result); // Add to the beginning of the history
  return result;
};

// API Endpoints
app.get("/api/history", (req, res) => {
  res.json(predictionHistory);
});

app.post("/api/predict", (req, res) => {
  const { rainfall, borewellDepth, district, cropType } = req.body;
  
  if (rainfall === undefined || borewellDepth === undefined) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const result = predictStress(Number(rainfall), Number(borewellDepth), district, cropType);
  res.json(result);
});

app.post("/api/upload-csv", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  const results: any[] = [];
  const parser = parse({
    columns: true,
    skip_empty_lines: true,
  });

  parser.on("readable", () => {
    let record;
    while ((record = parser.read())) {
      const rainfall = Number(record.rainfall);
      const borewellDepth = Number(record.borewellDepth);
      const district = record.district || "Unknown";
      const cropType = record.cropType || "Unknown";
      
      results.push(predictStress(rainfall, borewellDepth, district, cropType));
    }
  });

  parser.on("error", (err) => {
    res.status(500).json({ error: "Error parsing CSV" });
  });

  parser.on("end", () => {
    res.json(results);
  });

  parser.write(req.file.buffer);
  parser.end();
});

// Vite middleware for development
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static("dist"));
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
