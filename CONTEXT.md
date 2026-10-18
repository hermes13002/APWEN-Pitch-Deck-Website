# APWEN-LASU Career Summit 2.0 — Pitch Competition
## Master Project Context & Architecture Documentation (`CONTEXT.md`)

*Last Updated: October 2026*  
*Version: 2.0.0*

---

## 1. Executive Summary & Event Overview

The **APWEN-LASU Career Summit 2.0 Pitch Competition** is the premier annual student innovation and pitch event organized by the **Association of Professional Women Engineers of Nigeria (APWEN)**, Lagos State University (LASU) Chapter.

The platform challenges ambitious LASU students across all engineering disciplines and interdisciplinary backgrounds to develop real-world, tech-enabled solutions addressing pressing challenges across Africa.

### Core Event Metadata
- **Event Title**: APWEN-LASU Career Summit 2.0 — Pitch Competition
- **Official Theme**: *"Building Engineers For Impact, Wealth & Innovation"*
- **Slogans / Taglines**: 
  - *"Where Ideas Meet Opportunities"*
  - *"Innovation • Problem-Solving • Entrepreneurship • Impact"*
  - *"Ideas. Innovation. Impact."*
- **Main Summit Date**: **Friday, 27 November 2026**
- **Venue**: Lagos State University (LASU) Epe Campus, Lagos State, Nigeria
- **Registration Period**: **19 October – 6 November 2026**
- **Participation Cost**: 100% Free
- **Team Eligibility**: Teams of 2 to 4 LASU students (interdisciplinary collaboration actively encouraged)

---

## 2. Competition Milestones & Confirmed Timeline

The competition is structured into four sequential, clearly defined phases:

```
[ Phase 1: Registration & Initial Submission ]
  Dates: 19 October – 6 November 2026
  Action: Teams register via in-app form, get onboarded to WhatsApp Cohort, polish 5-min deck.
        ↓
[ Phase 2: Screening & Shortlisting ]
  Dates: 7 – 12 November 2026
  Action: Organizing team & technical reviewers screen entries for eligibility, feasibility, and alignment.
        ↓
[ Phase 3: Virtual Pre-Finals ]
  Date: 13 November 2026
  Action: Virtual panel of expert judges evaluates shortlisted teams to select finalists.
        ↓
[ Phase 4: Grand Finale & Career Summit 2.0 ]
  Date: Friday, 27 November 2026
  Action: Live pitch presentations, 100-point uniform scoring, awards, and networking at LASU Epe.
```

---

## 3. The 5 Solution-Focused Tracks

Instead of grouping students strictly by their engineering departments, the competition categorizes ideas into five cross-cutting solution tracks (derived from the official *2026 Judges' Brochure*):

| Track | Focus Scope | Key Solution Areas |
| :--- | :--- | :--- |
| **1. Technology & AI** | Digital tools & intelligence | AI & Machine Learning, Mobile & Web Apps, Cybersecurity, Robotics & Automation, ICT, EdTech. |
| **2. Health & Life Sciences** | Wellbeing & medical access | HealthTech, Women's Health, Mental Wellbeing, Healthcare Accessibility, Assistive Tech, Community Health. |
| **3. Business, Finance & Entrepreneurship** | Commerce & financial inclusion | FinTech, Financial Inclusion, SME Management Solutions, E-Commerce, Student Finance, Innovative Business Models. |
| **4. Engineering, Sustainability & Climate** | Green energy & circular economy | Renewable Energy, Waste Management, Climate Solutions, Sustainable Agriculture, Clean Water, Energy Efficiency. |
| **5. Social Innovation & Community Development** | Societal impact & inclusion | Quality Education, Youth Development, Gender Inclusion, Public Safety, Community Development. |

---

## 4. Pitch Format & 100-Point Uniform Scoring Matrix

### Pitch Timing Rules
- **Pitch Presentation**: 5 Minutes
- **Judges' Q&A**: 3 Minutes
- **Total Time Allocation**: 8 Minutes per team

### The 8 Elements of a Strong Pitch
1. **The Problem**: What specific, validated problem is being solved?
2. **The Target User**: Who experiences this pain point, and who are the direct beneficiaries?
3. **The Solution**: What is the proposed innovation, and how does it work?
4. **Innovation**: What makes this approach novel, defensible, or meaningfully superior?
5. **Sustainability / Business Model**: How will this operate, monetize, or sustain funding over time?
6. **Feasibility**: Realistic technical execution, skills, resources, and risk mitigations.
7. **Potential Impact**: Measurable social, economic, environmental, or technological value.
8. **Scalability**: Ability to expand beyond the initial cohort or geographical location.

### Official 100-Point Scoring Rubric
| Criterion | Max Score | Key Evaluation Questions |
| :--- | :---: | :--- |
| **Problem Identification & Relevance** | **15** | Is the problem clearly defined and validated with evidence? Does the team understand those affected? |
| **Innovation & Creativity** | **15** | Is the approach original? Does it improve upon existing solutions with creative thinking? |
| **Solution / Technical Approach** | **15** | Is the technical approach sound, appropriate, and clearly explained? |
| **Target Users & Market Understanding** | **10** | Does the team deeply understand user personas, demographics, and market demand? |
| **Business / Sustainability Model** | **15** | How will operations, revenue, or funding be maintained sustainably after launch? |
| **Feasibility** | **10** | Can it realistically be built with available skills, infrastructure, and resources? |
| **Scalability** | **10** | Can the model scale to more users, wider regions, or diverse contexts? |
| **Potential Impact** | **5** | What is the net social, economic, or environmental benefit? |
| **Pitch Delivery & Q&A** | **5** | Clarity, presentation poise, time management, and mastery during Q&A. |
| **TOTAL** | **100** | Standardized across all 5 tracks. |

---

## 5. Architectural Decisions & Key Workflows

### Decision A: Native In-App Registration vs. External Forms
- **The Problem**: Redirecting students away to an external Google Form causes 30–40% drop-off, breaks brand continuity, and prevents custom post-registration workflows.
- **The Solution**: A branded in-app registration modal/screen.
- **Benefits**:
  - Zero server hosting maintenance or SQL database provisioning.
  - Native loading states, field validations, and immediate feedback.
  - Immediate handoff to the WhatsApp cohort without losing the applicant.

### Decision B: Serverless Data Pipeline via Google Apps Script
- The frontend fires a direct `POST` request to a deployed **Google Apps Script Web App Endpoint**.
- The script receives the JSON payload and writes a new row to an organizer-managed Google Sheet in real-time.
- Organizers, committee members, and judges have immediate spreadsheet access to filter, score, and export to Excel/CSV without custom admin dashboards.

### Decision C: Stateful Draft Recovery (`localStorage`)
- University campus mobile networks are prone to intermittent disconnects.
- Form inputs are cached in real time inside `localStorage` under `apwen_registration_draft`.
- If a user refreshes or accidentally closes their browser tab, their progress is instantly restored.
- Draft data is cleared only upon successful submission confirmation.

### Decision D: Direct WhatsApp Cohort Onboarding
- Upon submission, the screen transitions to a dedicated **Success State**:
  1. Displays team confirmation badge.
  2. Outlines immediate next steps (slide deck template access, milestone deadlines).
  3. Provides a prominent direct button: `Join Official WhatsApp Cohort`.

### Decision E: External Pitch Guide via Google Drive
- The "Download Pitch Guide" CTAs throughout the site link directly to an authorized Google Drive folder containing the official PDF guidelines, slide templates, and rubric.

---

## 6. Technical Stack & Codebase Structure

```
APWEN Pitch Deck Website/
├── docs/
│   └── LASU_Career_Summit_2026_Judges_Brochure.pdf   # Source document for 2026 edition
├── CONTEXT.md                                        # Master context & specifications
└── project/                                          # Frontend Application Root
    ├── CONTEXT.md                                    # Local mirror of context & specs
    ├── index.html                                    # HTML shell with Google Fonts & meta
    ├── package.json                                  # React 18, Vite, Tailwind, Three/Vanta
    ├── tailwind.config.js                            # Custom theme colors, dark mode
    ├── public/                                       # Logos, event imagery, assets
    └── src/
        ├── App.tsx                                   # Root layout & section composition
        ├── main.tsx                                  # React DOM entrypoint
        ├── index.css                                 # Design tokens, custom animations, typography
        ├── hooks/
        │   └── useScrollAnimations.ts                # IntersectionObserver scroll reveal hooks
        └── components/
            ├── Header.tsx                            # Sticky navbar with blurred backdrop
            ├── HeroSection.tsx                       # 3D Vanta.js NET particle hero + CTAs
            ├── AboutSection.tsx                      # Summit mission, pillars & background
            ├── WhyItMattersSection.tsx               # The 5 Solution-Focused Tracks
            ├── WhoCanParticipate.tsx                 # Eligibility & 4-step onboarding flow
            ├── TimelineSection.tsx                   # Interactive 4-stage milestone timeline
            ├── JudgingCriteriaSection.tsx            # 100-point uniform rubric breakdown
            ├── RegistrationModal.tsx                 # Stateful in-app registration workflow
            ├── EventGallery.tsx                      # Event photo highlights & lightbox
            ├── FaqSection.tsx                        # Accordion FAQ
            ├── ContactSection.tsx                    # Contact info & LASU Epe map embed
            └── Footer.tsx                            # APWEN chapter info & social links
```

---

## 7. Google Apps Script Web App Template

To link the in-app registration to Google Sheets, create a Google Sheet, open **Extensions > Apps Script**, paste this code, and deploy as a **Web App** (accessible to *Anyone*):

```javascript
function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    var doc = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = doc.getSheetByName("Registrations") || doc.getActiveSheet();
    
    // Auto-create header row if sheet is empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Timestamp",
        "Team Name",
        "Track",
        "Project Title",
        "Summary",
        "Lead Name",
        "Lead Email",
        "Lead Phone / WhatsApp",
        "Lead Department",
        "Lead Level",
        "Member 2 Name",
        "Member 2 Email",
        "Member 2 Dept",
        "Member 2 Level",
        "Member 3 Name",
        "Member 3 Email",
        "Member 3 Dept",
        "Member 3 Level",
        "Member 4 Name",
        "Member 4 Email",
        "Member 4 Dept",
        "Member 4 Level",
        "Deck Link"
      ]);
    }

    var data = JSON.parse(e.postData.contents);
    var m = data.members || [];

    sheet.appendRow([
      new Date().toISOString(),
      data.teamName || "",
      data.track || "",
      data.projectTitle || "",
      data.summary || "",
      data.leadName || "",
      data.leadEmail || "",
      data.leadPhone || "",
      data.leadDept || "",
      data.leadLevel || "",
      m[0] ? m[0].name : "",
      m[0] ? m[0].email : "",
      m[0] ? m[0].dept : "",
      m[0] ? m[0].level : "",
      m[1] ? m[1].name : "",
      m[1] ? m[1].email : "",
      m[1] ? m[1].dept : "",
      m[1] ? m[1].level : "",
      m[2] ? m[2].name : "",
      m[2] ? m[2].email : "",
      m[2] ? m[2].dept : "",
      m[2] ? m[2].level : "",
      data.deckLink || ""
    ]);

    return ContentService.createTextOutput(
      JSON.stringify({ result: "success" })
    ).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(
      JSON.stringify({ result: "error", message: error.toString() })
    ).setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}
```

---

## 8. Configuration Constants

All third-party URLs and environment settings are maintained in a central configuration module (`src/config/constants.ts`):

| Variable | Description | Current Value / Status |
| :--- | :--- | :--- |
| `REGISTRATION_API_URL` | Apps Script Web App endpoint | `https://script.google.com/macros/s/AKfycby.../exec` *(Placeholder)* |
| `WHATSAPP_COMMUNITY_URL` | Direct invite link for registered cohort | `https://chat.whatsapp.com/GBtp0oHLWrPAY3AH47YI4B?s=cl&p=a&mlu=4&ilr=4` *(Live)* |
| `PITCH_GUIDE_DRIVE_URL` | Google Drive link for pitch deck guide & template | `https://drive.google.com/drive/folders/1RBu_yvnFR0QdVTZKPMxxtDJUC_XS2Tqd?usp=drive_link` *(Active)* |
| `REGISTRATION_OPEN_DATE` | Opening date timestamp | `2026-10-19T00:00:00+01:00` |
| `REGISTRATION_CLOSE_DATE`| Closing date timestamp | `2026-11-06T23:59:59+01:00` |
| `SUMMIT_DATE` | Career Summit 2.0 Finale timestamp | `2026-11-27T09:00:00+01:00` |

---

## 9. Recent Design Decisions (Summit 2.0 Refinements)
1. **Hero Section (Option 1 Selected)**: Clean left-aligned typography, high breathing room, interactive Vanta 3D particle net background. Cluttering chips, extra badges, and stock visuals removed.
2. **About Section (Custom Sketch Architecture & Scroll Choreography)**: Outer enclosing container box removed:
   - **Top Row**: Left card (*About APWEN & APWEN LASU*) slides in smoothly from the left. Once it lands, the glowing start node activates, and the curved dashed connector line traces across diagonally. The Right card (*About Career Summit 2.0*) slides in from the right meeting the end node in a balanced framing.
   - **Bottom Row**: The 3 Core Pillars (*Practical Problem-Solving*, *Inter-Collegiate Sisterhood*, *Student Leadership & Pitching*) feature expanded horizontal spacing (`max-w-6xl xl:max-w-7xl` with `gap-8 md:gap-10 lg:gap-12 xl:gap-14`) and enter from below with a staggered sequential cascade into their descending staircase positions.
3. **Who Can Participate & Team Gender Rule**: Open to undergraduate students from LASU and visiting collegiate sister chapters across any department. Every team must have female representation — no all-male teams permitted.
4. **Scoring Rubric Carousel**: Auto-sliding continuous marquee with soft left and right gradient edge fades, pausing on hover. PDF download text button removed.
5. **Solar Iconography**: Entire site migrated to the Solar Icon system (`@iconify/react`).
6. **Mobile Navbar**: Full-screen blur backdrop activates upon opening the mobile drawer.
7. **Global Dark Glassmorphism Design System**: Replaced flat opaque card fills (`bg-gray-900/90`) with a multi-layer frosted glass system:
   - **Background Texture & Refraction**: Global engineering dot-matrix grid (`.bg-dot-grid`) and soft, luminous ambient color orbs (pink, purple, cyan, amber) in `App.tsx` and across sections to provide optical refraction material.
   - **Glass Tokens**: `.glass-card` (translucent base `rgba(15, 23, 42, 0.45)`, `backdrop-blur-20px`, top specular highlight `border-t-white/22`, and inset rim reflection `inset 0 1px 0 0 rgba(255,255,255,0.12)`) and `.glass-panel` for major containers, maintaining WCAG contrast while achieving an Apple/Vercel-tier finish.
8. **Timeline Section (Directional Scroll Choreography & Progressive Line Draw)**:
   - **Progressive Laser Center Line**: Runs from top to bottom with a glowing pink pulse tracer dot at the leading head.
   - **Alternating Directional Cards**: Phase 1 (left side) enters from the left $\rightarrow$ center line draws to Phase 2 $\rightarrow$ Phase 2 (right side) enters from the right $\rightarrow$ line continues to Phase 3 $\rightarrow$ Phase 3 enters from the left $\rightarrow$ line reaches Phase 4 $\rightarrow$ Phase 4 enters from the right.
   - **Center Node Reveal**: Milestone icon badges scale up sequentially right as the progressive line reaches each node.
   - **Triumphant Finale CTA**: "Register Your Team" button rises up from the bottom with a luminous shadow glow immediately following Phase 4.
9. **Viewport Trigger & Choreography Pacing Synchronization**:
   - **Negative `rootMargin` Guard (`rootMargin: "0px 0px -160px 0px"` / `-140px`)**: Fixed premature animation firing. Previously, the browser fired the observer the moment 15-20% of a tall section touched the bottom edge of the window while the cards were still off-screen below the fold. Now, both About cards and Timeline cards wait until they are genuinely scrolled 140–160px inside the visible viewport before initiating.
   - **Relaxed, Synchronous Timeline Tempo**: Extended laser line transition to 4100ms and spaced cards across ~1.4s intervals (Phase 1 @ 200ms, Phase 2 @ 1600ms, Phase 3 @ 3000ms, Phase 4 @ 4300ms, CTA @ 5100ms, with `duration-800` transitions) so the line travels in exact sync with each node and card landing, avoiding rushed or premature sequences.

---

*This document serves as the single source of truth for all human developers and AI agents working on the APWEN LASU Career Summit platform.*
