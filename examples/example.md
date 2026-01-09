
# Minimal Node.js Search API using ThesauriUltra

This example demonstrates a **POS-aware lexical search** using ThesauriUltra in Node.js.

- Nouns represent search intent  
- Adjectives boost ranking  
- Synonyms improve recall  

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
