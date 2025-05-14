const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

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

const app = express();
app.use(cors());
app.use(express.json());

// GET all ideas
app.get("/ideas", (req, res) => {
  const { ideas } = loadData();
  res.json(ideas);
});

// POST add idea
app.post("/ideas/:letter", (req, res) => {
  const letter = req.params.letter.toUpperCase();
  const text = req.body.text;
  const data = loadData();
  data.ideas[letter].push({ text, done: false });
  saveData(data);
  res.json(data.ideas[letter]);
});

// DELETE idea by index
app.delete("/ideas/:letter/:idx", (req, res) => {
  const { letter, idx } = req.params;
  const i = parseInt(idx, 10);
  const data = loadData();
  data.ideas[letter] = data.ideas[letter].filter((_, j) => j !== i);
  saveData(data);
  res.json(data.ideas[letter]);
});

// PUT toggle done
app.put("/ideas/:letter/:idx/toggle", (req, res) => {
  const { letter, idx } = req.params;
  const i = parseInt(idx, 10);
  const data = loadData();
  const item = data.ideas[letter][i];
  item.done = !item.done;
  saveData(data);
  res.json(item);
});

// GET history
app.get("/history", (req, res) => {
  const { history } = loadData();
  res.json(history);
});

// POST history entry
app.post("/history", (req, res) => {
  const entry = req.body; // { letter, idea, date }
  const data = loadData();
  data.history.push({ ...entry, done: false });
  saveData(data);
  res.json(data.history);
});

// PUT toggle history
app.put("/history/:idx/toggle", (req, res) => {
  const idx = parseInt(req.params.idx, 10);
  const data = loadData();
  data.history[idx].done = !data.history[idx].done;
  saveData(data);
  res.json(data.history[idx]);
});

// DELETE history entry
app.delete("/history/:idx", (req, res) => {
  const idx = parseInt(req.params.idx, 10);
  const data = loadData();
  data.history = data.history.filter((_, i) => i !== idx);
  saveData(data);
  res.json(data.history);
});

// DELETE all history
app.delete("/history", (req, res) => {
  const data = loadData();
  data.history = [];
  saveData(data);
  res.json([]);
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
