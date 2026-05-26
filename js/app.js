let clickTimer = null;
let autoCloseTimer = null;

const roman = ["I","II","III","IV"];

function toggleMenu() {
  let sidebar = document.getElementById("sidebar");
  sidebar.classList.toggle("active");
  resetAutoClose();
}

function resetAutoClose() {
  clearTimeout(autoCloseTimer);
  autoCloseTimer = setTimeout(() => {
    document.getElementById("sidebar").classList.remove("active");
  }, 5000);
}

document.addEventListener("click", function(e) {
  let sidebar = document.getElementById("sidebar");

  if (!sidebar.contains(e.target) && !e.target.classList.contains("hamburger")) {
    sidebar.classList.remove("active");
  }
});

function goHome() {
  document.getElementById("content").innerHTML = `
    <h1 class="neon-title">Arquitectura de Software</h1>
    <p class="neon-title">Universidad Peruana Los Andes</p>
  `;
}

function showInfo() {
  document.getElementById("content").innerHTML = `
    <h1 class="neon-title">Jeffry Sergio</h1>
    <p>
      Estudiante de Ingeniería de Sistemas.<br><br>
      Portafolio académico.
    </p>
  `;
}

function openUpla() {
  window.open("https://upla.edu.pe/", "_blank");
}

/* CLICK vs DOBLE CLICK */
function toggleUnit(u, e) {
  e.stopPropagation();

  if (clickTimer) {
    clearTimeout(clickTimer);
    clickTimer = null;
    openModule(u);
    return;
  }

  clickTimer = setTimeout(() => {
    let all = document.querySelectorAll(".weeks");

    all.forEach(w => {
      if (w.id !== "u" + u) {
        w.style.display = "none";
      }
    });

    let actual = document.getElementById("u" + u);
    actual.style.display = actual.style.display === "block" ? "none" : "block";

    clickTimer = null;
  }, 250);
}

/* UNIDADES */
function openModule(u) {

  let html = "";

  for (let i = 1; i <= 4; i++) {
    let semana = (u - 1) * 4 + i;

    html += `
      <div class="card" onclick="openWeek(${u},${semana})">
        Semana ${semana}
      </div>
    `;
  }

  document.getElementById("content").innerHTML = `
    <h1 class="neon-title">Unidad ${roman[u-1]}</h1>
    <div class="grid">${html}</div>
  `;
}

/* SEMANAS */
function openWeek(u, w) {

  let base = `semanas/semana${w}/`;
  let contenido = [];

  if (w === 1) {
    contenido = [
      { nombre: "Resumen", archivo: "s1_resumen.pdf" },
      { nombre: "Intro Arquitectura", archivo: "s1_Int_Arquitectura.png" },
      { nombre: "Fundamentos", archivo: "s1_FundamentosyEstandares.png" }
    ];
  }

  if (w === 2) {
    contenido = [
      { nombre: "Resumen", archivo: "s2_resumen.pdf" },
      { nombre: "Arquitectura V1.0", archivo: "s2_ARQUITECTURA_V1.0.pdf" },
      { nombre: "Estándares", archivo: "s2_Estandares.png" }
    ];
  }

  if (w === 3) {
    contenido = [
      { nombre: "Resumen", archivo: "s3_resumen.pdf" },
      { nombre: "Arquitectura V2.0", archivo: "s3_ARQUITECTURA_V2.0.pdf" },
      { nombre: "Fundamentos 1", archivo: "s3_Fundamentos1.png" },
      { nombre: "Fundamentos 2", archivo: "s3_Fundamentos2.png" }
    ];
  }
  if (w === 4) {
  contenido = [
    { nombre: "Arquitectura EYP1", archivo: "s4_arquitectura_eyp1.png" },
    { nombre: "Arquitectura V2.1", archivo: "s4_ARQUITECTURA_V2.1.pdf" }
  ];
    }
    if (w === 5) {
  contenido = [
    { nombre: "Infografía POO 1", archivo: "5_infografiaPOO1.jpg" },
    { nombre: "Infografía POO 2", archivo: "5_infografiaPOO2.jpg" },
    { nombre: "Infografía POO 3", archivo: "5_infografiaPOO3.jpg" },
    { nombre: "Infografía POO 4", archivo: "5_infografiaPOO4.jpg" },
    { nombre: "Infografía POO 5", archivo: "5_infografiaPOO5.jpg" },
    { nombre: "Infografía POO 6", archivo: "5_infografiaPOO6.jpg" }
  ];
}

if (w === 6) {
  contenido = [
    { nombre: "Infografía IR Tema 1", archivo: "6_infografiaIRTema1.jpg" },
    { nombre: "Infografía IR Tema 2", archivo: "6_infografiaIRTema2.jpg" },
    { nombre: "Proyecto polarizado v2.2", archivo: "s4_ARQUITECTURA_V2.2.pdf" }
  ];

}

  let html = "";

  contenido.forEach(item => {
    html += `
      <div class="card" onclick="openFile('${base}${item.archivo}')">
        📂 ${item.nombre}
      </div>
    `;
  });

  document.getElementById("content").innerHTML = `
    <h1 class="neon-title">Unidad ${roman[u-1]} - Semana ${w}</h1>

    <div class="grid">
      ${html}
    </div>
  `;
}

/* ABRIR TODO EN NUEVA PESTAÑA */
function openFile(url) {
  window.open(url, "_blank");
}
function toggleTheme() {
  document.body.classList.toggle("light");
}
