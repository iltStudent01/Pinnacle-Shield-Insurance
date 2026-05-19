# Pinnacle Shield Insurance — Demo Speaker Notes (15–20 min)

## 1) Demo Goal (30 sec)
**Say:**
“Today I’ll walk through our insurance website MVP: a quick navigation demo across key pages, then a high-level code overview and next steps.”

---

## 2) Agenda & Timing
- **Intro:** 1–2 min
- **Live navigation demo:** 8–10 min
- **High-level code overview:** 4–5 min
- **Wrap-up + Q&A:** 2–3 min

---

## 3) Live Navigation Script (Page-by-Page)

### A. Home (`index.html`) — 2–3 min
**Show:** Hero section, key messaging, navigation links.

**Say:**
- “This page is the main entry point and communicates our core value proposition.”
- “Navigation is intentionally simple so users can reach company info, FAQs, or quote flow quickly.”
- “Primary CTA guides users toward quote conversion.”

### B. About (`about.html`) — 1–2 min
**Show:** Company/trust narrative.

**Say:**
- “This page builds trust by explaining who we are and what we offer.”
- “It supports decision-making before users submit quote details.”

### C. FAQ (`faq.html`) — 1–2 min
**Show:** Frequently asked questions and answers.

**Say:**
- “FAQ reduces friction by addressing common concerns upfront.”
- “This helps users self-serve information and continue to quote confidently.”

### D. Quote (`quote.html`) — 3–4 min
**Show:** Form fields, required information, submit behavior.

**Say:**
- “This is the core conversion page where users provide quote details.”
- “The form flow is straightforward and focused on clarity.”
- “Client-side logic supports user interaction and improves overall input experience.”

### E. End-to-end flow recap — 30 sec
**Say:**
“User journey is: discover on Home → build trust via About/FAQ → complete action on Quote.”

---

## 4) High-Level Code Overview (Manager-Friendly)

### Project structure
- Multi-page static site with separate HTML pages by purpose.
- Shared styling for visual consistency.
- JavaScript split for shared behavior and quote-specific logic.

### Key files to mention
- `index.html`, `about.html`, `faq.html`, `quote.html` (page-level content)
- `css/styles.css` (shared visual styling)
- `js/main.js` (general site behavior)
- `js/quote.js` (quote form interactions)

### Architecture summary
**Say:**
- “The codebase is separated by responsibility—content, style, and behavior.”
- “This makes the project easier to maintain and safer to extend.”
- “Because it’s static and lightweight, deployment is straightforward via GitHub Pages.”

---

## 5) Deployment / Review Readiness (30–45 sec)
**Say:**
- “The repository is available for code review.”
- “The live site is published via GitHub Pages for navigation testing.”
- “Team can validate both implementation and user experience from shared links.”

---

## 6) Suggested Next Steps (if asked)
- Accessibility pass (labels, keyboard flow, contrast checks).
- UX polish from stakeholder feedback.
- Add basic analytics events on quote interactions.
- Expand validation and edge-case handling on quote form.

---

## 7) Q&A Backup Answers

**Q: Why this architecture?**
A: “It’s simple, maintainable, and ideal for an MVP that needs quick deployment and easy review.”

**Q: How easy is it to scale?**
A: “Current separation of pages/scripts/styles gives us a clean base to add more products or richer quote flows.”

**Q: What would you improve first?**
A: “Accessibility and form validation depth, then iterative UX improvements from user feedback.”

---

## 8) Pre-Demo Checklist (run 10 min before meeting)
- Open all pages in separate tabs in demo order.
- Confirm navigation links work across all pages.
- Test quote form once end-to-end.
- Keep repo URL and live site URL ready to paste in chat.
- Keep this note open during presentation.
