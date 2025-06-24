const formulario = document.getElementById("form");

const nombre = document.getElementById("nombre");
const apellido = document.getElementById("apellido");
const btnConfirmar = document.getElementById("btnConfirmar");

const errorNombre = document.getElementById("errorNombre");
const errorApellido = document.getElementById("errorApellido");

function esSoloTexto(texto) {
  if (texto.trim() === "") {
    return false;
  }

  return /^[a-zA-Z]+$/.test(texto);
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

     */

function limpiarErrores() {
  errorNombre.textContent = "";
  errorApellido.textContent = "";
}

function verificarTodosLosCampos(evento) {
  let invalido = false;
  if (!esSoloTexto(nombre.value) || !esSoloTexto(apellido.value) ) {
    invalido = true;
  }
  btnConfirmar.disabled = invalido;
}

// A cada formulario que esté entre corchetes, se lo va a controlar por cada cambio
[nombre, apellido].forEach((elemento) =>
  elemento.addEventListener("input", verificarTodosLosCampos)
);

nombre.addEventListener("input", (evento) => {
  console.log("Validando nombre");
  if (esSoloTexto(evento.target.value)) {
    errorNombre.textContent = "";
  } else {
    errorNombre.textContent = "El nombre sólo debe tener letras";
  }
});

apellido.addEventListener("input", (evento) => {
  if (esSoloTexto(evento.target.value)) {
    errorApellido.textContent = "";
  } else {
    errorApellido.textContent = "Apellido incorrecto, deben ser sólo letras";
  }
});


