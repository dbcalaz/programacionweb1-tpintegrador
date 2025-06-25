document.addEventListener("DOMContentLoaded", function () {
  const inputEmail = document.getElementById("gmail");
  const inputUsuario = document.getElementById("usuario");
  const botonEnviar = document.querySelector(".boton-confirmar");
  const form = document.querySelector("form");

  // Desactivar botón inicialmente
  botonEnviar.disabled = true;

  // Habilitar si ambos campos están llenos
  function validarCampos() {
    const emailLleno = inputEmail.value.trim().length > 0;
    const usuarioLleno = inputUsuario.value.trim().length > 0;
    botonEnviar.disabled = !(emailLleno && usuarioLleno);
  }

  inputEmail.addEventListener("input", validarCampos);
  inputUsuario.addEventListener("input", validarCampos);

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    const emailIngresado = inputEmail.value.trim();
    const usuarioIngresado = inputUsuario.value.trim();

    const usuarioEncontrado = usuarios.find(u =>
      u.email === emailIngresado && u.nombreDeUsuario === usuarioIngresado
    );

    if (usuarioEncontrado) {
      alert("Se ha enviado un email para restablecer la contraseña.");
      window.location.href = "./index.html";
    } else {
      alert("Los datos ingresados no coinciden con ningún usuario registrado.");
    }
  });
});