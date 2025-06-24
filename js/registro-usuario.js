// Selecciono el formulario completo para escuchar el evento "submit"
const formulario = document.getElementById("form");
// Obtengo los elementos del formulario
const nombre = document.getElementById("nombre");
const apellido = document.getElementById("apellido");
const email = document.getElementById("email");
const nombreUsuario = document.getElementById("nombreDeUsuario");
const contrasenia = document.getElementById("contrasenia");
const repetirContrasenia = document.getElementById("repetirContrasenia");
const metodoPagoRadios = document.getElementsByName("metodoPago");
const numeroTarjeta = document.getElementById("numeroTarjeta");
const claveTarjeta = document.getElementById("claveTarjeta");
const btnConfirmar = document.getElementById("btnConfirmar");

// Errores
const errorNombre = document.getElementById("errorNombre");
const errorApellido = document.getElementById("errorApellido");
const errorEmail = document.getElementById("errorEmail");
const errorNombreUsuario = document.getElementById("errorNombreDeUsuario");
const errorContrasenia = document.getElementById("errorContrasenia");
const errorRepetirContrasenia = document.getElementById("errorRepetirContrasenia");
const errorMetodoPago = document.getElementById("errorMetodoPago");
const errorNumeroTarjeta = document.getElementById("errorNumeroTarjeta");
const errorClaveTarjeta = document.getElementById("errorClaveTarjeta");

// Funciones de validación
function validarTexto(texto) {
  return /^[a-zA-Z]+$/.test(texto);
}

function validarNombreUsuario(nombreUsuario) {
  return /^[a-zA-Z0-9]+$/.test(nombreUsuario);
}

function validarEmail(email) {
  return /\S+@\S+\.\S+/.test(email);
}

function validarContrasenia(valor) {
  return /^(?=(?:.*[a-zA-Z]){2,})(?=(?:.*\d){2,})(?=(?:.*[^a-zA-Z0-9]){2,}).{8,}$/.test(valor);
}

function validarRepetirContrasenia(c1, c2) {
  return c1 === c2;
}

function validarNumeroTarjeta(numeroTarjeta) {
  const n = numeroTarjeta.toString();
  if (n.length !== 16) return false;

  const ultimo = parseInt(n[15]);
  let suma = 0;
  for (let i = 0; i < 15; i++) {
    suma += parseInt(n[i]);
  }

  return suma % 2 === 0 ? ultimo % 2 === 1 : ultimo % 2 === 0;
}

function validarClaveTarjetaCredito(clave) {
  if (clave.length !== 3) return false;
  return !clave.includes("0");
}

function validarMetodoPagoSeleccionado() {
  return Array.from(metodoPagoRadios).some(r => r.checked);
}

function esMetodoTarjetaSeleccionado() {
  return Array.from(metodoPagoRadios).some(r => r.checked && r.value === "tarjeta");
}

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

// Habilitar o deshabilitar campos de tarjeta
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

// Botón Confirmar activado solo si todo está válido
function verificarEstadoBotonConfirmar() {
  let camposOk =
    nombre.value.trim() !== "" &&
    apellido.value.trim() !== "" &&
    email.value.trim() !== "" &&
    nombreUsuario.value.trim() !== "" &&
    contrasenia.value.trim() !== "" &&
    repetirContrasenia.value.trim() !== "" &&
    validarEmail(email.value) &&
    validarTexto(nombre.value) &&
    validarTexto(apellido.value) &&
    validarNombreUsuario(nombreUsuario.value) &&
    validarContrasenia(contrasenia.value) &&
    validarRepetirContrasenia(contrasenia.value, repetirContrasenia.value) &&
    validarMetodoPagoSeleccionado();

  if (esMetodoTarjetaSeleccionado()) {
    camposOk =
      camposOk &&
      validarNumeroTarjeta(numeroTarjeta.value) &&
      validarClaveTarjetaCredito(claveTarjeta.value);
  }

  btnConfirmar.disabled = !camposOk;
}

// Escuchas de cambios en todos los campos relevantes
[nombre, apellido, email, nombreUsuario, contrasenia, repetirContrasenia, numeroTarjeta, claveTarjeta].forEach(el =>
  el.addEventListener("input", verificarEstadoBotonConfirmar)
);

metodoPagoRadios.forEach(radio => {
  radio.addEventListener("change", () => {
    errorMetodoPago.textContent = "";
    actualizarEstadoCamposTarjeta();
    verificarEstadoBotonConfirmar();
  });
});

// Evento principal del formulario
formulario.addEventListener("submit", function (event) {
  let valido = true;
  limpiarErrores();

  if (!validarTexto(nombre.value)) {
    errorNombre.textContent = "Nombre inválido.";
    valido = false;
  }

  if (!validarTexto(apellido.value)) {
    errorApellido.textContent = "Apellido inválido.";
    valido = false;
  }

  if (!validarEmail(email.value)) {
    errorEmail.textContent = "Email inválido.";
    valido = false;
  }

  if (!validarNombreUsuario(nombreUsuario.value)) {
    errorNombreUsuario.textContent = "Nombre de usuario inválido.";
    valido = false;
  }

  if (!validarContrasenia(contrasenia.value)) {
    errorContrasenia.textContent = "Mínimo 8 caracteres, 2 letras, 2 números y 2 símbolos.";
    valido = false;
  }

  if (!validarRepetirContrasenia(contrasenia.value, repetirContrasenia.value)) {
    errorRepetirContrasenia.textContent = "Las contraseñas no coinciden.";
    valido = false;
  }

  if (!validarMetodoPagoSeleccionado()) {
    errorMetodoPago.textContent = "Seleccioná un método de pago.";
    valido = false;
  } else if (esMetodoTarjetaSeleccionado()) {
    if (!validarNumeroTarjeta(numeroTarjeta.value)) {
      errorNumeroTarjeta.textContent = "Número de tarjeta inválido.";
      valido = false;
    }

    if (!validarClaveTarjetaCredito(claveTarjeta.value)) {
      errorClaveTarjeta.textContent = "Clave inválida (3 dígitos distintos de cero).";
      valido = false;
    }
  }

  if (!valido) {
    event.preventDefault();
    return;
  }

  // Crear y guardar usuario
  const nuevoUsuario = {
    nombre: nombre.value,
    apellido: apellido.value,
    nombreUsuario: nombreUsuario.value,
    email: email.value,
    contrasenia: contrasenia.value,
  };

  let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

  const yaExiste = usuarios.some(
    u => u.email === nuevoUsuario.email || u.nombreUsuario === nuevoUsuario.nombreUsuario
  );

  if (yaExiste) {
    alert("Ya existe un usuario con ese email o nombre de usuario.");
    event.preventDefault();
    return;
  }

  usuarios.push(nuevoUsuario);
  localStorage.setItem("usuarios", JSON.stringify(usuarios));
});

// Al cargar la página
actualizarEstadoCamposTarjeta();
verificarEstadoBotonConfirmar();




