function toggleMenu() {
  document.getElementById("sidebar").classList.toggle("active");
}

/* SOLO UNA UNIDAD ABIERTA */
function toggleUnit(u, e) {

  e.stopPropagation();

  let all = document.querySelectorAll(".weeks");

  all.forEach(w => {
    if (w.id !== "u" + u) {
      w.style.display = "none";
    }
  });

  let actual = document.getElementById("u" + u);

  if (actual.style.display === "block") {
    actual.style.display = "none";
  } else {
    actual.style.display = "block";
  }
}

/* DOBLE CLICK = MODULO COMPLETO */
function openModule(u) {

  document.getElementById("content").innerHTML = `
    <h1 class="neon-title">Unidad ${u}</h1>

    <div style="margin-top:20px;">
      <div>📦 Semana 1-4 módulo completo</div>
      <div>📦 Contenido: PDF, imágenes, tareas</div>
      <div>📦 Sistema de evidencias</div>
    </div>
  `;
}

/* SEMANA INDIVIDUAL */
function openWeek(u, w) {

  document.getElementById("content").innerHTML = `
    <h1 class="neon-title">Unidad ${u} - Semana ${w}</h1>
    <p>Contenido de la semana</p>
  `;
}