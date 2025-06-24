document.addEventListener("DOMContentLoaded", () => {
  const inputUsuario = document.getElementById("usuario");
  const inputContrasenia = document.getElementById("contrasenia");
  const botonLogin = document.querySelector(".boton-login");
  const form = document.querySelector("form");

  // Habilitar botón solo si ambos campos están completos
  function validarInputs() {
    const usuarioLleno = inputUsuario.value.trim().length > 0;
    const contraseniaLlena = inputContrasenia.value.trim().length > 0;
    botonLogin.disabled = !(usuarioLleno && contraseniaLlena);
  }

  inputUsuario.addEventListener("input", validarInputs);
  inputContrasenia.addEventListener("input", validarInputs);

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Obtener usuarios registrados
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    const nombreIngresado = inputUsuario.value.trim();
    const contraseniaIngresada = inputContrasenia.value.trim();

    // Buscar usuario por nombreUsuario + contraseña
    const usuarioEncontrado = usuarios.find(
      (u) =>
        // TODO: se puede hacer login con el mail?
        u.nombreDeUsuario === nombreIngresado  /*|| u.email === nombreIngresado*/ &&
        u.contrasenia === contraseniaIngresada
    );

    if (usuarioEncontrado) {
      // Guardar usuario activo
      localStorage.setItem("usuarioActivo", JSON.stringify(usuarioEncontrado));
      window.location.href = "./galeria.html";
    } else {
      alert("Nombre de usuario o contraseña incorrectos.");
    }
  });
});
