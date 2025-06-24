const nombre = document.getElementById("nombre");
const apellido = document.getElementById("apellido");
const email = document.getElementById("email");
const nombreUsuario = document.getElementById("nombreDeUsuario");
const contrasenia = document.getElementById("contrasenia");
const repetirContrasenia = document.getElementById("repetirContrasenia");
const btnConfirmar = document.getElementById("btnConfirmar");

const errorNombre = document.getElementById("errorNombre");
const errorApellido = document.getElementById("errorApellido");
const errorEmail = document.getElementById("errorEmail");
const errorNombreUsuario = document.getElementById("errorNombreDeUsuario");
const errorContrasenia = document.getElementById("errorContrasenia");
const errorRepetirContrasenia = document.getElementById(
  "errorRepetirContrasenia"
);

function esSoloTextoConTildesYenies(texto) {
  if (texto.trim() === "") {
    return false;
  }

  return /^[a-zA-ZáéióúñÁÉÍÓÚÑ]+$/.test(texto);
}

function validarEmail(email) {
  if (email.trim() === "") {
    return false;
  }
  return /^[a-z][a-z0-9._%+-]+@[a-z][a-z0-9._%+-]+\.[a-z]{2,}$/.test(email);
  //  /^[_a-z0-9-]+(\.[_a-z0-9-]+)@[a-z0-9-]+(\.[a-z0-9-]+)(\.[a-z]{2,3})$/
}

function validaLetrasYnumeros(texto) {
  if (texto.trim() === "") {
    return false;
  }
  return /^[a-z][a-z0-9]+$/.test(texto);
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
  console.log(contrasenia1 + "\n" + contrasenia2);
  return contrasenia1 === contrasenia2;
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
}

function verificarTodosLosCampos(evento) {
  let invalido = false;
  if (
    !esSoloTextoConTildesYenies(nombre.value) ||
    !esSoloTextoConTildesYenies(apellido.value) ||
    !validarEmail(email.value) ||
    !validaLetrasYnumeros(nombreUsuario.value) ||
    !validaContrasenia(contrasenia.value) ||
    !validarRepetirContrasenia(contrasenia.value, repetirContrasenia.value)
  ) {
    invalido = true;
  }
  btnConfirmar.disabled = invalido;
  !invalido &&
    btnConfirmar.addEventListener("click", guardarDatosEnLocalStorage);
}

// A cada formulario que esté entre corchetes, se lo va a controlar por cada cambio
[
  nombre,
  apellido,
  email,
  nombreUsuario,
  contrasenia,
  repetirContrasenia,
].forEach((elemento) =>
  elemento.addEventListener("input", verificarTodosLosCampos)
);

nombre.addEventListener("input", (evento) => {
  console.log("Validando nombre");
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

nombreUsuario.addEventListener("input", (evento) => {
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
      "Contraseña debe tener un mínimo de 8 caracteres. Mínimo 2 letras, 2 números y 2 caracteres especiales.";
  }
});

repetirContrasenia.addEventListener("input", (evento) => {
  if (validarRepetirContrasenia(evento.target.value, contrasenia.value)) {
    errorRepetirContrasenia.textContent = "";
  } else {
    errorRepetirContrasenia.textContent = "Las contraseñas no coinciden.";
  }
});

function guardarDatosEnLocalStorage() {
  let usuariosStorage = JSON.parse(localStorage.getItem("usuarios"));
  console.log("Guardando datos", usuariosStorage);
  let usuarios = [];
  usuariosStorage?.forEach((u) => {
    usuarios.push(u);
  });
  let nuevoUsuario = {
    nombre: nombre.value,
    apellido: apellido.value,
    email: email.value,
    nombreDeUsuario: nombreUsuario.value,
    contrasenia: contrasenia.value, //Habría que guardar un hash(md5).
  };
  usuarios.push(nuevoUsuario);
  localStorage.setItem("usuarios", JSON.stringify(usuarios));

  window.location.replace("./index.html");


  //TODO: evitar que se repetira el usuario.
}
