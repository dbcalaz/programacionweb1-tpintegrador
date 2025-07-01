document.addEventListener("DOMContentLoaded", () => {
  const nombreDeUsuario = document.getElementById("nombreDeUsuario");
  const emailDeUsuario = document.querySelector(".e-mail");
  const inputNueva = document.getElementById("nuevaContrasenia");
  const inputRepetir = document.getElementById("repetirContrasenia");
  const botonGuardar = document.querySelector(".boton-guardar");
  const botonCancelar = document.querySelector(".boton-cancelar");
  const cerrarSesion = document.querySelector(".boton-cerrar");
  const contrasenia = document.getElementById("contrasenia");

  const radioTarjeta = document.getElementById("tarjeta-credito");
  const radioCupon = document.getElementById("cuponPago");
  const radioTransferencia = document.getElementById("transferenciaBancaria");

  const inputTarjeta = document.getElementById("numeroTarjeta");
  const inputClave = document.getElementById("claveTarjeta");
  const checkboxesCupon = document.querySelectorAll(
    ".opcion-checkbox input[type='checkbox']"
  );

  const errorContrasenia = document.getElementById("errorContrasenia");
  const errorTarjeta = document.getElementById("errorTarjeta");
  const errorClave = document.getElementById("errorClave");
  const errorCupon = document.getElementById("errorCupon");

  let usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));
  let usuarios = JSON.parse(localStorage.getItem("usuarios"));

  if (usuarioActivo) {
    nombreDeUsuario.textContent = usuarioActivo.nombreDeUsuario;
    emailDeUsuario.textContent = usuarioActivo.email;
    contrasenia.value = usuarioActivo.contrasenia;
    radioTarjeta.checked = usuarioActivo.medioDePago?.tarjeta.seleccionado;
    radioCupon.checked = usuarioActivo.medioDePago?.cupon.seleccionado;
    radioTransferencia.checked =
      usuarioActivo.medioDePago?.transferencia.seleccionado;
    inputTarjeta.value = usuarioActivo.medioDePago?.tarjeta.numero;
    inputClave.value = usuarioActivo.medioDePago?.tarjeta.clave;
  }

  function validarContrasenia(valor) {
    const validacionContrasenia =
      /^(?=(?:.*[a-zA-Z]){2,})(?=(?:.*\d){2,})(?=(?:.*[^a-zA-Z0-9]){2,}).{8,}$/;
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

    return (
      (suma % 2 === 0 && ultimoDigito % 2 === 1) ||
      (suma % 2 === 1 && ultimoDigito % 2 === 0)
    );
  }

  function validarTarjetaYClave() {
    const num = inputTarjeta.value.trim().replace(/\s+/g, "");
    const clave = inputClave.value.trim();

    errorTarjeta.textContent = "";
    errorClave.textContent = "";

    let tarjetaValida = true;
    let claveValida = true;

    if (num.length > 0 && !validarNumeroTarjeta(num)) {
      errorTarjeta.textContent =
        "La tarjeta no cumple con la regla de validación o no tiene 16 dígitos.";
      tarjetaValida = false;
    }

    if (clave.length > 0 && !validarClaveTarjetaCredito(clave)) {
      errorClave.textContent =
        "La clave debe tener 3 dígitos distintos de cero.";
      claveValida = false;
    }

    return (
      (num.length === 0 && clave.length === 0) || (tarjetaValida && claveValida)
    );
  }

  function validarCupon() {
    errorCupon.textContent = "";
    const algunoSeleccionado = Array.from(checkboxesCupon).some(
      (chk) => chk.checked
    );
    /*
     *if (!algunoSeleccionado) {
     * errorCupon.textContent = "Debe seleccionar al menos una opción de cupón.";
     * Este código tira error cuando el usuario clickea cupón de pago sin antes elegir
     * por RapiPago o PagoFacil y la verdad es que no hace falta porque sino elige
     * una checkbox no se le habilita el botón confirmar ya con eso se sabe que tiene que
     * elegir una opción.
     */
    return algunoSeleccionado;
  }

  function limpiarCheckboxesCupon() {
    checkboxesCupon.forEach((check) => {
      check.checked = false;
      check.disabled = false;
    });
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
        errorContrasenia.textContent =
          "Mín. 8 caracteres: 2 letras, 2 números y 2 símbolos";
      } else {
        contraseniaValida = true;
      }
    }

    let metodoValido = false;

    //Acá válida que los campos de número de tarjeta y clave no estén vacíos para que se puede habilitar el botón de guardar cambios.
    if (radioTarjeta.checked) {
      const num = inputTarjeta.value.trim().replace(/\s+/g, "");
      const clave = inputClave.value.trim();
      if (num !== "" && clave !== "") {
        metodoValido = validarTarjetaYClave();
      }
    } else if (radioCupon.checked) {
      metodoValido = validarCupon();
    } else if (radioTransferencia.checked) {
      metodoValido = true;
    }

    botonGuardar.disabled = !(contraseniaValida || metodoValido);
  }

  inputNueva.addEventListener("input", validarFormulario);
  inputRepetir.addEventListener("input", validarFormulario);
  //El limpiarCheckboxesCupon(), limpia los campos elegidos, si los hubiese, al cambiar de opción de pago entre Tarjeta de cŕedito y transferencia
  radioTarjeta.addEventListener("change", () => {
    limpiarCheckboxesCupon();
    validarFormulario();
  });
  radioTransferencia.addEventListener("change", () => {
    limpiarCheckboxesCupon();
    validarFormulario();
  });
  radioCupon.addEventListener("change", validarFormulario);
  inputTarjeta.addEventListener("input", validarFormulario);
  inputClave.addEventListener("input", validarFormulario);
  checkboxesCupon.forEach((chk) =>
    chk.addEventListener("change", validarFormulario)
  );

  botonGuardar.addEventListener("click", (e) => {
    e.preventDefault();
    if (botonGuardar.disabled) return;

    const nueva = inputNueva.value.trim();
    const repetir = inputRepetir.value.trim();

    if (
      nueva &&
      validarRepetirContrasenia(nueva, repetir) &&
      validarContrasenia(nueva)
    ) {
      usuarioActivo.contrasenia = nueva;
    }

    if (radioTarjeta.checked) {
      usuarioActivo.metodoPago = {
        tipo: "tarjeta",
        numero: inputTarjeta.value.trim().replace(/\s+/g, ""),
        clave: inputClave.value.trim(),
      };
    } else if (radioCupon.checked) {
      const seleccionados = Array.from(checkboxesCupon)
        .filter((chk) => chk.checked)
        .map((chk) => chk.value);
      usuarioActivo.metodoPago = {
        tipo: "cupon",
        seleccionados,
      };
    } else if (radioTransferencia.checked) {
      usuarioActivo.metodoPago = {
        tipo: "transferencia",
        cbu: "2183909411100018971375",
      };
    }

    const index = usuarios.findIndex((u) => u.email === usuarioActivo.email);
    if (index !== -1) {
      usuarios[index] = usuarioActivo;
      localStorage.setItem("usuarios", JSON.stringify(usuarios));
      localStorage.setItem("usuarioActivo", JSON.stringify(usuarioActivo));
      window.location.href = "./galeria.html";
    }
  });

  //esto se agregó
  checkboxesCupon.forEach((check) => {
    check.addEventListener("change", () => {
      if (check.checked) {
        checkboxesCupon.forEach((otroCheck) => {
          if (otroCheck !== check) {
            otroCheck.disabled = true;
          }
        });
      } else {
        checkboxesCupon.forEach((otroCheck) => {
          otroCheck.disabled = false;
        });
      }
    });
  });

  botonCancelar.addEventListener("click", (e) => {
    e.preventDefault();
    if (confirm("¿Estás seguro de que deseas cancelar la suscripción?")) {
      usuarios = usuarios.filter(
        (u) => u.nombreDeUsuario !== usuarioActivo.nombreDeUsuario
      );
      localStorage.setItem("usuarios", JSON.stringify(usuarios));
      localStorage.removeItem("usuarioActivo");
      window.location.href = "./index.html";
    }
  });

  cerrarSesion.addEventListener("click", () => {
    localStorage.removeItem("usuarioActivo");
  });

  if (usuarioActivo && usuarioActivo.medioDePago) {
    const medio = usuarioActivo.medioDePago;

    if (medio.tarjeta?.seleccionado) {
      radioTarjeta.checked = true;
      inputTarjeta.value = medio.tarjeta.numero || "";
      inputClave.value = medio.tarjeta.clave || "";
    }

    if (medio.cupon?.seleccionado) {
      radioCupon.checked = true;

      if (medio.cupon.pagoFacil) {
        checkboxesCupon.forEach((chk) => {
          if (chk.value === "pagoFacil") {
            chk.checked = true;
          } else {
            chk.disabled = true;
          }
        });
      }

      if (medio.cupon.rapiPago) {
        checkboxesCupon.forEach((chk) => {
          if (chk.value === "rapiPago") {
            chk.checked = true;
          } else {
            chk.disabled = true;
          }
        });
      }
    }

    if (medio.transferencia?.seleccionado) {
      radioTransferencia.checked = true;
    }
  }

  validarFormulario();
});

const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));
const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

if (!usuarioActivo) {
  alert("No hay sesión activa. Redirigiendo al inicio.");
  window.location.href = "index.html";
}

const indiceUsuario = usuarios.findIndex(
  (u) => u.email === usuarioActivo.email
);
let favoritos = usuarios[indiceUsuario].favoritos || [];
let suscripciones = usuarios[indiceUsuario].suscripciones || [];

const contenedorFavoritos = document.getElementById("contenedorFavoritos");

let hayFavoritos = false;

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
    favoritos = favoritos.filter(
      (fav) => !(fav.id === favorito.id && fav.tipo === favorito.tipo)
    );

    usuarios[indiceUsuario].favoritos = favoritos;
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    localStorage.setItem(
      "usuarioActivo",
      JSON.stringify(usuarios[indiceUsuario])
    );

    divInfoCarrusel.remove();

    if (
      (favorito.tipo === "pelicula" || favorito.tipo === "serie") &&
      contenedorFavoritos.children.length === 0
    ) {
      contenedorFavoritos.innerHTML =
        '<p class="mensaje-error">No se encontraron resultados.</p>';
    }
  });

  enlace.appendChild(imagen);
  fotoCarrusel.appendChild(enlace);
  divCorazon.appendChild(imgCorazon);
  fotoCarrusel.appendChild(divCorazon);
  divInfoCarrusel.appendChild(fotoCarrusel);

  if (favorito.tipo === "pelicula" || favorito.tipo === "serie") {
    contenedorFavoritos.appendChild(divInfoCarrusel);
    hayFavoritos = true;
  }
}

if (!hayFavoritos) {
  contenedorFavoritos.innerHTML =
    '<p class="mensaje-error">No se encontraron resultados.</p>';
}

// SUSCRIPCIONES
const contenedorProximosLanzamientos = document.getElementById(
  "contenedorProximosLanzamientos"
);

let hayProximosLanzamientos = false;

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
    suscripciones = suscripciones.filter(
      (sub) => !(sub.id === suscripto.id && sub.tipo === suscripto.tipo)
    );

    usuarios[indiceUsuario].suscripciones = suscripciones;
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    localStorage.setItem(
      "usuarioActivo",
      JSON.stringify(usuarios[indiceUsuario])
    );

    divInfoCarrusel.remove();

    if (
      (suscripto.tipo === "pelicula" || suscripto.tipo === "serie") &&
      contenedorProximosLanzamientos.children.length === 0
    ) {
      contenedorProximosLanzamientos.innerHTML =
        '<p class="mensaje-error">No se encontraron resultados.</p>';
    }
  });

  enlace.appendChild(imagen);
  fotoCarrusel.appendChild(enlace);
  divCampana.appendChild(imgCampana);
  fotoCarrusel.appendChild(divCampana);
  divInfoCarrusel.appendChild(fotoCarrusel);

  if (suscripto.tipo === "pelicula" || suscripto.tipo === "serie") {
    contenedorProximosLanzamientos.appendChild(divInfoCarrusel);
    hayProximosLanzamientos = true;
  }
}

if (!hayProximosLanzamientos) {
  contenedorProximosLanzamientos.innerHTML =
    '<p class="mensaje-error">No se encontraron resultados.</p>';
}
