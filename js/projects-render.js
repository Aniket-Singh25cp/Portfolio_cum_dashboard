/**
 * Renders the projects grid on the homepage and the individual
 * project detail page. Reads data from js/projects-data.js.
 */

function escapeHTML(str) {
  const div = document.createElement("div");
  div.textContent = str ?? "";
  return div.innerHTML;
}

function projectThumbMarkup(project) {
  if (project.image) {
    return `<img src="${escapeHTML(project.image)}" alt="${escapeHTML(project.title)} thumbnail" loading="lazy">`;
  }
  return `<div class="project-thumb-fallback">// no preview</div>`;
}

function renderProjectsGrid() {
  const grid = document.getElementById("projects-grid");
  if (!grid) return;

  if (!window.PROJECTS || PROJECTS.length === 0) {
    grid.innerHTML = `
      <div class="projects-empty">
        <p>Projects are being added — in the meantime, check out
        <a href="https://github.com/Aniket-Singh25cp" target="_blank" rel="noopener">my GitHub</a>.</p>
      </div>`;
    return;
  }

  grid.innerHTML = PROJECTS.map(project => `
    <a class="project-card reveal" href="project.html?id=${encodeURIComponent(project.id)}">
      <div class="project-thumb">${projectThumbMarkup(project)}</div>
      <div class="project-body">
        <h3>${escapeHTML(project.title)}</h3>
        <p>${escapeHTML(project.description)}</p>
        <div class="project-tags">
          ${(project.tags || []).map(t => `<span>${escapeHTML(t)}</span>`).join("")}
        </div>
        <div class="project-link-row">
          <span>View project</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M7 17L17 7M17 7H8M17 7V16" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </div>
      </div>
    </a>
  `).join("");

  observeReveals();
}

function getProjectIdFromURL() {
  // Supports clean /projects/:id (via vercel.json rewrite) and
  // /project.html?id=:id or /project?id=:id (cleanUrls strips .html) as a fallback.
  const path = window.location.pathname.replace(/\/+$/, "");
  const match = path.match(/\/projects\/([^/]+)$/);
  if (match) return decodeURIComponent(match[1]);

  const params = new URLSearchParams(window.location.search);
  return params.get("id");
}

function renderProjectDetail() {
  const container = document.getElementById("project-content");
  if (!container) return;

  const id = getProjectIdFromURL();
  const project = (window.PROJECTS || []).find(p => String(p.id) === String(id));

  if (!project) {
    container.innerHTML = `
      <div class="project-not-found">
        <h1>Project not found</h1>
        <p style="color:var(--text-secondary); margin: 10px 0 22px;">This project doesn't exist yet or may have been moved.</p>
        <a href="index.html#projects" class="btn btn-primary">Back to projects</a>
      </div>`;
    return;
  }

  document.title = `${project.title} — Aniket Kumar Singh`;

  const paragraphs = (project.details || project.description || "")
    .split("\n\n")
    .map(p => `<p>${escapeHTML(p)}</p>`)
    .join("");

  container.innerHTML = `
    <div class="project-detail-header reveal">
      <h1>${escapeHTML(project.title)}</h1>
      <div class="project-detail-tags">
        ${(project.tags || []).map(t => `<span>${escapeHTML(t)}</span>`).join("")}
      </div>
      <div class="project-detail-links">
        ${project.github ? `<a class="btn btn-primary" href="${escapeHTML(project.github)}" target="_blank" rel="noopener">View code</a>` : ""}
        ${project.live ? `<a class="btn btn-ghost" href="${escapeHTML(project.live)}" target="_blank" rel="noopener">Live demo</a>` : ""}
      </div>
    </div>

    ${project.image ? `
    <div class="project-detail-image reveal">
      <img src="${escapeHTML(project.image)}" alt="${escapeHTML(project.title)} preview">
    </div>` : ""}

    <div class="project-detail-body reveal">
      ${paragraphs}
    </div>
  `;

  observeReveals();
}

// exposed for main.js to call once the DOM is ready
window.renderProjectsGrid = renderProjectsGrid;
window.renderProjectDetail = renderProjectDetail;
