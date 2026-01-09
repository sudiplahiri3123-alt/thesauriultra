
# Minimal Node.js Search API using ThesauriUltra

This example shows how to build a **POS-aware lexical search** in Node.js using ThesauriUltra.  

Here’s what it does:

- **Nouns** capture the main intent of the query  
- **Adjectives** help boost ranking  
- **Synonyms** improve recall and prevent missed results  

The complete, runnable code is in [`app.js`](./app.js).

---

## Setting up ThesauriUltra

1. Download the latest release from GitHub:  
   [ThesauriUltra Releases](https://github.com/sudiplahiri3123-alt/thesauriultra/releases)  
   Look for `thesauriultra-release-v20251012012101.zip`.

2. Unzip it and make sure the `.env` file is present. If it’s missing, copy the sample: `.env.sample`.

3. From the project root, run:

```bash
cp .env.sample .env
docker compose up --build
````

This will start ThesauriUltra locally.

---

## Running the Node.js Search API

1. Make sure ThesauriUltra is running at `http://localhost:4000`.

2. Install the required dependencies:

```bash
npm install express axios
```

3. Start the server:

```bash
node app.js
```

4. Try out the search API:

```bash
curl "http://localhost:3000/search?q=twinkling stars beautiful night"
```

---

## Quick Code Peek

Here’s a small snippet showing the search endpoint:

```js
app.get("/search", async (req, res) => {
  const q = req.query.q;
  if (!q) return res.status(400).json({ error: "Missing query parameter q" });

  // Use ThesauriUltra to understand the query
  const analysis = await analyzeQuery(q);

  // Perform POS-aware lexical search
  const results = searchDocuments(analysis);

  res.json({ query: q, analysis, results });
});
```

> The full implementation—including POS detection, synonym lookup, and scoring—is in [`app.js`](./app.js).

---

## How it works

* **ThesauriUltra** analyzes the query (POS + synonyms)
* **Nouns** indicate the user’s intent
* **Adjectives** help rank results higher
* **Synonyms** increase recall
* The search engine itself stays simple, predictable, and explainable

---

## Why use ThesauriUltra in a Search API?

Without ThesauriUltra, your search only matches raw strings. With it, your search actually **understands meaning**.

It helps by:

* Identifying intent (e.g., nouns like `stars` and `night`)
* Improving ranking (adjectives like `beautiful` and `twinkling`)
* Improving recall (synonyms like `sparkling` and `lovely`)
* Keeping the search explainable (no black-box AI guesses)

---

## Key idea

* **ThesauriUltra** = the language understanding layer
* **Search engine** = the execution and ranking layer

Even a simple lexical search becomes **smarter, safer, and predictable** when ThesauriUltra is used.




