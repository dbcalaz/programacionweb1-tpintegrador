const estaSemana = document.getElementById("esta_semana");
const proximaSemana = document.getElementById("proxima_semana");
const proximoMes = document.getElementById("proximo_mes");
const enGrabacion = document.getElementById("en_grabacion");

let lanzamientos = [];
const lanzamientosJSON = localStorage.getItem("lanzamientos");
if (!lanzamientosJSON) {
  localStorage.setItem("lanzamientos", JSON.stringify(DATA_LANZAMIENTOS));
  lanzamientos = DATA_LANZAMIENTOS;
} else {
  lanzamientos = JSON.parse(lanzamientosJSON);
}

function crearLanzamiento(lanzamiento) {
  const divFoto = document.createElement("div");
  divFoto.classList.add("foto-suscripto");

  const img = document.createElement("img");
  img.src = lanzamiento.imagen;
  img.alt = lanzamiento.tipo;

  const divCampana = document.createElement("div");
  divCampana.classList.add("campana");

  const campana = document.createElement("img");
  campana.src = "./images/campana3.png";
  campana.alt = "Notificarme";

  const suscripciones = JSON.parse(localStorage.getItem("suscripciones") || "[]");
  let estaSuscrito = false;
  for (let i = 0; i < suscripciones.length; i++) {
    if (suscripciones[i].id === lanzamiento.id) {
      estaSuscrito = true;
      break;
    }
  }

  if (estaSuscrito) {
    divCampana.classList.add("pintado");
  }

  campana.addEventListener("click", function(e) {
    e.preventDefault();
    const suscripcionesActuales = JSON.parse(localStorage.getItem("suscripciones") || "[]");
    let yaEsta = false;
    for (let j = 0; j < suscripcionesActuales.length; j++) {
      if (suscripcionesActuales[j].id === lanzamiento.id) {
        yaEsta = true;
        break;
      }
    }

    let nuevasSuscripciones;
    if (yaEsta) {
      nuevasSuscripciones = [];
      for (let k = 0; k < suscripcionesActuales.length; k++) {
        if (suscripcionesActuales[k].id !== lanzamiento.id) {
          nuevasSuscripciones.push(suscripcionesActuales[k]);
        }
      }
      divCampana.classList.remove("pintado");
    } else {
      nuevasSuscripciones = suscripcionesActuales.slice();
      nuevasSuscripciones.push(lanzamiento);
      divCampana.classList.add("pintado");
    }

    localStorage.setItem("suscripciones", JSON.stringify(nuevasSuscripciones));
  });

  divCampana.appendChild(campana);
  divFoto.appendChild(img);
  divFoto.appendChild(divCampana);

  return divFoto;
}

for (let i = 0; i < lanzamientos.length; i++) {
  let lanzamiento = lanzamientos[i];
  const descripcion = lanzamiento.descripcion.toLowerCase();

  const div = crearLanzamiento(lanzamiento);

  if (descripcion === "esta semana") {
    estaSemana.appendChild(div);
  } else if (descripcion === "próxima semana") {
    proximaSemana.appendChild(div);
  } else if (descripcion === "próximo mes") {
    proximoMes.appendChild(div);
  } else if (descripcion === "en grabación") {
    enGrabacion.appendChild(div);
  }
}
