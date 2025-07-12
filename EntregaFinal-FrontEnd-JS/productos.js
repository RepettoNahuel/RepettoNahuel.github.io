let carrito = JSON.parse(localStorage.getItem('carrito')) || {};
actualizarContadorCarrito();

let pagina = 0;
const productosPorPagina = 10;
const totalProductos = 100; // DummyJSON tiene 100 productos


/*Obtengo elementos del HTML*/
const contenedor = document.getElementById('tarjetas');
const btnAnterior = document.getElementById('anterior');
const btnSiguiente = document.getElementById('siguiente');
const spanPagina = document.getElementById('pagina-actual');

const btnVerCarrito = document.getElementById('btn-ver-carrito');
const btnCerrarCarrito = document.getElementById('btn-cerrar-carrito');
const contenedorCarrito = document.getElementById('carrito-container');
const listaCarrito = document.getElementById('carrito-lista');
const totalCarrito = document.getElementById('carrito-total');

function cargarProductos() {
  const skip = pagina * productosPorPagina;
  fetch(`https://dummyjson.com/products?limit=${productosPorPagina}&skip=${skip}`)
    .then(res => res.json())
    .then(data => {
      contenedor.innerHTML = ''; // limpiar tarjetas

      data.products.forEach(prod => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
          <img src="${prod.thumbnail}" alt="${prod.title}">
          <h3>${prod.title}</h3>          
          <span>$${prod.price.toFixed(2)}</span>

          <div class="cantidad-container">
            <input type="number" class="input-cantidad" value="1" min="1">
          </div>

          <button class="btn-agregar btn-prodcutos">Agregar al carrito 🛒</button>
        `;
        contenedor.appendChild(card);

        // Funcionalidad
        const inputCantidad = card.querySelector('.input-cantidad');
        const btnAgregar = card.querySelector('.btn-agregar');

        btnAgregar.addEventListener('click', () => {
            const cantidad = parseInt(inputCantidad.value);
            if (cantidad >= 1) {
                if (carrito[prod.id]) {
                carrito[prod.id].cantidad += cantidad;
                } else {
                carrito[prod.id] = {
                    id: prod.id,
                    titulo: prod.title,
                    cantidad: cantidad,
                    precio: prod.price
                };
                }

                localStorage.setItem('carrito', JSON.stringify(carrito));
                actualizarContadorCarrito();

                alert(`Agregado al carrito: ${prod.title} x${cantidad}`);
            } else {
                alert("La cantidad debe ser al menos 1");
            }
        });  
      });

      // Actualizar estado de paginación
      spanPagina.textContent = `Página ${pagina + 1} de 10`;
      btnAnterior.disabled = pagina === 0;
      btnSiguiente.disabled = skip + productosPorPagina >= totalProductos;
    })
    .catch(error => {
      console.error('Error al cargar los productos:', error);
    });
}

function actualizarContadorCarrito() {
  const total = Object.values(carrito).reduce((acc, prod) => acc + prod.cantidad, 0);
  let contador = document.getElementById('contador-carrito');
  /*queria poner sobre el logo del carrito la cantidad de productos que tenia cargado pero no me dio el tiempo*/
}

function mostrarCarrito() {
  listaCarrito.innerHTML = '';
  let total = 0;

  if (Object.keys(carrito).length === 0) {
    listaCarrito.innerHTML = '<p class="centrar">El carrito está vacío 🛒</p>';
    totalCarrito.textContent = '';
    contenedorCarrito.classList.add('centrar');
    return;
  }

  contenedorCarrito.classList.remove('centrar');

  Object.values(carrito).forEach(item => {
    const subtotal = item.cantidad * item.precio;
    total += subtotal;

    const itemContainer = document.createElement('div');
    itemContainer.classList.add('item-carrito');

    const texto = document.createElement('span');
    texto.textContent = `${item.titulo} x${item.cantidad} - $${subtotal.toFixed(2)}`;

    const btnEliminar = document.createElement('button');
    btnEliminar.textContent = '🗑️';
    btnEliminar.classList.add('btn-eliminar');
    btnEliminar.onclick = () => {
      delete carrito[item.id];
      localStorage.setItem('carrito', JSON.stringify(carrito));
      actualizarContadorCarrito();
      mostrarCarrito();
    };

    itemContainer.appendChild(texto);
    itemContainer.appendChild(btnEliminar);
    listaCarrito.appendChild(itemContainer);
  });

  totalCarrito.textContent = `Total: $${total.toFixed(2)}`;
  contenedorCarrito.classList.remove('oculto');
}

// Eventos
btnAnterior.addEventListener('click', () => {
  if (pagina > 0) {
    pagina--;
    cargarProductos();
  }
});

btnSiguiente.addEventListener('click', () => {
  if ((pagina + 1) * productosPorPagina < totalProductos) {
    pagina++;
    cargarProductos();
  }
});

const btnVaciarCarrito = document.getElementById('vaciar-carrito');

btnVaciarCarrito.addEventListener('click', () => {
  if (Object.keys(carrito).length != 0) {
    if (confirm('¿Estás seguro de que querés vaciar el carrito?')) {
      carrito = {};
      localStorage.setItem('carrito', JSON.stringify(carrito));
      actualizarContadorCarrito();
      mostrarCarrito();
    }
  }
});

const btnFinalizarCompra = document.getElementById('finalizar');

btnFinalizarCompra.addEventListener('click', () => {
  if (Object.keys(carrito).length != 0) {
    if (confirm('Proximamente ...')) {
    }
  }
});

// Cargar página inicial
cargarProductos();

btnVerCarrito.addEventListener('click', mostrarCarrito);
btnCerrarCarrito.addEventListener('click', () => contenedorCarrito.classList.add('oculto'));