const formulario = document.getElementById("form");

const nombre = document.getElementById("nombre");
const apellido = document.getElementById("apellido");
const email = document.getElementById("email");
const nombreUsuario = document.getElementById("nombreDeUsuario");
const btnConfirmar = document.getElementById("btnConfirmar");

const errorNombre = document.getElementById("errorNombre");
const errorApellido = document.getElementById("errorApellido");
const errorEmail = document.getElementById("errorEmail");
const errorNombreUsuario = document.getElementById("errorNombreDeUsuario");

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
}

function verificarTodosLosCampos(evento) {
  let invalido = false;
  if (
    !esSoloTextoConTildesYenies(nombre.value) ||
    !esSoloTextoConTildesYenies(apellido.value) ||
    !validarEmail(email.value) ||
    !validaLetrasYnumeros(nombreUsuario.value)
  ) {
    invalido = true;
  }
  btnConfirmar.disabled = invalido;
}

// A cada formulario que esté entre corchetes, se lo va a controlar por cada cambio
[nombre, apellido, email, nombreUsuario].forEach((elemento) =>
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
