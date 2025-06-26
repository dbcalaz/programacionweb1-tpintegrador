const galeria = document.getElementById('galeriaPeliculas');
const inputNombre = document.getElementById('buscador');
const selectCategoria = document.getElementById('categoria');
const peliculas = CONTENIDO.peliculas;

// Obtener usuario activo y lista de usuarios
const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));
const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
const indiceUsuario = usuarios.findIndex(u => u.email === usuarioActivo.email);
let favoritos = usuarios[indiceUsuario].favoritos || [];

function mostrarPeliculas(items) {
  galeria.innerHTML = '';

  if (items.length === 0) {
    galeria.innerHTML = '<p class="mensaje-error">No se encontraron resultados.</p>';
    return;
  }

  for (let i = 0; i < items.length; i++) {
    let item = items[i];
    let div = document.createElement('div');
    div.classList.add('foto');

    const clave = `${item.id}-pelicula`;

    div.innerHTML = `
      <a href="detallePelicula.html?id=${item.id}">
        <img src="${item.imagen}" alt="${item.titulo}" />
      </a>
      <div class="corazon" id="${clave}">
        <img src="./images/corazon4.png" alt="corazon" />
      </div>
    `;

    galeria.appendChild(div);

    const corazon = div.querySelector('.corazon');

    // Marcar si está en favoritos
    if (favoritos.some(f => f.id == item.id && f.tipo === 'pelicula')) {
      corazon.classList.add('pintado');
    }
  }
}

// Filtrar películas
function filtrarPeliculas() {
  const nombre = inputNombre.value.toLowerCase().trim();
  const categoria = selectCategoria.value.toLowerCase();

  const filtradas = peliculas.filter(function (pelicula) {
    const coincideNombre = pelicula.titulo.toLowerCase().includes(nombre);
    const coincideCategoria =
      categoria === 'todas' ||
      categoria === 'vacio' ||
      pelicula.genero.some(g => g.toLowerCase() === categoria);

    return coincideNombre && coincideCategoria;
  });

  mostrarPeliculas(filtradas);
}

inputNombre.addEventListener('input', filtrarPeliculas);
selectCategoria.addEventListener('change', filtrarPeliculas);

// Click para marcar/desmarcar favoritos
document.addEventListener('click', function (event) {
  const corazon = event.target.closest('.corazon');

  if (corazon) {
    const clave = corazon.id;
    const [id, tipo] = clave.split('-');

    const item = peliculas.find(p => p.id == id);
    const yaExiste = favoritos.find(fav => fav.id == id && fav.tipo === tipo);

    if (yaExiste) {
      favoritos = favoritos.filter(fav => !(fav.id == id && fav.tipo === tipo));
      corazon.classList.remove('pintado');
    } else {
      favoritos.push({ ...item, tipo: 'pelicula' });
      corazon.classList.add('pintado');
    }

    // Guardar cambios en usuario activo
    usuarios[indiceUsuario].favoritos = favoritos;
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    localStorage.setItem("usuarioActivo", JSON.stringify(usuarios[indiceUsuario]));
  }
});

// Mostrar todas al inicio
mostrarPeliculas(peliculas);