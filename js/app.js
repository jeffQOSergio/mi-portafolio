let clickTimer = null;

const roman = ["I","II","III","IV"];

function toggleMenu() {
  document.getElementById("sidebar").classList.toggle("active");
}

function goHome() {
  document.getElementById("content").innerHTML = `
    <h1 class="neon-title">Arquitectura de Software</h1>
    <p>Universidad Peruana Los Andes</p>
  `;
}

function showInfo() {
  document.getElementById("content").innerHTML = `
    <h1 class="neon-title">Información</h1>
    <p>Portafolio académico del curso de Arquitectura de Software.</p>
  `;
}

function openUpla() {
  window.open("https://upla.edu.pe/", "_blank");
}

/* CLICK / DOBLE CLICK */
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
      { nombre: "Resumen", archivo: "s1_resumen.pdf" }
    ];
  }

  if (w === 2) {
    contenido = [
      { nombre: "Resumen", archivo: "s2_resumen.pdf" },
      { nombre: "Arquitectura V1.0", archivo: "s2_ARQUITECTURA_V1.0.pdf" }
    ];
  }

  if (w === 3) {
    contenido = [
      { nombre: "Resumen", archivo: "s3_resumen.pdf" },
      { nombre: "Arquitectura V2.0", archivo: "s3_ARQUITECTURA_V2.0.pdf" }
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
    <div class="grid">${html}</div>
  `;
}

function openFile(url) {
  window.open(url, "_blank");
}
