# 🧠 ThesauriUltra

**ThesauriUltra** is a lightweight NLP microservice for:

- Part-of-speech (POS) tagging  
- Lemmatization  
- Synonym and definition lookup

Powered by Elixir and WordNet, it runs as a high-performance HTTP server on port `4000`, easily accessible from any language via HTTP or Docker.


> ⚡ Drop in ThesauriUltra as a faster, scalable replacement for WordPOS — with native WordNet support and Elixir-powered concurrency.


---

## 🚀 Quickstart

### ✅ Run locally via Docker

```bash
docker compose up --build
```

The app runs at:  
🌐 [http://localhost:4000](http://localhost:4000)

You can access it from:

* Browser  
* Node.js / Python / Shell scripts  
* Any HTTP-capable language

---

## 🔧 Features

* Full support for **WordNet 3.0**
* Fast HTTP API (Elixir + Cowboy server)
* Supports:
  * Part-of-speech tagging
  * Lemmatization
  * Synonyms/definitions lookup
* Ready for:
  * Local use via Docker
  * Production cloud deployment
  * Embedded usage in other services

---

## 📦 Folder Structure (Zip Release)

```
thesauriultra/
├── wordnet_service/         # Precompiled Elixir release
├── run.sh                   # Starts the app
├── stop.sh                  # Stops the app
├── restart.sh               # Restarts the app
├── .env.sample              # Sample environment config
├── Dockerfile               # Runtime container
├── docker-compose.yml       # Compose configuration
```

---

## 🐳 Deployment Options

### ✅ 1. Run as a microservice (Docker)

Download the latest release zip from GitHub, unzip it, and run:

```bash
cp .env.sample .env
docker compose up --build
```

Service will be available at `http://localhost:4000`

---

### ✅ 2. Use inside your existing app (Node.js, Python, etc.)

Run the Docker container locally or in your server, and from your app:

```python
# Example in Python
import requests
res = requests.get("http://localhost:4000/api/pos?text=The quick brown fox")
print(res.json())
```

Works with **Node.js**, **Python**, **Java**, etc.

---

### ✅ 3. Cloud Deployment (Ubuntu, EC2, DigitalOcean, etc.)

```bash
# Install Docker + Compose
sudo apt update
sudo apt install docker docker-compose -y

# Upload thesauriultra.zip and run
unzip thesauriultra.zip
cd thesauriultra
cp .env.sample .env
docker compose up --build -d
```

The app will run on `http://<your-cloud-ip>:4000`

Make sure port **4000** is open in your firewall or cloud provider settings.

---

## 🧪 Example API Usage

Send a GET request to `/api/pos`:

```bash
curl http://localhost:4000/api/pos/twinkle
```

### Response:

```json
{
  "status": {
    "adj": false,
    "adv": false,
    "noun": true,
    "verb": true
  },
  "word": "twinkle"
}

```


Send a GET request to `/api/pos`:

```bash
curl http://localhost:4000/api/pos/beautiful
```

### Response:

```json
{
  "status": {
    "adj": true,
    "adv": false,
    "noun": false,
    "verb": false
  },
  "word": "beautiful"
}


```

# 🧪 Validation Tests with Node.js and Python

You can run validation tests on sentences by querying the POS tags for each word individually.

---

##### Node.js Test Example

Create a file `test.js`:

```js
const axios = require('axios');

const sentence = "Bright stars twinkle in the dark night sky";

async function testPOS(sentence) {
  const words = sentence.split(' ');
  for (const word of words) {
    try {
      const response = await axios.get(`http://localhost:4000/api/pos/${word}`);
      console.log(word, response.data.status);
    } catch (err) {
      console.error(`Error fetching POS for "${word}":`, err.message);
    }
  }
}

testPOS(sentence);
```

Run with:  
```bash
npm install axios
node test.js
```

Sample Output:
```json
Bright { adj: true, adv: true, noun: false, verb: false }
stars { adj: false, adv: false, noun: false, verb: false }
twinkle { adj: false, adv: false, noun: true, verb: true }
in { adj: true, adv: true, noun: true, verb: false }
the { adj: false, adv: false, noun: false, verb: false }
dark { adj: true, adv: false, noun: true, verb: false }
night { adj: false, adv: false, noun: true, verb: false }
sky { adj: false, adv: false, noun: true, verb: true }
```

##### Python Test Example

Create a file test.py:

```python
import requests

sentence = "Bright stars twinkle in the dark night sky"
words = sentence.split()

for word in words:
    try:
        resp = requests.get(f"http://localhost:4000/api/pos/{word}")
        resp.raise_for_status()
        data = resp.json()
        print(f"{word} {data.get('status')}")
    except requests.RequestException as e:
        print(f"Error fetching POS for '{word}': {e}")
```

Run with:
```bash
pip install requests
python test.py
```

Sample Output:

```json
Bright {'adj': True, 'adv': True, 'noun': False, 'verb': False}
stars {'adj': False, 'adv': False, 'noun': False, 'verb': False}
twinkle {'adj': False, 'adv': False, 'noun': True, 'verb': True}
in {'adj': True, 'adv': True, 'noun': True, 'verb': False}
the {'adj': False, 'adv': False, 'noun': False, 'verb': False}
dark {'adj': True, 'adv': False, 'noun': True, 'verb': False}
night {'adj': False, 'adv': False, 'noun': True, 'verb': False}
sky {'adj': False, 'adv': False, 'noun': True, 'verb': True}
```

Additional Example Sentence for Testing

#### Try the sentence:
###### Happy children played joyfully in the sunny park

Node.js output example:

```json
Happy   { adj: true,  adv: false, noun: false, verb: false }  
children { adj: false, adv: false, noun: false, verb: false }  
played  { adj: true,  adv: false, noun: false, verb: false }  
joyfully { adj: false, adv: true,  noun: false, verb: false }  
in      { adj: true,  adv: true,  noun: true,  verb: false }  
the     { adj: false, adv: false, noun: false, verb: false }  
sunny   { adj: true,  adv: false, noun: false, verb: false }  
park    { adj: false, adv: false, noun: true,  verb: true  }  
```

#### Enhancing Search Functionality with the ThesauriUltra API

The **ThesauriUltra API** empowers developers to build advanced search-related features by leveraging natural language processing techniques:

- ***POS-based Filtering***  
  Refine search results by filtering based on part-of-speech tags — for example, retrieving only `nouns` or `verbs` relevant to the query.

- ***Synonym Expansion***  
  Broaden search coverage by expanding queries with `synonyms`, increasing the chance of matching relevant documents or items.

- ***Lemmatization***  
  Normalize words to their base or dictionary form before indexing or querying, improving search accuracy by handling different word variants.

- ***Keyword Classification***  
  Gain deeper understanding of user intent by classifying keywords, enabling more precise query interpretation and tailored responses.

Using `ThesauriUltra` in your search stack enhances semantic understanding and delivers richer, more relevant search experiences.


Key NLP Capabilities of ThesauriUltra

1. ***Part-of-Speech Detection***  
   Accurately identify the grammatical category of each word to enable syntactic analysis and context-aware processing.

2. ***Synonym Retrieval***  
   Access comprehensive synonym sets to support semantic expansion and improve recall in search and NLP applications.

3. ***Query Normalization via Lemmatization***  
   Normalize search queries to their base forms (lemmas) ensuring consistent matching across different word inflections and variants.


##### Sample Node.js Test Script: Using the API

File: `test_search_helper.js`

This script demonstrates how to interact with the ThesauriUltra API to perform search-related tests.

```js
const axios = require("axios");

const API_BASE = "http://localhost:4000/api";

// Input query (user’s search input)
const searchQuery = "twinkling stars in the beautiful night sky";

// Split into words
const words = searchQuery.split(" ");

// Store processed results
const results = [];

async function analyzeWord(word) {
  try {
    const posRes = await axios.get(`${API_BASE}/pos/${encodeURIComponent(word)}`);
    const lookupRes = await axios.get(`${API_BASE}/lookup/${getLikelyPOS(posRes.data.status)}/${encodeURIComponent(word)}`);

    return {
      word,
      pos: posRes.data.status,
      synonyms: lookupRes.data.synsets?.flatMap(s => s.synonyms).filter(Boolean) || [],
    };
  } catch (err) {
    return { word, error: true };
  }
}

// Helper to choose likely POS (noun > verb > adj > adv)
function getLikelyPOS(posObj) {
  if (posObj.noun) return "noun";
  if (posObj.verb) return "verb";
  if (posObj.adj) return "adj";
  if (posObj.adv) return "adv";
  return "noun"; // default
}

async function main() {
  for (const word of words) {
    const data = await analyzeWord(word);
    results.push(data);
  }

  console.log("🔍 Search Analysis:");
  results.forEach(({ word, pos, synonyms, error }) => {
    if (error) {
      console.log(`${word}: ❌ Error`);
    } else {
      console.log(`${word}:`);
      console.log("  POS:", pos);
      console.log("  Synonyms:", synonyms.join(", ") || "None");
    }
  });
}

main();
```
🧪 Output Example (for "twinkling stars in the beautiful night sky"):

```json
🔍 Search Analysis:
twinkling:
  POS: { adj: false, adv: false, noun: false, verb: false }
  Synonyms: None
stars:
  POS: { adj: false, adv: false, noun: true, verb: false }
  Synonyms: star, celestial_body, ...
in:
  POS: { adj: true, adv: true, noun: true, verb: false }
  Synonyms: None
the:
  POS: { adj: false, adv: false, noun: false, verb: false }
  Synonyms: None
beautiful:
  POS: { adj: true, adv: false, noun: false, verb: false }
  Synonyms: gorgeous, lovely, attractive, ...
night:
  POS: { adj: false, adv: false, noun: true, verb: false }
  Synonyms: nighttime, dark
sky:
  POS: { adj: false, adv: false, noun: true, verb: true }
  Synonyms: heavens, firmament


```

##### `How this helps in search:`

- `Keyword filtering:` Only keep nouns for indexing, or verbs for action detection.  
- `Synonym expansion:` Search for synonyms too — e.g., `"beautiful"` → `"gorgeous"`, `"lovely"`  
- `Normalizing input:` Use lemmas (base forms) for consistent matching.  
- `Intent understanding:` Classify whether the query is about actions, objects, feelings, etc.


---

## ⚙️ Configuration

ThesauriUltra runs with built-in production configuration:

* Listens on `0.0.0.0:4000`
* Can run in containers or cloud VMs
* Accepts `.env` variables for future use

---

## 🔐 Security Notes

* `check_origin: false` by default for localhost and embedded usage.
* In production behind a proxy (like Nginx), consider configuring TLS termination and origin checking.

---

## 🛠 Development / Customization

ThesauriUltra is a precompiled Elixir release.

To modify the code:

* Recompile the Elixir app using Mix releases
* Update the `/wordnet_service` folder
* Rebuild the Docker image

---

## 📥 Download

Get the latest pre-built version here:  
👉 [https://github.com/sudiplahiri3123-alt/thesauriultra/releases]

---

## 📄 License

MIT License  
Copyright © 2025  
**Maintained by `sudtechno_master`**

