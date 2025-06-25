const estaSemana = document.getElementById("esta_semana");
const proximaSemana = document.getElementById("proxima_semana");
const proximoMes = document.getElementById("proximo_mes");
const enGrabacion = document.getElementById("en_grabacion");

// Lanzamientos
let lanzamientos = [];
const lanzamientosJSON = localStorage.getItem("lanzamientos");
if (!lanzamientosJSON) {
  localStorage.setItem("lanzamientos", JSON.stringify(DATA_LANZAMIENTOS));
  lanzamientos = DATA_LANZAMIENTOS;
} else {
  lanzamientos = JSON.parse(lanzamientosJSON);
}

// Obtener usuario activo
const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));
const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
const indiceUsuario = usuarios.findIndex(u => u.email === usuarioActivo.email);
let suscripciones = usuarios[indiceUsuario].suscripciones || [];

// Crear tarjeta de lanzamiento
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

  let estaSuscrito = suscripciones.some(s => s.id === lanzamiento.id && s.tipo === lanzamiento.tipo);
  if (estaSuscrito) {
    divCampana.classList.add("pintado");
  }

  campana.addEventListener("click", function(e) {
    e.preventDefault();

    let yaEsta = suscripciones.some(s => s.id === lanzamiento.id && s.tipo === lanzamiento.tipo);

    if (yaEsta) {
      suscripciones = suscripciones.filter(s => !(s.id === lanzamiento.id && s.tipo === lanzamiento.tipo));
      divCampana.classList.remove("pintado");
    } else {
      suscripciones.push(lanzamiento);
      divCampana.classList.add("pintado");
    }

    // Actualizar usuario y guardar
    usuarios[indiceUsuario].suscripciones = suscripciones;
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    localStorage.setItem("usuarioActivo", JSON.stringify(usuarios[indiceUsuario]));
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