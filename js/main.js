document.addEventListener("DOMContentLoaded", () => {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  initHeader();
  initMobileMenu();
  initScrollspy();
  initBackToTop();
  initTerminalTyping();
  initThemeToggle();
  initTiltCards();
  initHeroSpotlight();
  initMagneticButtons();
  initHeroParticles();

  if (typeof window.renderProjectsGrid === "function") window.renderProjectsGrid();
  if (typeof window.renderProjectDetail === "function" && document.getElementById("project-content")) {
    window.renderProjectDetail();
  }

  observeReveals();
});

/* ---------------- dark / light theme toggle ---------------- */
function initThemeToggle() {
  const root = document.documentElement;
  const stored = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const initial = stored || (prefersDark ? "dark" : "light");
  root.setAttribute("data-theme", initial);

  document.querySelectorAll("[data-theme-toggle]").forEach(btn => {
    btn.addEventListener("click", () => {
      const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      localStorage.setItem("theme", next);
    });
  });
}

/* ---------------- 3D tilt on cards ---------------- */
function initTiltCards() {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReducedMotion) return;
  if (window.matchMedia("(hover: none)").matches) return; // skip on touch devices

  const cards = document.querySelectorAll(".project-card, .about-card");
  cards.forEach(card => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;  // 0..1
      const py = (e.clientY - rect.top) / rect.height;  // 0..1
      const rx = (px - 0.5) * 8;  // rotateY
      const ry = (0.5 - py) * -8; // rotateX
      card.style.setProperty("--rx", `${rx}deg`);
      card.style.setProperty("--ry", `${ry}deg`);
      card.style.setProperty("--ty", `-5px`);
    });
    card.addEventListener("mouseleave", () => {
      card.style.setProperty("--rx", `0deg`);
      card.style.setProperty("--ry", `0deg`);
      card.style.setProperty("--ty", `0px`);
    });
  });
}

/* ---------------- cursor-follow glow in hero ---------------- */
function initHeroSpotlight() {
  const hero = document.querySelector(".hero");
  if (!hero) return;
  if (window.matchMedia("(hover: none)").matches) return;

  hero.addEventListener("mousemove", (e) => {
    const rect = hero.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    hero.style.setProperty("--spot-x", `${x}%`);
    hero.style.setProperty("--spot-y", `${y}%`);
  });
}

/* ---------------- magnetic glow-follow on buttons ---------------- */
function initMagneticButtons() {
  if (window.matchMedia("(hover: none)").matches) return;
  document.querySelectorAll(".btn").forEach(btn => {
    btn.addEventListener("mousemove", (e) => {
      const rect = btn.getBoundingClientRect();
      const mx = ((e.clientX - rect.left) / rect.width) * 100;
      const my = ((e.clientY - rect.top) / rect.height) * 100;
      btn.style.setProperty("--mx", `${mx}%`);
      btn.style.setProperty("--my", `${my}%`);
    });
  });
}

/* ---------------- floating particles in hero ---------------- */
function initHeroParticles() {
  const hero = document.querySelector(".hero");
  if (!hero) return;
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReducedMotion) return;

  const wrap = document.createElement("div");
  wrap.className = "hero-particles";
  wrap.setAttribute("aria-hidden", "true");

  const count = window.innerWidth < 700 ? 10 : 22;
  for (let i = 0; i < count; i++) {
    const dot = document.createElement("span");
    const left = Math.random() * 100;
    const delay = Math.random() * 10;
    const duration = 10 + Math.random() * 8;
    const bottom = Math.random() * 40;
    dot.style.left = `${left}%`;
    dot.style.bottom = `${bottom}px`;
    dot.style.animationDelay = `${delay}s`;
    dot.style.animationDuration = `${duration}s`;
    wrap.appendChild(dot);
  }
  hero.prepend(wrap);
}

/* ---------------- header shadow on scroll ---------------- */
function initHeader() {
  const header = document.getElementById("site-header");
  if (!header) return;
  const onScroll = () => {
    header.classList.toggle("scrolled", window.scrollY > 8);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

/* ---------------- mobile menu ---------------- */
function initMobileMenu() {
  const toggle = document.getElementById("menu-toggle");
  const menu = document.getElementById("mobile-menu");
  if (!toggle || !menu) return;

  const close = () => {
    menu.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  };

  toggle.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  menu.querySelectorAll("a").forEach(a => a.addEventListener("click", close));
}

/* ---------------- scrollspy for nav links ---------------- */
function initScrollspy() {
  const links = document.querySelectorAll("[data-nav]");
  if (!links.length) return;

  const sections = Array.from(links)
    .map(link => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  if (!sections.length) return;

  const setActive = (id) => {
    links.forEach(link => {
      link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
    });
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) setActive(entry.target.id);
    });
  }, { rootMargin: "-45% 0px -50% 0px", threshold: 0 });

  sections.forEach(section => observer.observe(section));
}

/* ---------------- back to top button ---------------- */
function initBackToTop() {
  const btn = document.getElementById("to-top");
  if (!btn) return;

  window.addEventListener("scroll", () => {
    btn.classList.toggle("visible", window.scrollY > 600);
  }, { passive: true });

  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

/* ---------------- scroll reveal ---------------- */
function observeReveals() {
  const targets = document.querySelectorAll(".reveal:not(.in-view)");
  if (!targets.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add("in-view"), i * 40);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  targets.forEach(t => observer.observe(t));
}

/* ---------------- hero terminal typing effect ---------------- */
function initTerminalTyping() {
  const el = document.getElementById("terminal-body");
  if (!el) return;

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const lines = [
    { prompt: "$ ", text: "whoami", type: "cmd" },
    { text: "aniket-kumar-singh", type: "out" },
    { text: "", type: "blank" },
    { prompt: "$ ", text: "cat interests.txt", type: "cmd" },
    { text: "machine learning", type: "out" },
    { text: "competitive programming", type: "out" },
    { text: "building things", type: "out" },
    { text: "", type: "blank" },
    { prompt: "$ ", text: "status", type: "cmd" },
    { text: "> Accepted", type: "ac" },
  ];

  if (prefersReducedMotion) {
    el.innerHTML = lines.map(renderStaticLine).join("\n");
    return;
  }

  let lineIndex = 0;
  let charIndex = 0;
  let built = "";

  function renderStaticLine(line) {
    if (line.type === "blank") return "";
    if (line.type === "cmd") return `<span class="prompt">${line.prompt}</span>${line.text}`;
    if (line.type === "ac") return `<span class="comment">${line.text.replace("Accepted", "")}</span><span class="ac" style="background:transparent;padding:0;">Accepted</span>`;
    return line.text;
  }

  function typeNext() {
    if (lineIndex >= lines.length) {
      el.innerHTML = built + `<span class="terminal-cursor"></span>`;
      return;
    }

    const line = lines[lineIndex];

    if (line.type === "blank") {
      built += "\n";
      lineIndex++;
      el.innerHTML = built + `<span class="terminal-cursor"></span>`;
      setTimeout(typeNext, 120);
      return;
    }

    if (charIndex === 0 && line.type === "cmd") {
      built += `<span class="prompt">${line.prompt}</span>`;
    }

    if (charIndex < line.text.length) {
      built += line.text[charIndex];
      charIndex++;
      el.innerHTML = built + `<span class="terminal-cursor"></span>`;
      setTimeout(typeNext, line.type === "cmd" ? 34 : 14);
    } else {
      built += "\n";
      charIndex = 0;
      lineIndex++;
      el.innerHTML = built + `<span class="terminal-cursor"></span>`;
      setTimeout(typeNext, line.type === "cmd" ? 260 : 90);
    }
  }

  typeNext();
}
