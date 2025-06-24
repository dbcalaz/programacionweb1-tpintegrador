  const inputUsuario = document.getElementById("usuario");
  const inputContrasenia = document.getElementById("contraseña");
  const botonLogin = document.querySelector(".boton-login");
  const form = document.querySelector("form");

  // Desactivar botón al cargar
  botonLogin.disabled = true;

  // Habilitar solo si ambos campos tienen texto
  function validarInputs() {
    const usuarioLleno = inputUsuario.value.trim().length > 0;
    const contraseniaLlena = inputContrasenia.value.trim().length > 0;
    botonLogin.disabled = !(usuarioLleno && contraseniaLlena);
  }

  inputUsuario.addEventListener("input", validarInputs);
  inputContrasenia.addEventListener("input", validarInputs);

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Obtener el array de usuarios
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    // Datos ingresados por el usuario
    const nombreIngresado = inputUsuario.value.trim();
    const contraseniaIngresada = inputContrasenia.value.trim();

    // Buscar usuario válido
    const usuarioEncontrado = usuarios.find(u =>
      (u.nombreUsuario === nombreIngresado || u.email === nombreIngresado) &&
      u.contrasenia === contraseniaIngresada
    );

    if (usuarioEncontrado) {
      // Guardar usuario activo (email o nombreUsuario)
      localStorage.setItem("usuarioActivo", JSON.stringify(usuarioEncontrado));
      window.location.href = "./galeria.html";
    } else {
      alert("Nombre de usuario o contraseña incorrectos.");
    }
  });

