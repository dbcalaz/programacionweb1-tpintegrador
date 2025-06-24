const galeria = document.getElementById('galeriaSeries');
const inputNombre = document.getElementById('buscador');
const selectCategoria = document.getElementById('categoria');
const series = CONTENIDO.series;

// Mostrar series
function mostrarSeries(items) {
  galeria.innerHTML = '';
  const favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];

  if (items.length === 0) {
    galeria.innerHTML = '<p class="mensaje-error">No se encontraron resultados.</p>';
    return;
  }

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const div = document.createElement('div');
    div.classList.add('foto');

    // clave única para evitar conflictos
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

    // Buscar si está en favoritos
    for (let j = 0; j < favoritos.length; j++) {
      if (favoritos[j].id == item.id && favoritos[j].tipo === 'serie') {
        corazon.classList.add('pintado');
        break;
      }
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
      serie.genero.some(function (g) {
        return g.toLowerCase() === categoria;
      });
    return coincideNombre && coincideCategoria;
  });

  mostrarSeries(filtradas);
}

// Listeners
inputNombre.addEventListener('input', filtrarSeries);
selectCategoria.addEventListener('change', filtrarSeries);

// Al hacer click marcar favoritos
document.addEventListener('click', function (event) {
  const corazon = event.target.closest('.corazon');

  if (corazon) {
    const clave = corazon.id;
    const [id, tipo] = clave.split('-');
    let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];

    const item = series.find(s => s.id == id);
    const yaExiste = favoritos.find(fav => fav.id == id && fav.tipo === tipo);

    if (yaExiste) {
      favoritos = favoritos.filter(fav => !(fav.id == id && fav.tipo === tipo));
      corazon.classList.remove('pintado');
    } else {
      favoritos.push({ ...item, tipo: 'serie' });
      corazon.classList.add('pintado');
    }

    localStorage.setItem('favoritos', JSON.stringify(favoritos));
  }
});

// Mostrar todas al cargar
mostrarSeries(series);