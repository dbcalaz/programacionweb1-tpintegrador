// Obtener ID desde la URL
const params = new URLSearchParams(window.location.search);
const serieId = parseInt(params.get('id'));

// Buscar la serie en el array
const serie = CONTENIDO.series.find(function(s) {
  return s.id === serieId;
});

// Referencias a los elementos
const temporadasSelect = document.getElementById('Temporadas');
const capitulosSelect = document.getElementById('Capitulo');

if (serie) {
  document.getElementById("titulo").textContent = serie.titulo;
  document.getElementById("genero").textContent = serie.genero.join(", ");
  document.getElementById("resumen").textContent = serie.resumen;

  // Actores con enlaces
  const actoresHTML = serie.actores.map(function(actor) {
    return '<a href="' + actor.wikipedia + '" target="_blank">' + actor.nombre + '</a>';
  }).join(", ");
  document.getElementById("actores").innerHTML = actoresHTML;

  // Video
  document.getElementById("video").innerHTML = serie.iframe;
  const youtubeLink = serie.iframe.match(/src='(.*?)'/)[1].replace("embed/", "watch?v=");
  document.getElementById("linkVideo").href = youtubeLink;
} else {
  document.querySelector(".info").innerHTML = "<p>Película no encontrada.</p>";
}

// Temporadas
temporadasSelect.innerHTML = '<option value="">Seleccionar</option>' +
  serie.temporadas.map(function(t) {
    return '<option value="Temporada' + t.numero + '">Temporada ' + t.numero + '</option>';
  }).join('');

// Capítulos (por defecto, de la primera temporada)
function cargarCapitulos(numCapitulos) {
  capitulosSelect.innerHTML = '<option value="">Capitulo</option>';
  for (let i = 1; i <= numCapitulos; i++) {
    capitulosSelect.innerHTML += '<option value="Capitulo' + i + '">Capitulo ' + i + '</option>';
  }
}

cargarCapitulos(serie.temporadas[0].capitulos);

// Evento para cambiar capítulos cuando se cambia de temporada
temporadasSelect.addEventListener('change', function () {
  const temporadaNum = parseInt(this.value.replace('Temporada', ''));
  const temporada = serie.temporadas.find(function(t) {
    return t.numero === temporadaNum;
  });
  if (temporada) {
    cargarCapitulos(temporada.capitulos);
  }
});

function cargarSimilares(tipo, idActual) {
  const contenedor = document.querySelector('.info_similares');
  if (!contenedor) return;
  contenedor.innerHTML = '';

  const similares = CONTENIDO[tipo + 's'].filter(function(item) {
    return item.id !== idActual;
  });

  for (let i = 0; i < similares.length; i++) {
    const item = similares[i];
    const a = document.createElement('a');

    if (tipo === 'serie') {
      a.href = 'detalleSerie.html?id=' + item.id;
    } else {
      a.href = 'detallePelicula.html?id=' + item.id;
    }

    a.title = item.titulo;

    const img = document.createElement('img');
    img.src = item.imagen;
    img.alt = item.titulo;

    a.appendChild(img);
    contenedor.appendChild(a);
  }
}

cargarSimilares('serie', serie.id);