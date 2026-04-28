let clickTimer = null;
let roman = ["I","II","III","IV"];

/* MENU */
function toggleMenu() {
  document.getElementById("sidebar").classList.toggle("active");
}

/* HOME */
function goHome() {
  document.getElementById("content").innerHTML = `
    <h1 class="neon-title">Arquitectura de Software</h1>
    <p>Universidad Peruana Los Andes</p>
  `;
}

/* INFO */
function showInfo() {
  document.getElementById("content").innerHTML = `
    <h1 class="neon-title">Información</h1>
    <p>Estudiante de Ingeniería de Sistemas - UPLA</p>
  `;
}

/* UPLA */
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
    all.forEach(w => w.style.display = "none");

    let actual = document.getElementById("u" + u);
    actual.style.display = "block";

    clickTimer = null;
  }, 250);
}

/* UNIDAD */
function openModule(u) {
  let html = "";

  for (let i = 1; i <= 4; i++) {
    let semana = (u - 1) * 4 + i;
    html += `<div class="card" onclick="openWeek(${u},${semana})">Semana ${semana}</div>`;
  }

  document.getElementById("content").innerHTML = `
    <h1 class="neon-title">Unidad ${roman[u-1]}</h1>
    <div class="grid">${html}</div>
  `;
}

/* 🔥 CONTENIDO REAL */
const contenido = {
  1: [
    ["Resumen", "semanas/s1_resumen.pdf"],
    ["Introducción", "semanas/s1_Int_Arquitectura.png"],
    ["Fundamentos", "semanas/s1_FundamentosyEstándares.png"]
  ],
  2: [
    ["Resumen", "semanas/s2_resumen.pdf"],
    ["Estándares", "semanas/s2_Estándares.png"],
    ["Arquitectura V1", "semanas/s2_ARQUITECTURA_V1.0.pdf"]
  ],
  3: [
    ["Resumen", "semanas/s3_resumen.pdf"],
    ["Fundamentos 1", "semanas/s3_Fundamentos1.png"],
    ["Fundamentos 2", "semanas/s3_Fundamentos2.png"],
    ["Arquitectura V2", "semanas/s3_ARQUITECTURA_V2.0.pdf"]
  ]
};

/* SEMANA */
function openWeek(u, w) {

  let lista = contenido[w] || [];
  let html = "";

  lista.forEach(item => {
    html += `
      <div class="card" onclick="window.open('${item[1]}','_blank')">
        ${item[0]}
      </div>
    `;
  });

  document.getElementById("content").innerHTML = `
    <h1 class="neon-title">Unidad ${roman[u-1]} - Semana ${w}</h1>
    <div class="grid">${html}</div>
  `;
}
