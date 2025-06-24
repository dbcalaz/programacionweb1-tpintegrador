const galeria = document.getElementById('galeriaPeliculas');
const inputNombre = document.getElementById('buscador');
const selectCategoria = document.getElementById('categoria');
const peliculas = CONTENIDO.peliculas;

function mostrarPeliculas(items) {
  galeria.innerHTML = '';
  let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];

  if (items.length === 0) {
    galeria.innerHTML = '<p class="mensaje-error">No se encontraron resultados.</p>';
    return;
  }

  for (let i = 0; i < items.length; i++) {
    let item = items[i];
    let div = document.createElement('div');
    div.classList.add('foto');

    // clave única para evitar conflictos con series
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

    let corazon = div.querySelector('.corazon');

    // Buscar si está en favoritos
    for (let j = 0; j < favoritos.length; j++) {
      if (favoritos[j].id == item.id && favoritos[j].tipo === 'pelicula') {
        corazon.classList.add('pintado');
        break;
      }
    }
  }
}

// Filtrar películas
function filtrarPeliculas() {
  const nombre = inputNombre.value.toLowerCase().trim();
  const categoria = selectCategoria.value.toLowerCase();

  const filtradas = peliculas.filter(function(pelicula) {
    const coincideNombre = pelicula.titulo.toLowerCase().startsWith(nombre);
    const coincideCategoria =
      categoria === 'todas' ||
      categoria === 'vacio' ||
      pelicula.genero.some(function(g) {
        return g.toLowerCase() === categoria;
      });

    return coincideNombre && coincideCategoria;
  });

  mostrarPeliculas(filtradas);
}

inputNombre.addEventListener('input', filtrarPeliculas);
selectCategoria.addEventListener('change', filtrarPeliculas);

// Al hacer click marcar favoritos
document.addEventListener('click', function (event) {
  const corazon = event.target.closest('.corazon');

  if (corazon) {
    const clave = corazon.id;
    const [id, tipo] = clave.split('-');
    let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];

    const item = peliculas.find(p => p.id == id); // buscamos la película
    const yaExiste = favoritos.find(fav => fav.id == id && fav.tipo === tipo);

    if (yaExiste) {
      favoritos = favoritos.filter(fav => !(fav.id == id && fav.tipo === tipo));
      corazon.classList.remove('pintado');
    } else {
      favoritos.push({ ...item, tipo: 'pelicula' }); // agregamos con tipo
      corazon.classList.add('pintado');
    }

    localStorage.setItem('favoritos', JSON.stringify(favoritos));
  }
});

// Mostrar todas al cargar
mostrarPeliculas(peliculas);