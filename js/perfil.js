document.addEventListener("DOMContentLoaded", () => {
  const nombreDeUsuario = document.getElementById("nombreDeUsuario");
  const emailDeUsuario = document.querySelector(".e-mail");
  const inputNueva = document.getElementById("nuevaContrasenia");
  const inputRepetir = document.getElementById("repetirContrasenia");
  const botonGuardar = document.querySelector(".boton-guardar");
  const botonCancelar = document.querySelector(".boton-cancelar");
  const cerrarSesion = document.querySelector(".boton-cerrar");

  const tarjetaRadio = document.getElementById("tarjeta-credito");
  const cuponRadio = document.getElementById("cuponPago");
  const transferenciaRadio = document.getElementById("transferenciaBancaria");

  const inputTarjeta = document.getElementById("numeroTarjeta");
  const inputClave = document.getElementById("claveTarjeta");
  const checkboxesCupon = document.querySelectorAll(".opcion-checkbox input[type='checkbox']");

  const errorContrasenia = document.getElementById("errorContrasenia");
  const errorTarjeta = document.getElementById("errorTarjeta");
  const errorClave = document.getElementById("errorClave");
  const errorCupon = document.getElementById("errorCupon");

  let usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));
  let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

  if (usuarioActivo) {
    nombreDeUsuario.textContent = usuarioActivo.nombreDeUsuario;
    emailDeUsuario.textContent = usuarioActivo.email;
  }

  function validarContrasenia(valor) {
    const validacionContrasenia = /^(?=(?:.*[a-zA-Z]){2,})(?=(?:.*\d){2,})(?=(?:.*[^a-zA-Z0-9]){2,}).{8,}$/;
    return validacionContrasenia.test(valor);
  }

  function validarRepetirContrasenia(contrasenia1, contrasenia2) {
    return contrasenia1 === contrasenia2;
  }

  function validarClaveTarjetaCredito(claveTarjetaCredito) {
    let valido = true;
    if (claveTarjetaCredito.length !== 3) return false;
    for (let i = 0; i < claveTarjetaCredito.length; i++) {
      if (claveTarjetaCredito[i] === "0") return false;
    }
    return valido;
  }

  function validarNumeroTarjeta(numeroTarjeta) {
    const numeroTarjetaDeCredito = numeroTarjeta.toString();
    if (numeroTarjetaDeCredito.length !== 16) return false;

    const ultimoDigito = parseInt(numeroTarjetaDeCredito[15]);
    let suma = 0;
    for (let i = 0; i < 15; i++) {
      suma += parseInt(numeroTarjetaDeCredito[i]);
    }

    return (suma % 2 === 0 && ultimoDigito % 2 === 1) ||
      (suma % 2 === 1 && ultimoDigito % 2 === 0);
  }

  function validarTarjetaYClave() {
    const num = inputTarjeta.value.trim().replace(/\s+/g, "");
    const clave = inputClave.value.trim();

    errorTarjeta.textContent = "";
    errorClave.textContent = "";

    let tarjetaValida = true;
    let claveValida = true;

    if (!validarNumeroTarjeta(num)) {
      errorTarjeta.textContent = "La tarjeta no cumple con la regla de validación o no tiene 16 dígitos.";
      tarjetaValida = false;
    }

    if (!validarClaveTarjetaCredito(clave)) {
      errorClave.textContent = "La clave debe tener 3 dígitos distintos de cero.";
      claveValida = false;
    }

    return tarjetaValida && claveValida;
  }

  function validarCupon() {
    errorCupon.textContent = "";
    const algunoSeleccionado = Array.from(checkboxesCupon).some(chk => chk.checked);
    if (!algunoSeleccionado) {
      errorCupon.textContent = "Debe seleccionar al menos una opción de cupón.";
    }
    return algunoSeleccionado;
  }

  function validarFormulario() {
    errorContrasenia.textContent = "";
    let contraseniaValida = false;

    const nueva = inputNueva.value.trim();
    const repetir = inputRepetir.value.trim();

    if (nueva.length > 0 && repetir.length > 0) {
      if (!validarRepetirContrasenia(nueva, repetir)) {
        errorContrasenia.textContent = "Las contraseñas no coinciden.";
      } else if (!validarContrasenia(nueva)) {
        errorContrasenia.textContent = "Debe tener al menos 8 caracteres, 2 letras, 2 números y 2 símbolos.";
      } else {
        contraseniaValida = true;
      }
    }

    let metodoValido = false;

    if (tarjetaRadio.checked) {
      metodoValido = validarTarjetaYClave();
    } else if (cuponRadio.checked) {
      metodoValido = validarCupon();
    } else if (transferenciaRadio.checked) {
      metodoValido = true;
    }

    botonGuardar.disabled = !(contraseniaValida || metodoValido);
  }

  // Escuchar cambios para validar
  inputNueva.addEventListener("input", validarFormulario);
  inputRepetir.addEventListener("input", validarFormulario);
  tarjetaRadio.addEventListener("change", validarFormulario);
  cuponRadio.addEventListener("change", validarFormulario);
  transferenciaRadio.addEventListener("change", validarFormulario);
  inputTarjeta.addEventListener("input", validarFormulario);
  inputClave.addEventListener("input", validarFormulario);
  checkboxesCupon.forEach(chk => chk.addEventListener("change", validarFormulario));

  botonGuardar.addEventListener("click", e => {
    e.preventDefault();
    if (botonGuardar.disabled) return;

    const nueva = inputNueva.value.trim();
    const repetir = inputRepetir.value.trim();

    if (nueva && validarRepetirContrasenia(nueva, repetir) && validarContrasenia(nueva)) {
      usuarioActivo.contrasenia = nueva;
    }

    if (tarjetaRadio.checked) {
      usuarioActivo.metodoPago = {
        tipo: "tarjeta",
        numero: inputTarjeta.value.trim().replace(/\s+/g, ""),
        clave: inputClave.value.trim()
      };
    } else if (cuponRadio.checked) {
      const seleccionados = Array.from(checkboxesCupon)
        .filter(chk => chk.checked)
        .map(chk => chk.parentElement.textContent.trim());
      usuarioActivo.metodoPago = {
        tipo: "cupon",
        seleccionados
      };
    } else if (transferenciaRadio.checked) {
      usuarioActivo.metodoPago = {
        tipo: "transferencia",
        cbu: "2183909411100018971375"
      };
    }

    const index = usuarios.findIndex(u => u.email === usuarioActivo.email);
    if (index !== -1) {
      usuarios[index] = usuarioActivo;
      localStorage.setItem("usuarios", JSON.stringify(usuarios));
      localStorage.setItem("usuarioActivo", JSON.stringify(usuarioActivo));
      window.location.href = "./galeria.html";
    }
  });

  botonCancelar.addEventListener("click", e => {
    e.preventDefault();
    if (confirm("¿Estás seguro de que deseas cancelar la suscripción?")) {
      usuarios = usuarios.filter(u => u.email !== usuarioActivo.email);
      localStorage.setItem("usuarios", JSON.stringify(usuarios));
      localStorage.removeItem("usuarioActivo");
      window.location.href = "./index.html";
    }
  });

  cerrarSesion.addEventListener("click", () => {
    localStorage.removeItem("usuarioActivo");
  });

  // Mostrar método de pago previamente guardado
  if (usuarioActivo && usuarioActivo.metodoPago) {
    const metodo = usuarioActivo.metodoPago.tipo;

    if (metodo === "tarjeta") {
      tarjetaRadio.checked = true;
      inputTarjeta.value = usuarioActivo.metodoPago.numero || "";
      inputClave.value = usuarioActivo.metodoPago.clave || "";
    } else if (metodo === "cupon") {
      cuponRadio.checked = true;
      const seleccionados = usuarioActivo.metodoPago.seleccionados || [];
      checkboxesCupon.forEach(chk => {
        const texto = chk.parentElement.textContent.trim();
        if (seleccionados.includes(texto)) {
          chk.checked = true;
        }
      });
    } else if (metodo === "transferencia") {
      transferenciaRadio.checked = true;
    }
  }

  validarFormulario(); // Llamar al inicio para habilitar/deshabilitar correctamente el botón
});

const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));
const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

if (!usuarioActivo) {
  alert("No hay sesión activa. Redirigiendo al inicio.");
  window.location.href = "index.html";
}

const indiceUsuario = usuarios.findIndex(u => u.email === usuarioActivo.email);
let favoritos = usuarios[indiceUsuario].favoritos || [];
let suscripciones = usuarios[indiceUsuario].suscripciones || [];

const contenedorPeliculas = document.getElementById('contenedorFavoritosPeliculas');
const contenedorSeries = document.getElementById('contenedorFavoritosSeries');

let hayPeliculas = false;
let haySeries = false;

// FAVORITOS
for (let favorito of favoritos) {
  let divInfoCarrusel = document.createElement("div");
  divInfoCarrusel.classList.add("info_carrusel");

  let fotoCarrusel = document.createElement("div");
  fotoCarrusel.classList.add("foto_carrusel");

  let enlace = document.createElement("a");
  enlace.href = `detalle${favorito.tipo}.html?id=${favorito.id}`;

  let imagen = document.createElement("img");
  imagen.src = favorito.imagen;
  imagen.alt = favorito.titulo;

  let divCorazon = document.createElement("div");
  divCorazon.classList.add("corazon", "pintado");

  let imgCorazon = document.createElement("img");
  imgCorazon.src = "./images/corazon4.png";
  imgCorazon.alt = "corazon";

  imgCorazon.addEventListener("click", function () {
    favoritos = favoritos.filter(fav => !(fav.id === favorito.id && fav.tipo === favorito.tipo));

    usuarios[indiceUsuario].favoritos = favoritos;
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    localStorage.setItem("usuarioActivo", JSON.stringify(usuarios[indiceUsuario]));

    divInfoCarrusel.remove();

    if (favorito.tipo === "pelicula" && contenedorPeliculas.children.length === 0) {
      contenedorPeliculas.innerHTML = '<p class="mensaje-error">No se encontraron resultados.</p>';
    }
    if (favorito.tipo === "serie" && contenedorSeries.children.length === 0) {
      contenedorSeries.innerHTML = '<p class="mensaje-error">No se encontraron resultados.</p>';
    }
  });

  enlace.appendChild(imagen);
  fotoCarrusel.appendChild(enlace);
  divCorazon.appendChild(imgCorazon);
  fotoCarrusel.appendChild(divCorazon);
  divInfoCarrusel.appendChild(fotoCarrusel);

  if (favorito.tipo === "pelicula") {
    contenedorPeliculas.appendChild(divInfoCarrusel);
    hayPeliculas = true;
  } else if (favorito.tipo === "serie") {
    contenedorSeries.appendChild(divInfoCarrusel);
    haySeries = true;
  }
}

if (!hayPeliculas) {
  contenedorPeliculas.innerHTML = '<p class="mensaje-error">No se encontraron resultados.</p>';
}
if (!haySeries) {
  contenedorSeries.innerHTML = '<p class="mensaje-error">No se encontraron resultados.</p>';
}

// SUSCRIPCIONES
const contenedorSuscripcionesPeliculas = document.getElementById("contenedorSuscripcionesPeliculas");
const contenedorSuscripcionesSeries = document.getElementById("contenedorSuscripcionesSeries");

let hayPeliculasSus = false;
let haySeriesSus = false;

for (let suscripto of suscripciones) {
  let divInfoCarrusel = document.createElement("div");
  divInfoCarrusel.classList.add("info_carrusel");

  let fotoCarrusel = document.createElement("div");
  fotoCarrusel.classList.add("foto_carrusel");

  let enlace = document.createElement("a");
  enlace.href = `detalle${suscripto.tipo}.html?id=${suscripto.id}`;

  let imagen = document.createElement("img");
  imagen.src = suscripto.imagen;
  imagen.alt = suscripto.titulo;

  let divCampana = document.createElement("div");
  divCampana.classList.add("campana", "pintado");

  let imgCampana = document.createElement("img");
  imgCampana.src = "./images/campana3.png";
  imgCampana.alt = "Desuscribirse";

  imgCampana.addEventListener("click", function () {
    suscripciones = suscripciones.filter(sub => !(sub.id === suscripto.id && sub.tipo === suscripto.tipo));

    usuarios[indiceUsuario].suscripciones = suscripciones;
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    localStorage.setItem("usuarioActivo", JSON.stringify(usuarios[indiceUsuario]));

    divInfoCarrusel.remove();

    if (suscripto.tipo === "pelicula" && contenedorSuscripcionesPeliculas.children.length === 0) {
      contenedorSuscripcionesPeliculas.innerHTML = '<p class="mensaje-error">No se encontraron resultados.</p>';
    }
    if (suscripto.tipo === "serie" && contenedorSuscripcionesSeries.children.length === 0) {
      contenedorSuscripcionesSeries.innerHTML = '<p class="mensaje-error">No se encontraron resultados.</p>';
    }
  });

  enlace.appendChild(imagen);
  fotoCarrusel.appendChild(enlace);
  divCampana.appendChild(imgCampana);
  fotoCarrusel.appendChild(divCampana);
  divInfoCarrusel.appendChild(fotoCarrusel);

  if (suscripto.tipo === "pelicula") {
    contenedorSuscripcionesPeliculas.appendChild(divInfoCarrusel);
    hayPeliculasSus = true;
  } else if (suscripto.tipo === "serie") {
    contenedorSuscripcionesSeries.appendChild(divInfoCarrusel);
    haySeriesSus = true;
  }
}

if (!hayPeliculasSus) {
  contenedorSuscripcionesPeliculas.innerHTML = '<p class="mensaje-error">No se encontraron resultados.</p>';
}
if (!haySeriesSus) {
  contenedorSuscripcionesSeries.innerHTML = '<p class="mensaje-error">No se encontraron resultados.</p>';
}
