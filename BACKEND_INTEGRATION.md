# Backend Integration Guide

> This document is for the backend developer who will connect the frontend to a real API.
> The frontend is designed so that **zero changes to components or pages** are needed — only the API service layer files need updating.

---

## Architecture Overview

```
┌─────────────────────────────────────────────────┐
│                   React App                      │
│                                                  │
│  Pages ──► Custom Hooks ──► API Services ──►    │
│                                  │               │
│                           ┌──────┴───────┐       │
│                           │ data/*.json  │ NOW   │
│                           │ REST API     │ LATER │
│                           └──────────────┘       │
└─────────────────────────────────────────────────┘
```

**Key principle:** Pages only call hooks. Hooks only call API service functions. API service functions currently return local JSON but are structured to swap to `fetch()` calls with a single-line change per endpoint.

---

## Step-by-Step Migration

### Step 1: Set the API Base URL

Open `src/api/client.js` and update:

```diff
- const BASE_URL = '';
+ const BASE_URL = 'https://api.gkgnotary.co.uk'; // or your API domain
```

That's it — the client already has full `fetch()` logic that activates when `BASE_URL` is non-empty.

### Step 2: Verify endpoint paths match

Open `src/api/services.js` and ensure each function's endpoint path matches your API routes:

| Frontend Function | Expected Endpoint | Method |
|---|---|---|
| `getServices()` | `GET /api/services` | GET |
| `getFees()` | `GET /api/fees` | GET |
| `getAbout()` | `GET /api/about` | GET |
| `getLocations()` | `GET /api/locations` | GET |
| `getTestimonials()` | `GET /api/testimonials` | GET |
| `submitContact(data)` | `POST /api/contact` | POST |
| `requestQuote(data)` | `POST /api/quote` | POST |

### Step 3: Remove local data imports (optional cleanup)

Once the API is live, you can remove the local JSON imports from `src/api/services.js` and the `src/data/` directory entirely. They're only used as fallback when `BASE_URL` is empty.

---

## API Response Schemas

Below are the **exact shapes** the frontend expects. Your API responses must match these structures.

### GET /api/services

```json
[
  {
    "id": "notarisation",
    "number": "01",
    "title": "Notarisation",
    "shortDescription": "Official authentication of documents...",
    "fullDescription": "Our notarisation service provides...",
    "features": [
      "Document verification and authentication",
      "Witness to signatures and oaths"
    ],
    "icon": "stamp"
  }
]
```

**Notes:**
- `icon` is a string key mapped to a Lucide icon on the frontend. Valid values: `stamp`, `globe`, `building`, `shield-check`, `file-key`, `scale`, `pen-tool`, `landmark`
- Array of service objects, ordered as they should appear

### GET /api/fees

```json
{
  "pricing": {
    "baseRate": {
      "amount": 80,
      "vatRate": 20,
      "vatAmount": 16,
      "total": 96,
      "currency": "GBP",
      "per": "per document/signature"
    },
    "notes": ["VAT is charged...", "Complex matters may..."]
  },
  "packages": [
    {
      "id": "standard",
      "name": "Standard Document",
      "description": "Single document notarisation...",
      "price": 80,
      "total": 96,
      "features": ["Single document authentication", "..."],
      "popular": false
    }
  ]
}
```

**Notes:**
- `popular: true` on exactly one package highlights it visually
- `price` is ex-VAT, `total` is inc-VAT
- `notes` array renders as an info list below the pricing cards

### GET /api/about

```json
{
  "notary": {
    "name": "Gopal Krishan Gupta",
    "title": "Notary Public",
    "honorific": "M.B.E.",
    "yearsExperience": 41,
    "established": 1983,
    "bio": "...",
    "extendedBio": "...",
    "personalNote": "...",
    "mbeDetails": "...",
    "phone": "07958083458"
  },
  "milestones": [
    { "year": "1983", "event": "Established notary practice in London" }
  ]
}
```

### GET /api/locations

```json
{
  "locations": [
    {
      "id": "kentish-town",
      "name": "Kentish Town Office",
      "isPrimary": true,
      "address": {
        "line1": "59 Leighton Road",
        "area": "Kentish Town",
        "city": "London",
        "postcode": "NW5 2QH"
      },
      "nearestStation": "Kentish Town",
      "walkTime": "5 min walk",
      "transportType": "Tube Station",
      "coordinates": { "lat": 51.5505, "lng": -0.1404 }
    }
  ],
  "contactInfo": {
    "phone": "07958083458",
    "email": "info@gkgnotary.co.uk",
    "website": "www.gkgnotary.co.uk"
  }
}
```

**Notes:**
- `coordinates` will be used for embedded maps in a future iteration
- `isPrimary: true` renders a "Primary Office" badge

### GET /api/testimonials

```json
[
  {
    "id": 1,
    "name": "Sarah Mitchell",
    "role": "Property Developer",
    "quote": "Gopal handled all our...",
    "rating": 5
  }
]
```

### POST /api/contact

**Request body:**
```json
{
  "name": "John Smith",
  "email": "john@example.com",
  "phone": "07123456789",
  "service": "notarisation",
  "message": "I need help with..."
}
```

**Expected response:**
```json
{
  "success": true,
  "message": "Submission received",
  "id": 12345
}
```

**Validation (handled on frontend via Zod):**
- `name`: required, min 2 chars
- `email`: required, valid email format
- `phone`: optional
- `service`: optional, one of: `notarisation`, `legalisation`, `company-docs`, `identity-verification`, `power-of-attorney`, `affidavits`, `other`
- `message`: required, min 10 chars

### POST /api/quote

**Request body:**
```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "phone": "07123456789",
  "serviceType": "corporate",
  "details": "We need 5 documents notarised for..."
}
```

**Expected response:** Same shape as `/api/contact`

### POST /api/remote-notary

**Request body (`multipart/form-data`):**
This endpoint receives file uploads. The frontend sends a `FormData` object containing:
- `firstName` (string)
- `lastName` (string)
- `email` (string)
- `phone` (string)
- `serviceType` (string)
- `instructions` (string)
- `documents` (File[] - multiple files allowed, up to 10MB each)

**Expected response:**
```json
{
  "success": true,
  "message": "Submission received",
  "id": 12345
}
```

**Submission Flow:**
1. Backend receives the multipart data and uploads documents securely (e.g., S3).
2. Backend creates a notification/ticket for the notary team to review the submission.
3. Backend returns a success response.
4. The frontend displays the success state to the user.

---

## Error Handling

The frontend `client.js` throws on non-2xx responses. Your API should return:

```json
{
  "error": true,
  "message": "Human-readable error description",
  "code": "VALIDATION_ERROR"
}
```

HTTP status codes the frontend handles:
- `400` — Validation errors (displayed to user)
- `401` — Unauthorized (future: redirect to login)
- `404` — Not found
- `500` — Server error (generic message shown)

---

## Authentication (Future)

The `client.js` is structured to add auth headers easily:

```javascript
// In client.js, add to the fetch options:
const headers = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${getToken()}`, // Add when auth is implemented
};
```

---

## CORS Configuration

Your backend must allow requests from the frontend origin:

```
Access-Control-Allow-Origin: https://www.gkgnotary.co.uk
Access-Control-Allow-Methods: GET, POST, OPTIONS
Access-Control-Allow-Headers: Content-Type, Authorization
```

---

## Recommended Backend Stack

This frontend is framework-agnostic for the backend. Recommended options:

- **Node.js + Express** — Fastest to integrate, same language as frontend
- **Python + FastAPI** — Excellent for typed API development
- **Go + Gin** — High performance, great for production

---

## File Reference

| File | Purpose |
|---|---|
| `src/api/client.js` | HTTP client wrapper — **update BASE_URL here** |
| `src/api/services.js` | Endpoint functions — **verify paths match your API** |
| `src/data/*.json` | Placeholder data — **can be deleted after API is live** |
| `src/hooks/index.js` | Data-fetching hooks — **no changes needed** |
