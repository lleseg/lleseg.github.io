console.log('Super: Lista de compras');

if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('../sw.js')
    .then(function(reg) {
      console.log('Service Worker registrado exitósamente', reg);
    })
    .catch(function(err) {
      console.error('Error registrando el Service Worker', err);
    });
}

let listaDeCompras = [
  { nombre: 'Fideos', precio: 1 },
  { nombre: 'Arroz', precio: 2 },
  { nombre: 'Harina', precio: 3 },
  { nombre: 'Aceite', precio: 4 },
];

function renderLista() {
  let productos = '';

  listaDeCompras.forEach((producto, index) => {
    productos += `<li class="mdl-list__item">
                    <span class="mdl-list__item-primary-content">
                      ${producto.nombre}
                    </span>
    
                    <div class="mdl-textfield mdl-js-textfield">
                      <input class="mdl-textfield__input" value="${
                        producto.precio
                      }" 
                        onchange="cambiarPrecio(this,${index})" type="text" id="sample${index +
      1}">
                      <label class="mdl-textfield__label" for="sample${index +
                        1}"></label>
                    </div>
    
                    <button onclick="borrar(${index})" class="boton-borrar mdl-button mdl-js-button mdl-button--raised        mdl-js-ripple-effect">
                      Borrar
                    </button>
                  </li>`;
  });

  document.getElementById('lista').innerHTML = productos;
}

function borrar(index) {
  console.log('Borrar', index);
  listaDeCompras.splice(index, 1);
  renderLista();
}

function cambiarPrecio(e, index) {
  console.log('Cambiar', index);
  let precioNuevo = Number(e.value);
  console.log(e.value);
  listaDeCompras[index] = precioNuevo;
  console.log(listaDeCompras);
}

document.getElementById('boton-borrar').addEventListener('click', () => {
  console.log('Click al botón borrar');

  listaDeCompras = [];

  renderLista();
});

document.getElementById('boton-agregar').addEventListener('click', () => {
  console.log('Click al botón agregar');

  let producto = document.getElementById('producto').value;
  if (producto) {
    listaDeCompras.push({ nombre: producto, precio: 0 });
    document.getElementById('producto').value = '';
  }

  renderLista();
});

renderLista();
