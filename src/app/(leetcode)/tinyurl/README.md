# Leetcode: 535.Encode and Decode TinyURL

## Description

>**Note: This is a companion problem to the [System Design](https://leetcode.com/discuss/interview-question/system-design/) problem: [Design TinyURL](https://leetcode.com/discuss/interview-question/124658/Design-a-URL-Shortener-(-TinyURL-)-System/).**

TinyURL is a URL shortening service where you enter a URL such as `https://leetcode.com/problems/design-tinyurl` and it returns a short URL such as `http://tinyurl.com/4e9iAk`. Design a class to encode a URL and decode a tiny URL.

There is no restriction on how your encode/decode algorithm should work. You just need to ensure that a URL can be encoded to a tiny URL and the tiny URL can be decoded to the original URL.

Implement the `Solution` class:

- `Solution()` Initializes the object of the system.
- `String encode(String longUrl)` Returns a tiny URL for the given longUrl.
- `String decode(String shortUrl)` Returns the original long URL for the given shortUrl. It is guaranteed that the given shortUrl was encoded by the same object.


## Example

**Input:** `url = "https://leetcode.com/problems/design-tinyurl"`

**Output:** `"https://leetcode.com/problems/design-tinyurl"`

**Explanation:**
```javascript
Solution obj = new Solution();
string tiny = obj.encode(url); // returns the encoded tiny url
string ans = obj.decode(tiny); // returns the original url after decoding it
```

## Constraints

- `1 <= url.length <= 104`
- `url` is guaranteed to be a valid URL

**Source:** [LeetCode Problem 535](https://leetcode.com/problems/encode-and-decode-tinyurl)

## 🛠 Tech Stack

- **Frontend**: React with TypeScript
- **Styling**: CSS Modules + Tailwind CSS
- **Backend**: Next.js API Routes
- **Data Storage**: JSON file (simulating database)
- **Encoding**: Base62 algorithm

## 🚀 How to Run

1. Start the development server: `npm run dev`
2. Navigate to: `http://localhost:3000/(leetcode)/tinyurl`

## 💡 Solution Approach

### Implementation Choice

While the original LeetCode problem requires implementing a `Solution` class with `encode()` and `decode()` methods, this implementation demonstrates a **full-stack approach** to showcase:

- **Real-world application design** with user interface
- **RESTful API architecture** using Next.js API routes
- **Data persistence** with JSON storage (simulating database)
- **Modern web development practices** with React and TypeScript

This approach better reflects production-ready URL shortening services and demonstrates broader engineering skills beyond algorithmic problem-solving.

### Algorithm: Base62 Encoding
- Uses characters: `0-9`, `a-z`, `A-Z` (62 total characters)
- Each URL gets a unique ID that's encoded to Base62
- Short URLs follow format: `http://tinyurl.com/{base62Id}`

### Data Storage
- **Production approach**: Database with auto-incrementing IDs
- **Current implementation**: JSON file with in-memory counter simulation
- **Schema**: `{ id, shortUrl, longUrl, createdAt }`

## 🎯 Implementation Details

### Frontend Features
- Input field for URL entry
- **Encode** button to shorten URLs
- **Decode** button to expand short URLs
- Result display with copy functionality
- Error handling for invalid URLs/codes

### Backend API
- `POST /api/tinyurl` - Encode long URL to short URL
- `GET /api/tinyurl?code={shortCode}` - Decode short URL to original
- Comprehensive error handling and validation

### Key Components
- **URL validation** using built-in URL constructor
- **Base62 encoder/decoder** utility functions
- **Persistent storage** via JSON file operations
- **RESTful API** design following Next.js conventions