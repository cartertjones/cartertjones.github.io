async function loadProjects() {
  const res = await fetch("projects.json");
  const projects = await res.json();

  // --- Carousel ---
  const carouselInner = document.getElementById("carousel-inner");
  const indicators = document.getElementById("carousel-indicators");

  projects.forEach((proj, i) => {
    // indicator
    const button = document.createElement("button");
    button.type = "button";
    button.dataset.bsTarget = "#projectCarousel";
    button.dataset.bsSlideTo = i;
    button.className = i === 0 ? "active carousel-indicator" : "carousel-indicator";
    indicators.appendChild(button);

    // slide
    const slide = document.createElement("div");
    slide.className = `carousel-item ${i === 0 ? "active" : ""}`;
    slide.innerHTML = `
      <div class="d-block slide">
        <div class="row">
          <div class="col-xxl-6 order-xxl-1 order-2">
            <h4>Roles</h4>
            <p>${proj.roles}</p>
          </div>
          <div class="col-xxl-6 order-xxl-2 order-1 d-flex flex-column align-items-start align-items-md-end pb-4">
            <h3>${proj.title}</h3>
            <h4 class="subheader">${proj.subtitle}</h4>
          </div>
        </div>
        <div class="row pb-4">
          <div class="col-xxl-6">
            <h4>Overview</h4>
            <p>${proj.overview}</p>
          </div>
          <div class="col-xxl-6 d-flex justify-content-center">
            ${proj.media.includes("youtube") ? 
              `<iframe src="${proj.media}" frameborder="0" allowfullscreen></iframe>` :
              `<img src="${proj.media}" class="media-placeholder" />`}
          </div>
        </div>
        <div class="row">
          <div class="col-xxl-6">
            <h4>Contributors</h4>
            <p>${proj.contributors.join(", ")}</p>
          </div>
          <div class="col-xxl-6 d-flex justify-content-center align-items-center">
            ${proj.repo ? `<a href="${proj.repo}" target="_blank" class="btn main-button mx-3">
              <i class="fa fa-code-branch me-3"></i>Repository</a>` : ""}
            <a href="project.html?id=${proj.id}" class="btn side-button">
              Breakdown<i class="ms-3 fa fa-arrow-right"></i>
            </a>
          </div>
        </div>
      </div>
    `;
    carouselInner.appendChild(slide);
  });
}

async function loadCurrentProjects() {
  const currentProjects = [
    { id: "kestrel", name: "Kestrel", genre: "VR | Educational Simulation", client: "Meta, BSU Raptor Research Center" },
    { id: "brain-health", name: "Brain Health", genre: "VR | Sensory Experience", client: "BSU Psychology, Engineering" },
    // ... add your current projects here
  ];

  const tbody = document.getElementById("current-projects-table");
  currentProjects.forEach(p => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td class="ps-3">${p.name}</td>
      <td>${p.genre}</td>
      <td>${p.client}</td>
      <td class="text-center"><a href="project.html?id=${p.id}" class="btn side-button">
        <i class="fa fa-arrow-right"></i>
      </a></td>
    `;
    tbody.appendChild(row);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("carousel-inner")) loadProjects();
  if (document.getElementById("current-projects-table")) loadCurrentProjects();
});
