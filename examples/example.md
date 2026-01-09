
# Minimal Node.js Search API using ThesauriUltra

This example demonstrates a **POS-aware lexical search** using ThesauriUltra in Node.js.

- **Nouns** represent search intent  
- **Adjectives** boost ranking  
- **Synonyms** improve recall  

The full **runnable code** is in [`app.js`](./app.js).

---

## How to run

1. Make sure ThesauriUltra is running at `http://localhost:4000`.

2. Install dependencies:

```bash
npm install express axios
````

3. Start the server:

```bash
node app.js
```

4. Test the search API:

```bash
curl "http://localhost:3000/search?q=twinkling stars beautiful night"
```

---

## Code snippet

Here’s a small snippet showing the search endpoint:

```js
app.get("/search", async (req, res) => {
  const q = req.query.q;
  if (!q) return res.status(400).json({ error: "Missing query parameter q" });

  const analysis = await analyzeQuery(q);       // ThesauriUltra query understanding
  const results = searchDocuments(analysis);   // POS-aware lexical search

  res.json({ query: q, analysis, results });
});
```

> For the full implementation with POS detection, synonym lookup, and scoring, see [`app.js`](./app.js).

---

## How it works

* **ThesauriUltra** → POS detection + synonyms
* **Nouns** = intent
* **Adjectives** = ranking boost
* **Synonyms** = recall
* Search engine stays simple and explainable

---

## Why ThesauriUltra is needed in a Search API

* Without ThesauriUltra → search only matches raw strings
* With ThesauriUltra → search understands meaning

It helps because:

* Identifies intent (nouns like `stars`, `night`)
* Improves ranking (adjectives like `beautiful`, `twinkling`)
* Improves recall (synonyms like `sparkling`, `lovely`)
* Keeps search explainable (no black-box embeddings)

---

## Key idea

* **ThesauriUltra** = language understanding layer
* **Search engine** = execution & ranking layer

Even simple lexical search becomes smarter, safer, and predictable when ThesauriUltra is used.


