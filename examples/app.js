/**
 * app.js
 * Run:
 * npm install express axios
 * node app.js
 *
 * Requirement:
 * ThesauriUltra running at http://localhost:4000
 * (API endpoints are under /api)
 */

const express = require("express");
const axios = require("axios");
const app = express();
const THESAURI_API = "http://localhost:4000/api";

/* -----------------------------
Mock Search Documents
--------------------------------*/
const DOCUMENTS = [
  { id: 1, title: "Beautiful Night Sky", content: "Stars were twinkling in the night sky" },
  { id: 2, title: "Astronomy Guide", content: "The sky contains many stars" },
  { id: 3, title: "Poetry", content: "Lovely stars sparkle in the dark night" }
];

/* -----------------------------
Pick most likely POS
--------------------------------*/
function choosePOS(pos) {
  if (pos.noun) return "noun";
  if (pos.adj) return "adj";
  if (pos.verb) return "verb";
  if (pos.adv) return "adv";
  return "noun";
}

/* -----------------------------
ThesauriUltra Query Analysis
--------------------------------*/
async function analyzeQuery(query) {
  const words = query.split(/\s+/);
  const analysis = await Promise.all(
    words.map(async (word) => {
      try {
        // POS detection
        const posRes = await axios.get(`${THESAURI_API}/pos/${encodeURIComponent(word)}`);
        const posType = choosePOS(posRes.data.status);

        // Synonym lookup
        const lookupRes = await axios.get(`${THESAURI_API}/lookup/${posType}/${encodeURIComponent(word)}`);
        const synonyms = lookupRes.data.synsets?.flatMap(s => s.synonyms) || [];

        return { word, pos: posType, synonyms };
      } catch {
        return null;
      }
    })
  );

  return analysis.filter(Boolean);
}

/* -----------------------------
Simple Lexical Search
--------------------------------*/
function searchDocuments(analysis) {
  const terms = [...new Set(
    analysis.flatMap(a =>
      a.pos === "noun" ? [a.word] : [a.word, ...a.synonyms]
    )
  )].map(t => t.toLowerCase());

  return DOCUMENTS
    .map(doc => {
      const text = (doc.title + " " + doc.content).toLowerCase();
      let score = 0;
      terms.forEach(term => {
        if (text.includes(term)) score += 2;
      });
      return { ...doc, score };
    })
    .filter(doc => doc.score > 0)
    .sort((a, b) => b.score - a.score);
}

/* -----------------------------
Search API Endpoint
--------------------------------*/
app.get("/search", async (req, res) => {
  const q = req.query.q;
  if (!q) {
    return res.status(400).json({ error: "Missing query parameter q" });
  }

  // 1. Understand query using ThesauriUltra
  const analysis = await analyzeQuery(q);

  // 2. Execute POS-aware search
  const results = searchDocuments(analysis);

  res.json({ query: q, analysis, results });
});

/* -----------------------------
Start Server
--------------------------------*/
app.listen(3000, () => {
  console.log("Search API running at http://localhost:3000/search");
});
