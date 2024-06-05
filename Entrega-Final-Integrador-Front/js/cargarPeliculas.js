const apiKey = 'ab3ab6ad39a296ba30600f97ab70c18c'; 
const apiUrl = `https://api.themoviedb.org/3`;
const imageUrlBase = 'https://image.tmdb.org/t/p/w500'; // URL base para las imágenes de pósters

const contenedorPeliculas = document.getElementById('contenedor-peliculas');
const btnAnt = document.getElementById('btn-ant');
const btnSig = document.getElementById('btn-sig');

const contenedorSeries = document.getElementById('contenedor-series');

//CARGA INICAL DE PELICULAS Y SERIES --> PAGINA 1
document.addEventListener('DOMContentLoaded', () => {  
  cargarPeliculas(1);    
  cargarSeries();
})

//CARGAR PELIS
function cargarPeliculas (page){ 
  const contenedorClone = contenedorPeliculas.cloneNode(true);
  contenedorPeliculas.parentNode.insertBefore(contenedorClone, contenedorPeliculas);
  contenedorPeliculas.style.display = 'none';

  fetch(`${apiUrl}/discover/movie?api_key=${apiKey}&page=${page}&with_genres=16&with_original_language=ja`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Error en la solicitud a la API');
      }
      return response.json();
    })
    .then(data => {      
      contenedorPeliculas.setAttribute('pagina', page);
      contenedorPeliculas.innerHTML = '';
      const peliculas = data.results;      

      peliculas.forEach(pelicula => {
        const peli = document.createElement('div');
        peli.classList.add('pelicula');

        const link = document.createElement('a');
        link.href='descripcionPelicula.html';

        const poster = document.createElement('img');
        poster.classList.add('cartelera-peli');
        poster.src = `${imageUrlBase}${pelicula.poster_path}`;
        poster.alt = `Póster de ${pelicula.title}`;
        poster.loading = 'lazy';

        const titulo = document.createElement('div');
        titulo.classList.add('nombre-pelicula');
        titulo.innerText = pelicula.title;


        const movieTitle = document.createElement('h2');
        movieTitle.textContent = pelicula.title;
       
        link.appendChild(poster);
        link.appendChild(titulo);
        peli.appendChild(link);
        contenedorPeliculas.appendChild(peli);
      });

      contenedorPeliculas.style.display = 'flex';
      contenedorClone.remove();
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

// PAGINA ANTERIOR DE PELIS
btnAnt.addEventListener('click', () => {
  let pagina = parseInt(contenedorPeliculas.getAttribute('pagina'), 10) || 1;
  if (pagina > 1) {
    cargarPeliculas(pagina - 1);
  }  
});

// PAGINA SIGUIENTE DE PELIS
btnSig.addEventListener('click', () => {
  let pagina = parseInt(contenedorPeliculas.getAttribute('pagina'), 10) || 1;
  cargarPeliculas(pagina + 1);   
});

//CARGAR SERIES
function cargarSeries (){  
  fetch(`${apiUrl}/discover/tv?api_key=${apiKey}&with_genres=16&with_original_language=ja`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Error en la solicitud a la API');
      }
      return response.json();
    })
    .then(data => {      
      const series = data.results;      

      series.forEach(serie => {
        const tv = document.createElement('div');
        tv.classList.add('serie');

        const poster = document.createElement('img');
        poster.classList.add('cartelera-serie');
        poster.src = `${imageUrlBase}${serie.poster_path}`;
        poster.alt = `Póster de ${serie.title}`;
        poster.loading = 'lazy';
               
        tv.appendChild(poster);     
        contenedorSeries.appendChild(tv);
      });
    })
    .catch(error => {
      console.error('Error:', error);
    });
}