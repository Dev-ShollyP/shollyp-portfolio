# Olushola Shotayo (Sholly P) — AI Automation & AI Video Builder Portfolio

A premier, production-grade portfolio designed with **Google Antigravity**, **Apple Fluid Design**, and **Glassmorphism**.

Built with the exact color system provided:
- **Imperial Blue**: `#021F94` (Brand anchor, primary buttons, gradients, glowing badges)
- **White Convolvulus**: `#F5F2F3` (Soft surface contrast, pill chips, and secondary buttons)
- **Pure White**: `#FFFFFF` (Theme canvas, frosted glass card surfaces)

---

## 🚀 Key Highlights & Architectural Features

1. **Effortless Antigravity Motion & Physics**:
   - Interactive Canvas 2D Particle Simulation reacting to pointer velocity with spring physics.
   - Variable Google Sans Flex + JetBrains Mono typography.
   - Dynamic Typewriter Header with dynamic tracked blinking cursor.
   - Sinusoidal floating tool ribbon carrying tech badges (`n8n`, `Meta WhatsApp Cloud API`, `Supabase (RLS)`, `Vapi Voice AI`, `Airtable`, `Tally`, `Gmail API`, `Twilio`, etc.).

2. **Apple Fluidity & Tactile Feedback**:
   - Translucent glass chrome with `backdrop-filter: blur(20px) saturate(180%)`.
   - Crisp 1px luminous borders (`border-top: 1px solid rgba(255, 255, 255, 0.9)`).
   - Instant touch/click feedback with micro-scale compression (`:active { transform: scale(0.97); }`).
   - Deep dive spring modals for video walkthroughs and zoomable workflow screenshots.

3. **Organized & Readable Structure (Tejiri-Inspired Discipline)**:
   - Scannable case studies with **The Need**, **The Solution**, **Key Deliverables**, and **Tech Stack**.
   - Interactive project filtering (`All Work`, `AI Automations`, `AI Video`, `Architecture`).
   - Dedicated **System Architecture** breakdown highlighting **deterministic code intercepts for facts** to eliminate LLM hallucinations.
   - **What I Have Learned** bento grid reflecting real-world API engineering lessons.
   - Curated **Community Insights on X** featuring the 5 official X posts with direct links.
   - High-conversion contact banner with one-click WhatsApp link (`https://wa.me/2348083708357`), direct Gmail dispatch, and one-click clipboard copying.

---

## 📂 Project Directory Structure

```
Portfolio/
├── index.html                   # Core semantic markup & layout
├── style.css                    # Design tokens & glassmorphism system
├── app.js                       # Physics simulation, typewriter, modals & interactions
├── data.js                      # Centralized data store for projects, videos & tweets
├── server.js                    # Zero-dependency local server with video range streaming
├── Profile Photo.jpg            # High-res profile image
├── certificate-7333.pdf         # TS Academy graduation certificate
├── Elev8.mp4                    # Elev8 Fitness Hub video demo
├── Gym Spec.mp4                 # Alternate gym workflow walkthrough
├── The Transformer.mp4          # 'The Transformers' youth convention video
├── Adeolu.mp4                   # African postgraduate academic model video
├── Email Classification.mp4     # Email triage engine video walkthrough
├── March Super Sunday.mp4       # Video asset
├── Shekere Sunday.mp4           # Video asset
├── PAS AD.mp4                   # Video asset
├── RYCC.mp4                     # Video asset
├── Gym Workflow/                # n8n canvas & Airtable screenshots
├── Mama Tee_s Kitchen/          # Vapi assistant & n8n 4-branch canvas screenshots
└── Email Classification/        # n8n canvas & routing screenshots
```

---

## ⚡ How to Run Locally

### Option 1: Zero-Dependency Local Server (Recommended for Smooth Video Streaming)
In your terminal, run:
```bash
node server.js
```
Then visit [http://localhost:3000](http://localhost:3000) in your browser.

### Option 2: Direct File Open
You can also directly double-click [index.html](file:///c:/Users/Olushola/Desktop/Portfolio/index.html) to open it in your default web browser.

---

## 🌐 100% Free Hosting (Vercel + Supabase)

### Architecture
- **Frontend**: Hosted free on **Vercel** with global CDN, automatic SSL (`https://your-name.vercel.app`), and zero-config deployment.
- **Videos**: Hosted free on **Supabase Storage** (1GB storage + 5GB bandwidth/month free tier) to bypass GitHub's 100MB file limit.

### Step 1: Upload Videos to Supabase Storage (Free)
1. Go to [supabase.com](https://supabase.com) and create a free account/project.
2. In the left navigation, click **Storage** → **New bucket**.
3. Name it `portfolio-videos` and turn **Public bucket** ON.
4. Upload your 3 videos:
   - `PAS AD.mp4`
   - `DP.mp4`
   - `The Transformer.mp4`
5. Copy the public bucket URL (e.g. `https://<your-project>.supabase.co/storage/v1/object/public/portfolio-videos`).
6. In `data.js`, paste this URL into line 10:
   ```javascript
   const SUPABASE_STORAGE_BASE = "https://<your-project>.supabase.co/storage/v1/object/public/portfolio-videos";
   ```

### Step 2: Deploy Frontend to Vercel (Free)

#### Method A: Via GitHub (Recommended for automatic continuous deployment)
1. Commit your code and push to a new GitHub repository:
   ```bash
   git add .
   git commit -m "feat: portfolio ready for free hosting"
   git branch -M main
   git remote add origin https://github.com/<your-username>/portfolio.git
   git push -u origin main
   ```
2. Go to [vercel.com](https://vercel.com) and log in.
3. Click **Add New** → **Project**, select your `portfolio` repository, and click **Deploy**.
4. Your site will be live instantly with a free `https://your-project.vercel.app` URL.

#### Method B: Via Vercel CLI (No GitHub required)
Run this command in the project directory:
```bash
npx vercel
```
Follow the terminal prompts (choose your free Vercel account, accept default settings), and your site will be deployed in seconds.

---

© 2026 Olushola Shotayo (Sholly P). All rights reserved.
