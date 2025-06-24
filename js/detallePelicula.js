// Obtener ID desde la URL
const params = new URLSearchParams(window.location.search);
const peliculaId = parseInt(params.get('id'));

const pelicula = CONTENIDO.peliculas.find(function (p) {
  return p.id === peliculaId;
});

if (pelicula) {
  document.getElementById("titulo").textContent = pelicula.titulo;
  document.getElementById("duracion").textContent = pelicula.duracion;
  document.getElementById("genero").textContent = pelicula.genero.join(", ");
  document.getElementById("resumen").textContent = pelicula.resumen;

  // Actores con enlaces
  const actoresHTML = pelicula.actores.map(function (actor) {
    return '<a href="' + actor.wikipedia + '" target="_blank">' + actor.nombre + '</a>';
  }).join(", ");
  document.getElementById("actores").innerHTML = actoresHTML;

  // Video
  document.getElementById("video").innerHTML = pelicula.iframe;
  const youtubeLink = pelicula.iframe.match(/src='(.*?)'/)[1].replace("embed/", "watch?v=");
  document.getElementById("linkVideo").href = youtubeLink;
} else {
  document.querySelector(".info").innerHTML = "<p>Película no encontrada.</p>";
}

function cargarSimilares(tipo, idActual) {
  const contenedor = document.querySelector('.info_similares');
  if (!contenedor) return;
  contenedor.innerHTML = '';

  const similares = CONTENIDO[tipo + 's'].filter(function (item) {
    return item.id !== idActual;
  });

  for (let i = 0; i < similares.length; i++) {
    const item = similares[i];
    const a = document.createElement('a');

    if (tipo === 'pelicula') {
      a.href = 'detallePelicula.html?id=' + item.id;
    } else {
      a.href = 'detalleSerie.html?id=' + item.id;
    }

    a.title = item.titulo;

    const img = document.createElement('img');
    img.src = item.imagen;
    img.alt = item.titulo;

    a.appendChild(img);
    contenedor.appendChild(a);
  }
}

cargarSimilares('pelicula', pelicula.id);