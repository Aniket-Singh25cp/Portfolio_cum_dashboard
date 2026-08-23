/**
 * PROJECTS DATA
 * ---------------------------------------------------------------
 * This is the only file you need to edit to add, update, or remove
 * projects from your portfolio. Every entry you add here will
 * automatically show up as a card on the homepage and get its own
 * detail page at /projects/<id>.
 *
 * HOW TO ADD A PROJECT
 * 1. Copy one of the example objects below (or the template at the
 *    bottom of this file) and paste it inside the PROJECTS array.
 * 2. Fill in your project's details.
 * 3. Drop a thumbnail image into projects/images/ and point
 *    "image" at it, e.g. "projects/images/my-project.png".
 *    If you skip this, a placeholder pattern is shown instead.
 * 4. Save the file, commit, and push — Vercel redeploys automatically.
 *
 * FIELD REFERENCE
 * id          - short unique slug used in the URL, e.g. "1" or "chess-ai"
 * title       - project name shown on the card and detail page
 * description - 1-2 sentence summary shown on the card
 * details     - longer write-up shown on the project's own page
 *               (use "\n\n" to separate paragraphs)
 * tags        - array of tech/tools used, e.g. ["Python", "NumPy"]
 * image       - path to a thumbnail, or leave "" for a placeholder
 * github      - link to the repo (leave "" to hide the button)
 * live        - link to a live demo (leave "" to hide the button)
 */

window.PROJECTS = [

  {
    id: "1",
    title: "AI Resume-to-Portfolio Generator",
    description: "Paste a resume, get a live, themeable portfolio site back — powered by Gemini for extraction and a zero-framework HTML/CSS/JS renderer.",
    details: "A tool that turns a plain-text resume into a fully designed portfolio page in seconds. " +
      "The backend sends the resume to Google's Gemini API and asks for a strict JSON schema back " +
      "(skills, experience, projects, education, contact) — never inventing information that isn't " +
      "in the source resume.\n\n" +
      "The frontend renders that JSON into one of four complete visual systems (Vivid, Bold, Editorial, " +
      "Dark) that can be swapped live with no reload, with the theme also auto-inferred from the resume's " +
      "content when not chosen manually. Empty sections are skipped entirely rather than leaving blank " +
      "gaps, and generated content is HTML-escaped before insertion.\n\n" +
      "Deployed as part of this same site — the live app runs at /apps/resume-generator, calling a Python " +
      "serverless function at /api/generate.",
    tags: ["Python", "Gemini API", "Vercel Serverless", "HTML/CSS/JS"],
    image: "./projects/images/resume-generator.png",
    github: "https://github.com/Aniket-Singh25cp/Resume_To_Portfolio_Generator",
    live: "/apps/resume-generator/index.html"
  },

  {
    id: "2",
    title: "VOYX — Sales Performance Dashboard",
    description: "A single-file, real-time analytics dashboard with live KPI cards, a sales leaderboard, destination breakdowns, and CSV export — backed by Supabase.",
    details: "A self-contained sales analytics dashboard built as one dependency-light HTML file: no build " +
      "tools, no framework — just Supabase for data and Chart.js for visualization.\n\n" +
      "It automatically paginates through the full orders and users tables to compute today's performance, " +
      "month-to-date totals, and prior-month comparisons, then surfaces them as KPI cards. A live leaderboard " +
      "ranks sales reps against targets with drill-down detail views, a destinations panel groups orders by " +
      "country, and daily/monthly trends render as spline and cumulative charts. Leaderboards and full order " +
      "records can be exported to CSV in one click.",
    tags: ["JavaScript", "Supabase", "Chart.js", "Data Visualization"],
    image: "./projects/images/voyx-dashboard.png",
    github: "https://github.com/Aniket-Singh25cp/Portfolio_cum_dashboard",
    live: "/apps/voyx-dashboard/index.html"
  },

  // --- remove this template once you've added your own projects ---
  // {
  //   id: "3",
  //   title: "Project Title",
  //   description: "One or two sentences describing what this project does.",
  //   details: "A longer write-up of the project: the problem it solves, " +
  //     "how you built it, and anything you're proud of.\n\n" +
  //     "Add a second paragraph here if you want more detail.",
  //   tags: ["Python", "Pandas"],
  //   image: "projects/images/example.png",
  //   github: "https://github.com/Aniket-Singh25cp/example",
  //   live: ""
  // },

];
