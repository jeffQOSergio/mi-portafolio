let clickTimer = null;
let autoCloseTimer = null;

const roman = ["I","II","III","IV"];

function toggleMenu() {
  let sidebar = document.getElementById("sidebar");
  sidebar.classList.toggle("active");

  resetAutoClose();
}

/* 🔥 AUTO CIERRE */
function resetAutoClose() {
  clearTimeout(autoCloseTimer);

  autoCloseTimer = setTimeout(() => {
    document.getElementById("sidebar").classList.remove("active");
  }, 4000); // 4 segundos
}

/* CIERRE SI HACES CLICK AFUERA */
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
      Portafolio del curso de Arquitectura de Software desarrollado en 16 semanas.
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

function openWeek(u, w) {

  document.getElementById("content").innerHTML = `
    <h1 class="neon-title">Unidad ${roman[u-1]} - Semana ${w}</h1>

    <div class="grid">
      <div class="card" onclick="window.open('docs/semana${w}.pdf','_blank')">📄 Documento</div>
      <div class="card" onclick="showImage('img/semana${w}.jpg')">🖼️ Imagen</div>
      <div class="card" onclick="window.open('docs/tarea${w}.pdf','_blank')">📄 Tarea</div>
      <div class="card" onclick="showImage('img/extra${w}.jpg')">🖼️ Extra</div>
    </div>

    <div id="viewer"></div>
  `;
}

function showImage(src) {
  document.getElementById("viewer").innerHTML = `
    <img src="${src}" style="width:300px; margin-top:20px; border-radius:10px;">
  `;
}