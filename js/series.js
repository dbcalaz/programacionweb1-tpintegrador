const galeria = document.getElementById('galeriaSeries');
const inputNombre = document.getElementById('buscador');
const selectCategoria = document.getElementById('categoria');
const series = CONTENIDO.series;

// Obtener usuario activo y usuarios
const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));
const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
const indiceUsuario = usuarios.findIndex(u => u.email === usuarioActivo.email);
let favoritos = usuarios[indiceUsuario].favoritos || [];

// Mostrar series
function mostrarSeries(items) {
  galeria.innerHTML = '';

  if (items.length === 0) {
    galeria.innerHTML = '<p class="mensaje-error">No se encontraron resultados.</p>';
    return;
  }

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const div = document.createElement('div');
    div.classList.add('foto');

    const clave = `${item.id}-serie`;

    div.innerHTML = `
      <a href="detalleSerie.html?id=${item.id}">
        <img src="${item.imagen}" alt="${item.titulo}" />
      </a>
      <div class="corazon" id="${clave}">
        <img src="./images/corazon4.png" alt="corazon" />
      </div>
    `;

    galeria.appendChild(div);

    let corazon = div.querySelector('.corazon');

    // Marcar favoritos pintados si ya estaban
    if (favoritos.some(f => f.id == item.id && f.tipo === 'serie')) {
      corazon.classList.add('pintado');
    }
  }
}

// Filtrar series
function filtrarSeries() {
  const nombre = inputNombre.value.toLowerCase().trim();
  const categoria = selectCategoria.value.toLowerCase();

  const filtradas = series.filter(function (serie) {
    const coincideNombre = serie.titulo.toLowerCase().startsWith(nombre);
    const coincideCategoria =
      categoria === 'todas' ||
      categoria === 'vacio' ||
      serie.genero.some(g => g.toLowerCase() === categoria);

    return coincideNombre && coincideCategoria;
  });

  mostrarSeries(filtradas);
}

// Listeners
inputNombre.addEventListener('input', filtrarSeries);
selectCategoria.addEventListener('change', filtrarSeries);

// Click para marcar/desmarcar favoritos
document.addEventListener('click', function (event) {
  const corazon = event.target.closest('.corazon');

  if (corazon) {
    const clave = corazon.id;
    const [id, tipo] = clave.split('-');

    const item = series.find(s => s.id == id);
    const yaExiste = favoritos.find(fav => fav.id == id && fav.tipo === tipo);

    if (yaExiste) {
      favoritos = favoritos.filter(fav => !(fav.id == id && fav.tipo === tipo));
      corazon.classList.remove('pintado');
    } else {
      favoritos.push({ ...item, tipo: 'serie' });
      corazon.classList.add('pintado');
    }

    // Actualizar usuario y guardar cambios
    usuarios[indiceUsuario].favoritos = favoritos;
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    localStorage.setItem("usuarioActivo", JSON.stringify(usuarios[indiceUsuario]));
  }
});

// Mostrar todas al inicio
mostrarSeries(series);