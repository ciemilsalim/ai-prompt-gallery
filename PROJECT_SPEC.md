# Project Overview: AI Prompt Gallery & Affiliate Hub

## 1. Goal
Platform katalog mobile-first kurasi prompt AI video dengan pratinjau bergerak, fitur 1-klik copy prompt, dan sistem tracking link affiliate. Disiapkan untuk menerima traffic media sosial (TikTok, Reels, Shorts) serta ingest data otomatis dari bot generator di masa depan.

## 2. Database Schema

### `ai_tools`
- `id`: unsignedBigInteger, PK
- `name`: string (e.g., "Higgsfield AI", "Kling AI", "OpenRouter")
- `slug`: string, unique
- `affiliate_url`: string
- `logo_url`: string, nullable
- `description`: text, nullable
- `is_active`: boolean, default true
- `timestamps`

### `categories`
- `id`: unsignedBigInteger, PK
- `name`: string (e.g., "Cinematic Film", "3D Animation", "Commercial")
- `slug`: string, unique
- `timestamps`

### `prompts`
- `id`: unsignedBigInteger, PK
- `ai_tool_id`: foreignId constrained to `ai_tools` on delete cascade
- `category_id`: foreignId constrained to `categories` on delete cascade
- `title`: string
- `slug`: string, unique
- `prompt_text`: text
- `negative_prompt`: text, nullable
- `model_version`: string, nullable
- `aspect_ratio`: string, default "9:16"
- `preview_video_url`: string
- `preview_thumbnail_url`: string, nullable
- `custom_affiliate_url`: string, nullable
- `views_count`: unsignedInteger, default 0
- `copies_count`: unsignedInteger, default 0
- `clicks_count`: unsignedInteger, default 0
- `is_published`: boolean, default true
- `timestamps`

## 3. Key Routes & Controller Logic
- Web Routes:
  - `GET /`: Menampilkan katalog prompt (dengan filter query string `?category=` dan `?tool=`, pagination, atau infinite scroll).
  - `GET /r/{prompt_slug}`: Route redirect affiliate. Controller mencatat `increment('clicks_count')` pada prompt terkait, lalu mengarahkan pengunjung (`302 redirect`) ke URL affiliate asli.
  - `POST /api/track-copy/{id}`: Endpoint ringan untuk mencatat penambahan `copies_count`.
- Automation API Routes (Protected by `X-BOT-TOKEN`):
  - `POST /api/v1/prompts`: Endpoint ingest data otomatis untuk bot Antigravity/Python.