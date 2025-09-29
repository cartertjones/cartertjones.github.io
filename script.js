async function loadProjects(view = "previous") {
  const res = await fetch("projects.json");
  const projects = await res.json();

  const filtered = projects.filter(p => view === "current" ? p.current : !p.current);

  const carouselInner = document.getElementById("carousel-inner");
  const indicators = document.getElementById("carousel-indicators");

  carouselInner.innerHTML = "";
  indicators.innerHTML = "";

  filtered.forEach((proj, i) => {
    // --- Carousel indicator ---
    const button = document.createElement("button");
    button.type = "button";
    button.dataset.bsTarget = "#projectCarousel";
    button.dataset.bsSlideTo = i;
    button.className = i === 0 ? "active carousel-indicator" : "carousel-indicator";
    indicators.appendChild(button);

    // --- Media fallback ---
    let mediaHtml = `<div class="media-placeholder"></div>`;
    if (proj.media) {
      if (proj.media.includes("youtube")) {
        mediaHtml = `<iframe src="${proj.media}" frameborder="0" allowfullscreen></iframe>`;
      } else {
        mediaHtml = `<img src="${proj.media}" class="media-placeholder" loading="lazy" />`;
      }
    }

    let mediaCaption = `<p class="caption"></p>`;
    if (proj.mediaCaption) {
      mediaCaption = `<p class="caption">${proj.mediaCaption}</p>`;
    }

    // --- Tech stack icons ---
    let stackHtml = "";
    if (proj.stack && proj.stack.length) {
      stackHtml = `<div class="tech-stack mt-2">` +
        proj.stack.map(icon => `<img src="img/tech/${icon}.svg" class="tech-icon" alt="${icon}" />`).join("") +
        `</div>`;
    }

    // --- Carousel slide ---
    const slide = document.createElement("div");
    slide.className = `carousel-item ${i === 0 ? "active" : ""}`;
    slide.innerHTML = `
      <div class="d-block slide">
        <div class="row">
          <div class="col-xxl-6 order-xxl-1 order-2">
            <h4>Roles</h4>
            <p>${proj.roles || ""}</p>
          </div>
          <div class="col-xxl-6 order-xxl-2 order-1 d-flex flex-column align-items-start align-items-md-end pb-4">
            <h3>${proj.title}</h3>
            <h4 class="subheader">${proj.subtitle || ""}</h4>
            ${stackHtml}
          </div>
        </div>
        <div class="row pb-4">
          <div class="col-xxl-6">
            <h4>Overview</h4>
            <p>${proj.overview || ""}</p>
          </div>
          <div class="col-xxl-6 d-flex flex-column align-items-center">
            <div class="mb-2">
                ${mediaHtml}
            </div>
            <div>
                ${mediaCaption}
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-xxl-6">
            <h4>Contributors</h4>
            <p>${proj.contributors ? proj.contributors.join(", ") : ""}</p>
          </div>
          <div class="col-xxl-6 d-flex justify-content-center align-items-center">
            ${proj.repo ? `<a href="${proj.repo}" target="_blank" class="btn main-button mx-3 fade-hover">
              <i class="fa fa-code-branch me-3"></i>Repository</a>` : ""}
            <a href="${proj.showBreakdown ? `project.html?id=${proj.id}` : "#"}"
               class="btn side-button fade-hover ${proj.showBreakdown ? "" : "disabled"}">
              Breakdown<i class="ms-3 fa fa-arrow-right"></i>
            </a>
          </div>
        </div>
      </div>
    `;
    carouselInner.appendChild(slide);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  // default load
  loadProjects("previous");
  document.getElementById("toggle-previous").classList.add("active");
  document.getElementById("toggle-current").classList.remove("active");

  // toggle handling
  document.getElementById("toggle-previous").addEventListener("click", () => {
    if (!document.getElementById("toggle-previous").classList.contains("active")) {
      document.getElementById("toggle-previous").classList.add("active");
      document.getElementById("toggle-current").classList.remove("active");
      loadProjects("previous");
    }
  });

  document.getElementById("toggle-current").addEventListener("click", () => {
    if (!document.getElementById("toggle-current").classList.contains("active")) {
      document.getElementById("toggle-current").classList.add("active");
      document.getElementById("toggle-previous").classList.remove("active");
      loadProjects("current");
    }
  });

  // landing fade-in
  setTimeout(() => {
    document.getElementById("landing").classList.add("visible");
  }, 100);
});


