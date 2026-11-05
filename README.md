# InnovateGram (ઇનોવેટગ્રામ / इनोवेटग्राम)
## AI-Powered Grassroots & Rural Innovation Discovery Platform

**InnovateGram** is a social-impact GovTech platform designed to identify, document, categorize, and connect grassroots innovations developed by rural innovators, farmers, artisans, students, mechanics, and individual creators.

### Project Philosophy
> *"The innovator should not have to understand technology, AI, innovation terminology or complicated forms. The system should understand the innovator."*

---

## 🌟 Core Features & Implementation Highlights

### 1. Trilingual System (English, Hindi, Gujarati)
- Seamless global language switcher in header and contextual language selectors.
- Centralized dictionary in `src/lib/translations.ts` covering navigation, categories, forms, error/success messages, and help.
- Preservation of original rural voice transcripts with trilingual translation tabs.

### 2. Innovator Portal (Mobile-First & Zero-Barrier)
- **Voice-First Submission**: Highly prominent microphone button with live Web Audio / MediaRecorder recording, animated waveform, timer, replay, and retry.
- **Media Capture**: Multiple photograph upload with previews and video recording upload.
- **Location Selector**: Browser GPS detection + fallback State/District/Village manual picker.
- **AI-Powered Extraction**: Categorizes problem, proposed solution, sector, and maturity stage with confidence scores.
- **Voice Readout (TTS)**: Reads generated summaries aloud in selected language before confirmation.
- **No-Paperwork Submission**: No GST, no company registration, no Aadhaar, no business plan.
- **Submission Success Receipt**: Unique Innovation ID (e.g. `IG-2026-001025`), printable receipt, status tracking, and confetti celebration.
- **Offline / Low-Internet Resilience**: LocalStorage queue that automatically saves drafts and syncs when online.

### 3. Stakeholder Enterprise Portal (Desktop-First)
- **Live Metrics Dashboard**: Real database metrics for total innovations, pending reviews, verified records, connection requests, and dynamic sector/stage distributions.
- **Discovery Directory**: Multilingual full-text search (search in English to find Hindi/Gujarati submissions and vice-versa) + filters by state, sector, stage, and verification status.
- **Interactive Geographic Map**: Leaflet + OpenStreetMap of India with custom markers, popups, and preview drawer.
- **Review & Verification Workbench**: Authorized evaluators can inspect media, listen to original recordings, adjust AI classifications, and log official verification notes.
- **Institutional Connection Requests**: Incubation, grant, procurement, or testing requests with rural privacy protection (phone numbers and exact home locations shielded).
- **Saved Innovations & Reports**: Bookmarked dossier with CSV export and printable reports.

### 4. Admin Governance
- Moderation queue, sector ontology management, and accredited regional evaluator access.

### 5. 12 Demonstration Records Seeded
1. Low-cost agricultural weed removal machine – Rajasthan – Hindi (`IG-2026-001001`)
2. Low-pressure gravity drip irrigation kit – Gujarat – Gujarati (`IG-2026-001002`)
3. Solar-powered rural lighting system – Rajasthan – Hindi (`IG-2026-001003`)
4. Low-cost grain sorting machine – Gujarat – Gujarati (`IG-2026-001004`)
5. Affordable healthcare monitoring device – Maharashtra – English (`IG-2026-001005`)
6. Agricultural waste recycling equipment – Punjab – Hindi (`IG-2026-001006`)
7. Rural water filtration innovation – Gujarat – Gujarati (`IG-2026-001007`)
8. Low-cost assistive walking device – Rajasthan – Hindi (`IG-2026-001008`)
9. Solar-powered cold storage concept – Gujarat – English (`IG-2026-001009`)
10. Low-cost farming tool – Madhya Pradesh – Hindi (`IG-2026-001010`)
11. Waste-to-energy prototype – Maharashtra – English (`IG-2026-001011`)
12. Rural education technology solution – Gujarat – Gujarati (`IG-2026-001012`)

---

## 🛠️ Tech Stack
- **Framework**: Next.js 16 + React 19 + TypeScript
- **Styling**: Tailwind CSS v4 with custom GovTech aesthetic palette (`#104C35`, `#176B45`, `#EAF5ED`, `#F8FAF7`)
- **Icons**: Lucide React
- **Maps**: Leaflet + OpenStreetMap
- **Audio & Media**: Web Audio API, MediaRecorder, SpeechSynthesis API
- **Database & Storage**: PostgreSQL schema with Supabase RLS policies (`supabase/schema.sql`)

---

## 🚀 Running the Project
```bash
cd /Users/mac/.gemini/antigravity/scratch/innovategram
npm run dev
# Server runs on http://localhost:3000
```

