/*Simulador de e-commerce para la primera entrega del curso de Java Script de Coder House*/

/*Arreglo que contiene los productos de la tienda*/
const productosDisponibles= [
    {id:1, nombre:"Nueces", categoria:"Frutos secos", precio: 12000, descripcion: "Natural sin azúcar", imagen: "https://i.blogs.es/75a169/istock-483979720-1-1-/1366_2000.jpg"},
    {id:2, nombre:"Almendras", categoria:"Frutos secos", precio: 17000 ,descripcion: "Natural sin azúcar", imagen: "https://i.blogs.es/75a169/istock-483979720-1-1-/1366_2000.jpg"},
    {id:3, nombre:"Aritos frutados", categoria:"Cereales", precio: 5000, descripcion: "Natural sin azúcar", imagen: "https://i.blogs.es/75a169/istock-483979720-1-1-/1366_2000.jpg"},
    {id:4, nombre:"Almohaditas chocolate",categoria:"Cereales", precio: 4000,descripcion: "Natural sin azúcar",  imagen: "https://i.blogs.es/75a169/istock-483979720-1-1-/1366_2000.jpg"},
    {id:5, nombre:"Harina de arroz", categoria: "Harinas", precio: 5000, descripcion: "Natural sin azúcar", imagen: "https://i.blogs.es/75a169/istock-483979720-1-1-/1366_2000.jpg"},
    {id:6, nombre:"Lentejas",categoria:"Legumbres", precio: 2000,descripcion: "Natural sin azúcar", imagen: "https://i.blogs.es/75a169/istock-483979720-1-1-/1366_2000.jpg"},
    {id:7, nombre:"Arroz Yamani",categoria:"Legumbres", precio: 8000, descripcion: "Natural sin azúcar", imagen: "https://i.blogs.es/75a169/istock-483979720-1-1-/1366_2000.jpg"},
    {id:8, nombre:"Harina de coco",categoria:"Harinas", precio: 15000, descripcion: "Natural sin azúcar", imagen: "https://i.blogs.es/75a169/istock-483979720-1-1-/1366_2000.jpg"},
    {id:9, nombre:"Te verde",categoria:"Infusiones", precio:10000, descripcion: "Natural sin azúcar", imagen: "https://i.blogs.es/75a169/istock-483979720-1-1-/1366_2000.jpg"},
    {id:10, nombre:"Oregano",categoria:"Condimentos", precio:1000, descripcion: "Natural sin azúcar", imagen: "https://i.blogs.es/75a169/istock-483979720-1-1-/1366_2000.jpg"},
    {id:11, nombre:"Pimienta",categoria:"Condimentos", precio:1000, descripcion: "Natural sin azúcar", imagen: "https://i.blogs.es/75a169/istock-483979720-1-1-/1366_2000.jpg"},
    {id:12, nombre:"Curcuma",categoria:"Condimentos", precio:3000, descripcion: "Natural sin azúcar",
        imagen: "https://i.blogs.es/75a169/istock-483979720-1-1-/1366_2000.jpg"},
    {id:13, nombre:"Premezcla para pizza",categoria:"Sin Tacc", precio:5000,descripcion: "Natural sin azúcar",  imagen: "https://i.blogs.es/75a169/istock-483979720-1-1-/1366_2000.jpg"},
    {id:14, nombre:"Magnesio",categoria:"Suplementos", precio:20000, descripcion: "Natural sin azúcar", imagen: "https://i.blogs.es/75a169/istock-483979720-1-1-/1366_2000.jpg"},
    {id:15, nombre:"Cacao amargo",categoria:"Reposteria", precio:10000, descripcion: "Natural sin azúcar", imagen: "https://i.blogs.es/75a169/istock-483979720-1-1-/1366_2000.jpg"}
];
 /*Arreglo que contiene los productos que agregan al carrito de compras*/
const carrito= {};
let productosFiltrados = [...productosDisponibles];
/*Arreglo que contiene la lista de productos favoritos*/
const favoritos=new Set();

/*funcion para mostrar todos los productos de la tienda*/

  /*function mostrarProductos(lista) {
      const contenedor = document.getElementById('lista-productos');
      contenedor.innerHTML = '';
      lista.forEach(p => {
        const esFavorito = favoritos.has(p.nombre);
        const enCarrito = carrito.includes(p.nombre);
         //const cantidad = carrito[p.nombre] || 0;
        contenedor.innerHTML += `
          <div class="col-md-4">
            <div class="card product-card">
              <img src="${p.imagen}" class="card-img-top" alt="${p.nombre}">
              <div class="card-body">
                <h5 class="card-title">${p.nombre}</h5>
                <p class="card-text">${p.descripcion}</p>
                <p class="card-text"><strong>$${p.precio.toFixed(2)}</strong></p>

                
                
                <button class="btn btn-sm btn-${enCarrito ? 'danger' : 'outline-success'}" onclick="${enCarrito ? `eliminarDelCarrito('${p.nombre}')` : `agregarAlCarrito('${p.nombre}')`}">
                  ${enCarrito ? 'Eliminar del carrito' : 'Añadir al carrito'}
                </button>

                <button class="btn btn-sm ${esFavorito ? 'btn-danger' : 'btn-outline-danger'}" onclick="toggleFavorito('${p.nombre}')">
                  ${esFavorito ? 'Quitar de favoritos' : '❤️ Favorito'}
                </button>

              </div>
            </div>
          </div>`;
      });
    }
*/
 function mostrarProductos(lista, esCarrito=false) {
      const contenedor = document.getElementById('lista-productos');
      contenedor.innerHTML = '';
      lista.forEach(p => {
        const esFavorito = favoritos.has(p.nombre);
        const cantidad = carrito[p.nombre] || 0;
        contenedor.innerHTML += `
          <div class="col-md-4">
            <div class="card product-card">
              <img src="${p.imagen}" class="card-img-top" alt="${p.nombre}">
              <div class="card-body">
                <h5 class="card-title">${p.nombre}</h5>
                <p class="card-text">${p.descripcion}</p>
                  <p class="card-text"><strong>$${p.precio.toFixed(2)}</strong></p>

                <div class="input-group mb-2">
                  <input type="number" min="1" value="1" id="cantidad-${p.nombre}" class="form-control">

                  
                  <button class="btn btn-outline-success" onclick="agregarAlCarrito('${p.nombre}')">Añadir al carrito</button>
                </div>

                <p>Cantidad en carrito: ${cantidad}</p>
                ${esCarrito ? `<button class="btn btn-sm btn-warning" onclick="eliminarDelCarrito('${p.nombre}')">Eliminar del carrito</button>` : ''}

                <button class="btn btn-sm ${esFavorito ? 'btn-danger' : 'btn-outline-danger'}" onclick="toggleFavorito('${p.nombre}')">
                  ${esFavorito ? 'Quitar de favoritos' : '❤️ Favorito'}
                </button>
              </div>
            </div>
          </div>`;
      });
      if (esCarrito) mostrarResumenCarrito();
      else document.getElementById('resumen-carrito').innerHTML = '';
    }

function mostrarResumenCarrito() {
      let total = 0;
      let resumen = '<h4>Resumen del Carrito</h4><ul class="list-group">';
      for (const nombre in carrito) {
        const producto = productosDisponibles.find(p => p.nombre === nombre);
        const cantidad = carrito[nombre];
        const subtotal = cantidad * producto.precio;
        total += subtotal;
        resumen += `<li class="list-group-item d-flex justify-content-between align-items-center">
                      ${nombre} x ${cantidad}
                      <span>$${subtotal.toFixed(2)}</span>
                    </li>`;
      }
      resumen += `</ul>
        <h5 class="mt-3">Total: $${total.toFixed(2)}</h5>
        <div class="mt-3">
          <button class="btn btn-success me-2" onclick="finalizarCompra()">Finalizar compra</button>
          <button class="btn btn-danger" onclick="vaciarCarrito()">Vaciar carrito</button>
        </div>`;
      document.getElementById('resumen-carrito').innerHTML = resumen;
    }

    function finalizarCompra() {
      let mensaje = "Hola, quiero realizar la siguiente compra:%0A";
      let total = 0;
      for (const nombre in carrito) {
        const producto = productosDisponibles.find(p => p.nombre === nombre);
        const cantidad = carrito[nombre];
        const subtotal = cantidad * producto.precio;
        mensaje += `- ${nombre} x${cantidad} = $${subtotal.toFixed(2)}%0A`;
        total += subtotal;
      }
      mensaje += `%0ATotal: $${total.toFixed(2)}`;
      const numeroWhatsApp = "543584315332";
      const url = `https://wa.me/${numeroWhatsApp}?text=${mensaje}`;
      window.open(url, '_blank');
    }
    function vaciarCarrito() {
      for (const nombre in carrito) {
        delete carrito[nombre];
      }
      actualizarCarrito();
      verCarrito();
    }

function filtrarProductos(categoria) {
  productosFiltrados = productosDisponibles.filter(p => p.categoria === categoria);
  mostrarProductos(productosFiltrados);
}

function buscarProductos() {
  const texto = document.getElementById('buscador').value.toLowerCase();
  const resultado = productosFiltrados.filter(p =>
    p.nombre.toLowerCase().includes(texto) || p.descripcion.toLowerCase().includes(texto)
  );
  mostrarProductos(resultado);
}

function toggleFavorito(nombre) {
  if (favoritos.has(nombre)) {
    favoritos.delete(nombre);
  } else {
    favoritos.add(nombre);
  }
  mostrarProductos(productosFiltrados);
}

 function agregarAlCarrito(nombre) {
      const input = document.getElementById(`cantidad-${nombre}`);
      const cantidad = parseInt(input.value);
      if (!isNaN(cantidad) && cantidad > 0) {
        if (!carrito[nombre]) carrito[nombre] = 0;
        carrito[nombre] += cantidad;
        actualizarCarrito();
      }
    }

function eliminarDelCarrito(nombre) {
      delete carrito[nombre];
      actualizarCarrito();
      verCarrito();
    }


function actualizarCarrito() {
      const total = Object.values(carrito).reduce((a, b) => a + b, 0);
      document.getElementById('cart-count').innerText = total;
    //  mostrarProductos(productosFiltrados);
    }

function verFavoritos() {
  const lista = productosDisponibles.filter(p => favoritos.has(p.nombre));
  mostrarProductos(lista);
}

 function verCarrito() {
      const lista = productosDisponibles.filter(p => carrito[p.nombre]);
      mostrarProductos(lista, true);
    }

function generarCategorias() {
  const categorias = [...new Set(productosDisponibles.map(p => p.categoria))];
  const contenedor = document.getElementById('categorias');
  contenedor.innerHTML = '';
  categorias.forEach(cat => {
    const btn = document.createElement('button');
    btn.className = 'btn btn-outline-primary';
    btn.textContent = cat.charAt(0).toUpperCase() + cat.slice(1);
    btn.onclick = () => filtrarProductos(cat);
    contenedor.appendChild(btn);
  });
}

 document.addEventListener('DOMContentLoaded', () => {
      generarCategorias();
      actualizarCarrito();
    });

