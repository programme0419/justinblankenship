/**
 * Node-flow portfolio interactions.
 * Renders profile, stage nodes, panels, certificate strip, and modals.
 */

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

const state = {
  stage: "overview",
  role: null,
};

/** Fills the left profile column. */
function renderProfile() {
  $("#profile-tagline").textContent = PROFILE.tagline;

  $("#stats").innerHTML = PROFILE.stats
    .map(
      (stat) => `
        <div>
          <dt>${stat.value}</dt>
          <dd>${stat.label}</dd>
        </div>
      `,
    )
    .join("");

  $("#profile-links").innerHTML = `
    <li><span>${PROFILE.location}</span></li>
    <li><a href="${PROFILE.phoneHref}">${PROFILE.phoneDisplay}</a></li>
    <li><a href="mailto:${PROFILE.email}">${PROFILE.email}</a></li>
    <li>
      <a href="${PROFILE.linkedin}" target="_blank" rel="noreferrer">
        LinkedIn profile
      </a>
    </li>
  `;
}

/** Draws the five stage nodes. */
function renderNodes() {
  $("#flow-nodes").innerHTML = STAGES.map(
    (stage) => `
      <button
        type="button"
        class="node"
        id="node-${stage.id}"
        data-stage="${stage.id}"
      >
        <span class="node-num">${stage.num}</span>
        <span class="node-label">${stage.label}</span>
        <span class="node-hint">${stage.hint}</span>
      </button>
    `,
  ).join("");

  $$("#flow-nodes .node").forEach((node) => {
    node.addEventListener("click", () => selectStage(node.dataset.stage));
  });
}

/** Connects node centers with a light accent line. */
function renderFlowLine() {
  const svg = $("#flow-line");
  const flow = $("#flow");
  if (!svg || !flow) {
    return;
  }

  const box = flow.getBoundingClientRect();
  svg.setAttribute("viewBox", `0 0 ${box.width} ${box.height}`);
  svg.innerHTML = "";

  if (window.matchMedia("(width < 1080px)").matches) {
    return;
  }

  const accent = getComputedStyle(document.documentElement)
    .getPropertyValue("--accent-line")
    .trim();

  STAGES.slice(0, -1).forEach((stage, index) => {
    const a = $(`#node-${stage.id}`)?.getBoundingClientRect();
    const b = $(`#node-${STAGES[index + 1].id}`)?.getBoundingClientRect();
    if (!a || !b) {
      return;
    }

    const line = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "line",
    );
    line.setAttribute("x1", String(a.right - box.left));
    line.setAttribute("x2", String(b.left - box.left));
    line.setAttribute("y1", String(a.top + a.height / 2 - box.top));
    line.setAttribute("y2", String(b.top + b.height / 2 - box.top));
    line.setAttribute("stroke", accent);
    line.setAttribute("stroke-width", "2.5");
    svg.appendChild(line);
  });
}

/** Activates a stage and renders its panel. */
function selectStage(id, role = null) {
  state.stage = id;
  state.role = role;
  $$("#flow-nodes .node").forEach((node) => {
    node.classList.toggle("is-active", node.dataset.stage === id);
  });
  renderPanel();
}

function panelShell(title, sub, body) {
  return `
    <div class="panel-head">
      <div>
        <h2 class="panel-title">${title}</h2>
        <p class="panel-sub">${sub}</p>
      </div>
      <button type="button" class="btn btn-sm" data-open-cover>
        Read cover letter
      </button>
    </div>
    <div class="panel-body">${body}</div>
  `;
}

function overviewPanel() {
  const cards = HIGHLIGHTS.map(
    (item) => `
      <div class="card">
        <p class="card-title">${item.title}</p>
        <p class="card-body">${item.body}</p>
      </div>
    `,
  ).join("");

  return panelShell(
    "Overview",
    `${PROFILE.title} · ${PROFILE.credentials}`,
    `
      <p class="lead">
        More than a decade translating clinical documentation into precise
        ICD-10-CM, CPT, and HCPCS assignments across hospital systems,
        physician groups, and healthcare technology environments.
      </p>
      <div class="grid-4">${cards}</div>
      <div class="cta-row">
        <button type="button" class="btn btn-primary" data-open-cover>
          Cover letter
        </button>
        <a class="btn" href="${PROFILE.resumeHref}" download>
          Download resume
        </a>
      </div>
    `,
  );
}

function careerPanel() {
  const items = ROLES.map(
    (role) => `
      <button type="button" class="tl-item" data-role="${role.id}">
        <span class="tl-date">${role.dates}</span>
        <span>
          <span class="tl-employer">${role.employer}</span>
          <span class="tl-role">${role.title}</span>
        </span>
        <span class="tl-open">View</span>
      </button>
    `,
  ).join("");

  return panelShell(
    "Career",
    "5 organizations · 2016 — 2026",
    `
      <p class="lead">
        Hospital systems, physician organizations, and healthcare technology.
        Select a role to read the detail.
      </p>
      <div class="timeline">${items}</div>
      <div class="grid-2">
        <div class="card">
          <p class="card-title">Education</p>
          <p class="card-body">
            ${EDUCATION.school} · ${EDUCATION.dates}
          </p>
        </div>
        <div class="card">
          <p class="card-title">Certifications</p>
          <p class="card-body">
            AHIMA CCS (2025) · AAPC CPC-A (2024)
          </p>
        </div>
      </div>
    `,
  );
}

function rolePanel(id) {
  const role = ROLES.find((item) => item.id === id);
  const tags = role.tags
    .map((tag) => `<span class="tag">${tag}</span>`)
    .join("");

  return panelShell(
    role.employer,
    `${role.title} · ${role.fullDates}`,
    `
      <button type="button" class="back" data-back>← All roles</button>
      <p class="lead">${role.setting}</p>
      <div class="tags">${tags}</div>
      <ul class="detail-list">
        ${role.points.map((point) => `<li>${point}</li>`).join("")}
      </ul>
    `,
  );
}

function skillsPanel() {
  const groups = SKILL_GROUPS.map(
    (group) => `
      <div class="card">
        <p class="card-title">${group.group}</p>
        <ul class="card-list">
          ${group.items.map((item) => `<li>${item}</li>`).join("")}
        </ul>
      </div>
    `,
  ).join("");

  return panelShell(
    "Coding",
    "ICD-10-CM · CPT · HCPCS Level II · HCC",
    `
      <p class="lead">
        Core competencies applied across inpatient, outpatient, and
        risk-adjustment work.
      </p>
      <div class="grid-4">${groups}</div>
    `,
  );
}

function certsPanel() {
  const cards = CERTS.map(
    (cert) => `
      <div class="card">
        <p class="card-title">${cert.short} · ${cert.issuer}</p>
        <p class="card-body">${cert.name}</p>
        <ul class="card-list">
          <li>Issued ${cert.issued}</li>
          <li>${cert.valid}</li>
          <li>${cert.number}</li>
        </ul>
      </div>
    `,
  ).join("");

  return panelShell(
    "Credentials",
    "AHIMA · AAPC",
    `
      <p class="lead">
        Both certificates are shown in the stream below. Click either one to
        view the full document.
      </p>
      <div class="grid-2">${cards}</div>
    `,
  );
}

function contactPanel() {
  return panelShell(
    "Contact",
    `${PROFILE.location} · available for senior coding roles`,
    `
      <p class="lead">
        Reach out for senior coding, auditing, or risk-adjustment work.
      </p>
      <div class="contact-grid">
        <a href="${PROFILE.phoneHref}">
          <p class="contact-label">Phone</p>
          <p class="contact-value">${PROFILE.phoneDisplay}</p>
        </a>
        <a href="mailto:${PROFILE.email}">
          <p class="contact-label">Email</p>
          <p class="contact-value">${PROFILE.email}</p>
        </a>
        <a href="${PROFILE.linkedin}" target="_blank" rel="noreferrer">
          <p class="contact-label">LinkedIn</p>
          <p class="contact-value">justin-b-62a62a438</p>
        </a>
      </div>
      <div class="cta-row">
        <button type="button" class="btn btn-primary" data-open-cover>
          Cover letter
        </button>
        <a class="btn" href="${PROFILE.resumeHref}" download>
          Download resume
        </a>
      </div>
    `,
  );
}

/** Renders the active panel and wires its buttons. */
function renderPanel() {
  const panel = $("#panel");

  if (state.role) {
    panel.innerHTML = rolePanel(state.role);
  } else if (state.stage === "career") {
    panel.innerHTML = careerPanel();
  } else if (state.stage === "skills") {
    panel.innerHTML = skillsPanel();
  } else if (state.stage === "certs") {
    panel.innerHTML = certsPanel();
  } else if (state.stage === "contact") {
    panel.innerHTML = contactPanel();
  } else {
    panel.innerHTML = overviewPanel();
  }

  $$("[data-role]", panel).forEach((btn) => {
    btn.addEventListener("click", () => {
      state.role = btn.dataset.role;
      renderPanel();
    });
  });

  $("[data-back]", panel)?.addEventListener("click", () => {
    state.role = null;
    renderPanel();
  });

  $$("[data-open-cover]", panel).forEach((btn) => {
    btn.addEventListener("click", openCover);
  });
}

/** Builds the looping certificate strip. */
function renderStrip() {
  const track = $("#strip-track");
  const cards = [...CERTS, ...CERTS, ...CERTS, ...CERTS, ...CERTS, ...CERTS]
    .map(
      (cert) => `
        <button type="button" class="cert" data-cert="${cert.id}">
          <img src="${cert.image}" alt="${cert.name} certificate">
          <span>
            <span class="cert-short">${cert.short} · ${cert.issuer}</span>
            <span class="cert-name">${cert.name}</span>
            <span class="cert-date">${cert.issued}</span>
          </span>
        </button>
      `,
    )
    .join("");

  track.innerHTML = cards;
  $$(".cert", track).forEach((card) => {
    card.addEventListener("click", () => openCert(card.dataset.cert));
  });
}

function renderCover() {
  $("#cover-body").innerHTML = `
    <h2 id="cover-title">${PROFILE.name}</h2>
    <p class="sheet-meta">
      ${PROFILE.location} · ${PROFILE.phoneDisplay} · ${PROFILE.email}
    </p>
    <p class="sheet-subject">RE: ${COVER_LETTER.subject}</p>
    <div class="letter">
      <p>${COVER_LETTER.greeting}</p>
      ${COVER_LETTER.paragraphs.map((p) => `<p>${p}</p>`).join("")}
      <p>${COVER_LETTER.closing}</p>
    </div>
    <p class="sign">${PROFILE.name}</p>
  `;
}

function openCover() {
  $("#cover-layer").hidden = false;
}

function closeCover() {
  $("#cover-layer").hidden = true;
}

function openCert(id) {
  const cert = CERTS.find((item) => item.id === id);
  $("#light-img").src = cert.image;
  $("#light-img").alt = `${cert.name} certificate`;
  $("#light-cap").textContent =
    `${cert.issuer} · ${cert.name} · ${cert.issued}`;
  $("#lightbox").hidden = false;
}

function closeLight() {
  $("#lightbox").hidden = true;
}

/** Applies and stores the accent color. */
function setAccent(name) {
  document.documentElement.dataset.accent = name;
  window.localStorage.setItem("portfolio-accent", name);
  $$(".accent-btn").forEach((btn) => {
    btn.classList.toggle("is-active", btn.dataset.accent === name);
  });
  renderFlowLine();
}

/** Opens a stage or role from the URL hash. */
function applyHash() {
  const hash = window.location.hash.replace("#", "");
  if (!hash) {
    return;
  }
  if (hash === "cover") {
    openCover();
    return;
  }
  if (ROLES.some((role) => role.id === hash)) {
    selectStage("career", hash);
    return;
  }
  if (STAGES.some((stage) => stage.id === hash)) {
    selectStage(hash);
  }
}

function bindUi() {
  const stored = window.localStorage.getItem("portfolio-accent");
  const queried = new URLSearchParams(window.location.search).get("accent");
  setAccent(queried || stored || "blue");

  $$(".accent-btn").forEach((btn) => {
    btn.addEventListener("click", () => setAccent(btn.dataset.accent));
  });

  $("#cover-btn").addEventListener("click", openCover);
  $$("[data-close-cover]").forEach((el) => {
    el.addEventListener("click", closeCover);
  });
  $$("[data-close-light]").forEach((el) => {
    el.addEventListener("click", closeLight);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeCover();
      closeLight();
    }
  });

  window.addEventListener("hashchange", applyHash);
  window.addEventListener("resize", renderFlowLine);

  if ("ResizeObserver" in window) {
    new ResizeObserver(renderFlowLine).observe($("#flow"));
  }
}

renderProfile();
renderNodes();
renderStrip();
renderCover();
selectStage("overview");
bindUi();
applyHash();
window.requestAnimationFrame(renderFlowLine);
