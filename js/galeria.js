const galeria = document.getElementById('galeria');
const inputNombre = document.getElementById('buscador');
const selectCategoria = document.getElementById('categoria');

const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));

if (!usuarioActivo) {
  alert("No hay una sesión activa. Redirigiendo al inicio.");
  window.location.href = "index.html";
}

// Se agrego CONTENIDO a un array
const contenido = [...CONTENIDO.peliculas, ...CONTENIDO.series];

// Función para mostrar elementos en galería
function mostrarGaleria(items) {
  galeria.innerHTML = '';
  let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  let indiceUsuario = usuarios.findIndex(u => u.email === usuarioActivo.email);
  let favoritos = usuarios[indiceUsuario].favoritos || [];

  if (items.length === 0) {
    galeria.innerHTML = '<p class="mensaje-error">No se encontraron resultados.</p>';
    return;
  }

  for (let i = 0; i < items.length; i++) {
    let item = items[i];
    let div = document.createElement('div');
    div.classList.add('foto');

    let enlace;
    if (item.tipo === 'pelicula') {
      enlace = 'detallePelicula.html';
    } else {
      enlace = 'detalleSerie.html';
    }

    const clave = `${item.id}-${item.tipo}`;

    div.innerHTML = `
      <a href="${enlace}?id=${item.id}">
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
      if (favoritos[j].id == item.id && favoritos[j].tipo === item.tipo) {
        corazon.classList.add('pintado');
        break;
      }
    }
  }
}

// Función de filtrado
function filtrarContenido() {
  const nombre = inputNombre.value.toLowerCase().trim();
  const categoria = selectCategoria.value.toLowerCase();

  const filtrados = contenido.filter(function (item) {
    const coincideNombre = item.titulo.toLowerCase().includes(nombre);
    const coincideCategoria =
      categoria === 'todas' || categoria === 'vacio' || item.genero.some(function (g) {
        return g.toLowerCase() === categoria;
      });

    return coincideNombre && coincideCategoria;
  });

  mostrarGaleria(filtrados);
}

inputNombre.addEventListener('input', filtrarContenido);
selectCategoria.addEventListener('change', filtrarContenido);

// Al hacer click marcar favoritos
document.addEventListener('click', function (event) {
  const corazon = event.target.closest('.corazon');

  if (corazon) {
    const clave = corazon.id;
    const [id, tipo] = clave.split('-');
    const item = contenido.find(el => el.id == id && el.tipo === tipo);

    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    let indiceUsuario = usuarios.findIndex(u => u.email === usuarioActivo.email);
    let favoritos = usuarios[indiceUsuario].favoritos || [];

    const yaExiste = favoritos.find(fav => fav.id == id && fav.tipo === tipo);

    if (yaExiste) {
      favoritos = favoritos.filter(fav => !(fav.id == id && fav.tipo === tipo));
      corazon.classList.remove('pintado');
    } else {
      favoritos.push(item);
      corazon.classList.add('pintado');
    }

    // Actualizar usuario y guardar
    usuarios[indiceUsuario].favoritos = favoritos;
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    localStorage.setItem("usuarioActivo", JSON.stringify(usuarios[indiceUsuario]));
  }
});

// Mostrar todos al inicio
mostrarGaleria(contenido);