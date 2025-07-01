const nombre = document.getElementById("nombre");
const apellido = document.getElementById("apellido");
const email = document.getElementById("email");
const nombreDeUsuario = document.getElementById("nombreDeUsuario");
const contrasenia = document.getElementById("contrasenia");
const repetirContrasenia = document.getElementById("repetirContrasenia");
const metodoPagoRadios = document.getElementsByName("metodoPago");
const numeroTarjeta = document.getElementById("numeroTarjeta");
const claveTarjeta = document.getElementById("claveTarjeta");
const radioTarjeta = document.getElementById("radioTarjeta");
const radioCupon = document.getElementById("radioCupon");
const radioTransferencia = document.getElementById("radioTransferencia");
const checkPagoFacil = document.getElementById("pagoFacil");
const checkRapiPago = document.getElementById("rapiPago");
const btnConfirmar = document.getElementById("btnConfirmar");

const errorNombre = document.getElementById("errorNombre");
const errorApellido = document.getElementById("errorApellido");
const errorEmail = document.getElementById("errorEmail");
const errorNombreUsuario = document.getElementById("errorNombreDeUsuario");
const errorContrasenia = document.getElementById("errorContrasenia");
const errorRepetirContrasenia = document.getElementById(
  "errorRepetirContrasenia"
);
const errorMetodoPago = document.getElementById("errorMetodoPago");
const errorNumeroTarjeta = document.getElementById("errorNumeroTarjeta");
const errorClaveTarjeta = document.getElementById("errorClaveTarjeta");

function esSoloTextoConTildesYenies(texto) {
  if (texto.trim().toLowerCase() === "") {
    return false;
  }

  return /^[a-zA-ZáéióúñÁÉÍÓÚÑ\s]+$/.test(texto);
}

function validarEmail(email) {
  if (email.trim() === "") {
    return false;
  }
  return /^[a-z][a-z0-9._%+-]+@[a-z][a-z0-9._%+-]+\.[a-z]{2,}$/.test(email);
  //  /^[_a-z0-9-]+(\.[_a-z0-9-]+)@[a-z0-9-]+(\.[a-z0-9-]+)(\.[a-z]{2,3})$/
}

function validaLetrasYnumeros(texto) {
  if (texto.trim().toLowerCase() === "") {
    return false;
  }
  return /^[a-zA-Z][a-zA-Z0-9\s]+$/.test(texto);
}

function esLetra(letra) {
  if (letra.trim() === "") {
    return false;
  }
  return /[a-zA-Z]/.test(letra);
}

function esNumero(numero) {
  if (numero.trim() === "") {
    return false;
  }
  return /[0-9]/.test(numero);
}

function esCaracterEspecial(caracterEspecial) {
  if (caracterEspecial.trim() === "") {
    return false;
  }
  return /[._%+-]/.test(caracterEspecial);
}

function validaContrasenia(contrasenia) {
  let letras = 0;
  let numeros = 0;
  let caracteresEspeciales = 0;
  let x;
  for (let i = 0; i < contrasenia.length; i++) {
    x = contrasenia.charAt(i);
    esLetra(x) && letras++;
    esNumero(x) && numeros++;
    esCaracterEspecial(x) && caracteresEspeciales++;
  }

  if (
    letras >= 2 &&
    numeros >= 2 &&
    caracteresEspeciales >= 2 &&
    contrasenia.length >= 8
  ) {
    return true;
  }
  return false;
}

function validarRepetirContrasenia(contrasenia1, contrasenia2) {
  // console.log(contrasenia1 + "\n" + contrasenia2);
  return contrasenia1 === contrasenia2;
}

function validaNumeroDeTarjeta(numeroTarjeta) {
  if (!esMetodoTarjetaSeleccionado()) {
    return true; // Si no es tarjeta, siempre válido
  }
  const LARGO_TARJETA = 16;
  let x;
  let sumatoria = 0;

  if (numeroTarjeta.length !== LARGO_TARJETA) {
    return false;
  }

  for (let i = 0; i < LARGO_TARJETA; i++) {
    x = numeroTarjeta.charAt(i);
    if (!esNumero(x)) {
      return false;
    }
    let num = parseInt(x);
    sumatoria += num;
  }

  return sumatoria % 2 === 1;
}

function validarClaveTarjeta(claveTarjeta) {
  if (!esMetodoTarjetaSeleccionado()) {
    return true; // Si no es tarjeta, siempre válido
  }
  const LARGO_CLAVE = 3;
  if (claveTarjeta.length !== LARGO_CLAVE || claveTarjeta.includes("0")) {
    return false;
  }
  return true;
}

function esMetodoTarjetaSeleccionado() {
  return radioTarjeta.checked;
}

function actualizarEstadoCamposTarjeta() {
  const activa = esMetodoTarjetaSeleccionado();
  numeroTarjeta.disabled = !activa;
  claveTarjeta.disabled = !activa;

  if (!activa) {
    numeroTarjeta.value = "";
    claveTarjeta.value = "";
    errorNumeroTarjeta.textContent = "";
    errorClaveTarjeta.textContent = "";
  }
}

function esMetodoCuponSeleccionado() {
  if (radioCupon.checked) {
    return true;
  }
  return false;
}

function actualizarEstadoCamposCupon() {
  const activa = esMetodoCuponSeleccionado();
  checkPagoFacil.disabled = !activa;
  checkRapiPago.disabled = !activa;

  if (!activa) {
    checkPagoFacil.value = "";
    checkRapiPago.value = "";
    checkPagoFacil.textContent = "";
    checkRapiPago.textContent = "";
  }
}

function validarMetodoPagoSeleccionado() {
  return (
    radioTarjeta.checked || radioCupon.checked || radioTransferencia.checked
  );
}
/*
    Machete sobre regexp:
    ^ = comienza con (pattern/patrón) por ejemplo: ^[a-f]  valida que empiece con a,b,c,d,e o f
    Es decir que "a hola 123!" es algo válido

    Los corchetes agrupan patrones, por ejemplo [a-zA-Z0-9] valida letras (sin tildes ni nada raro) y números

    El signo * significa "cero o más apariciones del patrón" (puede o no estar).
    ^[a-z]*  Significa que empiece con una letra minúscula, o ninguna... es decir, que pasa con cualquier cosa.

    El signo + significa "una o más apariciones del patrón".
    ^[a-z]+  Significa que empiece con una letra minúscula, y pueda seguir con más letras minúsculas.

    ^[A-Z][a-z]+  Significa que empiece con una letra mayúscula y siga con minúsculas.

    ^// [A-Z][a-z]+  Significa que empiece con doble barra, siga con un espacio, luego una letra mayúscula y siga con minúsculas. 
    como la / se usa como separador en las regexp (por ejemplo /^[A-Z]/), cuando se usa hay que "escaparla", con una \ 
    Quedando cada / como \/ del mismo modo que newline se escribe \n o tab se escribe \t

    
     // Eso hace ChatGPT en los comentarios.
     Pero como los comentarios no están siempre al principio de la línea, sería oportuno quitarle el ^, quedando:
     \/\/ [A-Z][a-z]+

    Las {} indican el mínimo(izq) y el máximo(der) de repeticiones que puede haber del patrón previo, ejemplo:
    \.[a-z]{2,0}$/, esto significa que mínimo tiene que haber 2 repeticiones del patrón previo a infinito.
     */

function limpiarErrores() {
  errorNombre.textContent = "";
  errorApellido.textContent = "";
  errorEmail.textContent = "";
  errorNombreUsuario.textContent = "";
  errorContrasenia.textContent = "";
  errorRepetirContrasenia.textContent = "";
  errorMetodoPago.textContent = "";
  errorNumeroTarjeta.textContent = "";
  errorClaveTarjeta.textContent = "";
}

function verificarTodosLosCampos(evento) {
  let invalido = false;
  if (
    !esSoloTextoConTildesYenies(nombre.value) ||
    !esSoloTextoConTildesYenies(apellido.value) ||
    !validarEmail(email.value) ||
    !validaLetrasYnumeros(nombreDeUsuario.value) ||
    !validaContrasenia(contrasenia.value) ||
    !validarRepetirContrasenia(contrasenia.value, repetirContrasenia.value) ||
    !validaNumeroDeTarjeta(numeroTarjeta.value) ||
    !validarClaveTarjeta(claveTarjeta.value) ||
    !validarMetodoPagoSeleccionado()
  ) {
    invalido = true;
  }

  if (!invalido) {
    let usuariosStorage = JSON.parse(localStorage.getItem("usuarios"));

    let encontrado = false;
    usuariosStorage?.forEach((u) => {
      if (u.nombreDeUsuario === nombreDeUsuario.value) {
        encontrado = true;
      }
    });
    if (!encontrado) {
      btnConfirmar.addEventListener("click", guardarDatosEnLocalStorage);
      btnConfirmar.disabled = invalido;
    }
  }
}

// A cada formulario que esté entre corchetes, se lo va a controlar por cada cambio
[
  nombre,
  apellido,
  email,
  nombreDeUsuario,
  contrasenia,
  repetirContrasenia,
  numeroTarjeta,
  claveTarjeta,
  radioTarjeta,
  radioCupon,
  radioTransferencia,
  checkPagoFacil,
  checkRapiPago,
].forEach((elemento) =>
  elemento.addEventListener("input", verificarTodosLosCampos)
);

nombre.addEventListener("input", (evento) => {
  if (esSoloTextoConTildesYenies(evento.target.value)) {
    errorNombre.textContent = "";
  } else {
    errorNombre.textContent = "El nombre sólo debe tener letras";
  }
});

apellido.addEventListener("input", (evento) => {
  if (esSoloTextoConTildesYenies(evento.target.value)) {
    errorApellido.textContent = "";
  } else {
    errorApellido.textContent = "Apellido incorrecto, deben ser sólo letras";
  }
});

email.addEventListener("input", (evento) => {
  if (validarEmail(evento.target.value)) {
    errorEmail.textContent = "";
  } else {
    errorEmail.textContent = "Email incorrecto";
  }
});

nombreDeUsuario.addEventListener("input", (evento) => {
  if (validaLetrasYnumeros(evento.target.value)) {
    errorNombreUsuario.textContent = "";
  } else {
    errorNombreUsuario.textContent = "Nombre de usuario incorrecto";
  }
});

contrasenia.addEventListener("input", (evento) => {
  if (validaContrasenia(evento.target.value)) {
    errorContrasenia.textContent = "";
  } else {
    errorContrasenia.textContent =
      "Mín. 8 caracteres: 2 letras, 2 números y 2 símbolos";
  }
});

repetirContrasenia.addEventListener("input", (evento) => {
  if (validarRepetirContrasenia(evento.target.value, contrasenia.value)) {
    errorRepetirContrasenia.textContent = "";
  } else {
    errorRepetirContrasenia.textContent = "Las contraseñas no coinciden.";
  }
});

numeroTarjeta.addEventListener("input", (evento) => {
  if (validaNumeroDeTarjeta(evento.target.value)) {
    errorNumeroTarjeta.textContent = "";
  } else {
    errorNumeroTarjeta.textContent =
      "Los números de la tarjeta no son válidos o superó la cantidad de números posibles.";
  }
});

claveTarjeta.addEventListener("input", (evento) => {
  if (validarClaveTarjeta(evento.target.value)) {
    errorClaveTarjeta.textContent = "";
  } else {
    errorClaveTarjeta.textContent =
      "La clave no puede contener ningún cero o superó el largo permitido";
  }
});

metodoPagoRadios.forEach((radio) => {
  radio.addEventListener("change", () => {
    errorMetodoPago.textContent = "";
    actualizarEstadoCamposTarjeta();
    actualizarEstadoCamposCupon();
  });
});

checkPagoFacil.addEventListener("change", (evento) => {
  if (checkPagoFacil.checked) {
    checkRapiPago.disabled = true;
  } else {
    checkRapiPago.disabled = false;
  }
});

checkRapiPago.addEventListener("change", (evento) => {
  if (checkRapiPago.checked) {
    checkPagoFacil.disabled = true;
  } else {
    checkPagoFacil.disabled = false;
  }
});

function guardarDatosEnLocalStorage() {
  let usuariosStorage = JSON.parse(localStorage.getItem("usuarios"));
  let usuarios = [];
  usuariosStorage?.forEach((u) => {
    usuarios.push(u);
  });
  let nuevoUsuario = {
    nombre: nombre.value,
    apellido: apellido.value,
    email: email.value,
    nombreDeUsuario: nombreDeUsuario.value,
    contrasenia: contrasenia.value, //Habría que guardar un hash(md5).
    medioDePago: {
      tarjeta: {
        numero: numeroTarjeta.value || "",
        clave: claveTarjeta.value || "",
        seleccionado: radioTarjeta.checked,
      },
      cupon: {
        pagoFacil: checkPagoFacil.checked,
        rapiPago: checkRapiPago.checked,
        seleccionado: radioCupon.checked,
      },
      transferencia: {
        seleccionado: radioTransferencia.checked,
      },
    },
  };
  usuarios.push(nuevoUsuario);
  localStorage.setItem("usuarios", JSON.stringify(usuarios));

  window.location.replace("./index.html");
}
