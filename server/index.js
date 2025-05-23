require("dotenv").config();
const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const morgan = require("morgan");

const DATA_FILE = path.join(__dirname, "data", "data.json");
const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

function loadData() {
  if (!fs.existsSync(DATA_FILE)) {
    const init = { ideas: {}, history: [] };
    ALPHABET.forEach((l) => (init.ideas[l] = []));
    fs.writeFileSync(DATA_FILE, JSON.stringify(init, null, 2));
  }
  return JSON.parse(fs.readFileSync(DATA_FILE));
}
function saveData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}


// Every 30min, save data in older file (max 10 older files)
function saveOlderData() {
  const data = loadData();
  const now = new Date();
  const dateStr = now.toISOString().split("T")[0];
  const timeStr = now.toTimeString().split(" ")[0].replace(/:/g, "-");
  const olderFileName = path.join(
    __dirname,
    "data",
    "older",
    `data-${dateStr}-${timeStr}.json`
  );
  fs.writeFileSync(olderFileName, JSON.stringify(data, null, 2));
}
const olderDir = path.join(__dirname, "data", "older");

setInterval(() => {
  const now = new Date();
  const minutes = now.getMinutes();
  if (minutes % 30 === 0) {
    if (!fs.existsSync(olderDir)) {
      fs.mkdirSync(olderDir, { recursive: true });
    }

    saveOlderData();
  }
}, 60 * 1000);

if (!fs.existsSync(olderDir)) {
  fs.mkdirSync(olderDir, { recursive: true });
}

saveOlderData();
// Every 24h, delete older files
function deleteOlderFiles() {
  const now = new Date();
  const dateStr = now.toISOString().split("T")[0];
  const olderDir = path.join(__dirname, "data", "older");
  fs.readdir(olderDir, (err, files) => {
    if (err) {
      console.error("Error reading older files directory:", err);
      return;
    }
    files.forEach((file) => {
      const filePath = path.join(olderDir, file);
      fs.stat(filePath, (err, stats) => {
        if (err) {
          console.error("Error getting file stats:", err);
          return;
        }
        const fileDateStr = file.split("-").slice(1, 3).join("-");
        if (fileDateStr !== dateStr) {
          fs.unlink(filePath, (err) => {
            if (err) {
              console.error("Error deleting older file:", err);
            }
            console.log(`Deleted older file: ${filePath}`);
          });
        }
      });
    });
  });
}
setInterval(() => {
  const now = new Date();
  const hours = now.getHours();
  if (hours === 0) {
    deleteOlderFiles();
  }
}, 60 * 60 * 1000);

const app = express();

app.use(morgan("combined"));

// app.use((req, res, next) => {
//   const now = new Date().toISOString();
//   console.log(`[${now}] ${req.method} ${req.originalUrl}`);
//   next();
// });
app.use(cors());
// app.use(
//   cors({
//     origin: "*", // ou liste d’origins autorisés, ex. ['http://localhost:3000']
//     methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//     allowedHeaders: ["Content-Type", "x-site-password"],
//   })
// );

// app.options(
//   "*",
//   cors({
//     origin: "*",
//     methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//     allowedHeaders: ["Content-Type", "x-site-password"],
//   })
// );

app.use(express.json());

// Middleware Auth – toutes les routes sauf /login
app.use((req, res, next) => {
  if (req.path === "/login") return next();
  const pw = req.headers["x-site-password"];
  if (pw === process.env.SITE_PASSWORD) return next();
  res.status(401).json({ error: "Unauthorized" });
});

// Login
app.post("/login", (req, res) => {
  const { password } = req.body;
  if (password === process.env.SITE_PASSWORD) {
    return res.json({ ok: true });
  }
  res.status(401).json({ ok: false });
});

// Idées
app.get("/ideas", (req, res) => {
  const { ideas } = loadData();
  res.json(ideas);
});
app.post("/ideas/:letter", (req, res) => {
  const letter = req.params.letter.toUpperCase();
  const { text } = req.body;
  const data = loadData();
  data.ideas[letter].push({ text, done: false });
  saveData(data);
  res.json(data.ideas[letter]);
});
app.delete("/ideas/:letter/:idx", (req, res) => {
  const { letter, idx } = req.params;
  const i = parseInt(idx, 10);
  const data = loadData();
  data.ideas[letter] = data.ideas[letter].filter((_, j) => j !== i);
  saveData(data);
  res.json(data.ideas[letter]);
});
app.put("/ideas/:letter/:idx/toggle", (req, res) => {
  const { letter, idx } = req.params;
  const i = parseInt(idx, 10);
  const data = loadData();
  data.ideas[letter][i].done = !data.ideas[letter][i].done;
  saveData(data);
  res.json(data.ideas[letter][i]);
});

// Historique
app.get("/history", (req, res) => {
  const { history } = loadData();
  res.json(history);
});
app.post("/history", (req, res) => {
  const entry = req.body; // { letter, idea, date }
  const data = loadData();
  data.history.push({ ...entry, done: false });
  saveData(data);
  res.json(data.history);
});
app.put("/history/:idx/toggle", (req, res) => {
  const idx = +req.params.idx;
  const data = loadData();
  data.history[idx].done = !data.history[idx].done;
  saveData(data);
  res.json(data.history[idx]);
});
app.delete("/history/:idx", (req, res) => {
  const idx = +req.params.idx;
  const data = loadData();
  data.history = data.history.filter((_, i) => i !== idx);
  saveData(data);
  res.json(data.history);
});
app.delete("/history", (req, res) => {
  const data = loadData();
  data.history = [];
  saveData(data);
  res.json(data.history);
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`API listening on port ${PORT}`));
