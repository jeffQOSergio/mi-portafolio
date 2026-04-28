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
  }, 5000); // más suave
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
    <p>Universidad Peruana Los Andes</p>
  `;
}

function showInfo() {
  document.getElementById("content").innerHTML = `
    <h1 class="neon-title">Información</h1>
    <p>
      Estudiante de Ingeniería de Sistemas.<br><br>
      Portafolio académico del curso de Arquitectura de Software.
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

/* 🔥 UNIDAD → GRID 2x2 */
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

/* 🔥 SEMANAS CON ARCHIVOS REALES */
function openWeek(u, w) {

  let base = `semanas/semana${w}/`;

  let contenido = "";

  if (w === 1) {
    contenido = `
      <div class="card" onclick="openFile('${base}s1_resumen.pdf')">📄 Resumen</div>
      <div class="card" onclick="showImage('${base}s1_Int_Arquitectura.png')">🖼️ Intro Arquitectura</div>
      <div class="card" onclick="showImage('${base}s1_FundamentosyEstandares.png')">🖼️ Fundamentos</div>
    `;
  }

  if (w === 2) {
    contenido = `
      <div class="card" onclick="openFile('${base}s2_resumen.pdf')">📄 Resumen</div>
      <div class="card" onclick="showImage('${base}s2_Estandares.png')">🖼️ Estándares</div>
    `;
  }

  if (w === 3) {
    contenido = `
      <div class="card" onclick="openFile('${base}s3_resumen.pdf')">📄 Resumen</div>
      <div class="card" onclick="showImage('${base}s3_Fundamentos1.png')">🖼️ Fundamentos 1</div>
      <div class="card" onclick="showImage('${base}s3_Fundamentos2.png')">🖼️ Fundamentos 2</div>
    `;
  }

  document.getElementById("content").innerHTML = `
    <h1 class="neon-title">Unidad ${roman[u-1]} - Semana ${w}</h1>

    <div class="grid">
      ${contenido}
    </div>

    <div id="viewer"></div>
  `;
}

/* 📄 ABRIR PDF EN OTRA PESTAÑA */
function openFile(url) {
  window.open(url, "_blank");
}

/* 🖼️ MOSTRAR IMAGEN EN MISMA VENTANA */
function showImage(src) {
  document.getElementById("viewer").innerHTML = `
    <img src="${src}" style="width:300px; margin-top:20px; border-radius:10px;">
  `;
}
