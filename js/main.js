// console.log('Super: Lista de compras');

// Clase 4
// if (window.caches) {
//   console.log('El caché existe!');

//   // caches.open('Prueba-1');
//   // caches.has('Prueba-2').then(existe => console.log(existe));
//   // caches.has('Prueba-1').then(console.log);
//   // caches.delete('Prueba-1').then(console.log);

//   caches.open('cache-v1.1').then(cache => {
//     // cache.add('/index.html');
//     cache.addAll(['/index.html', '/css/style.css']).then(() => {
//       console.log('Terminó la carga de cache');
//       cache.delete('/index.html');

//       cache.match('/css/style.css').then(res => {
//         res.text().then(console.log);
//       });

//       cache.put('/css/style.css', new Response('Hello world!'));

//       caches.keys().then(console.log);
//     });
//   });
// }

let listaDeCompras = [
  //   { producto: 'Fideos', precio: 1 },
  //   { producto: 'Arroz', precio: 2 },
  //   { producto: 'Harina', precio: 3 },
  //   { producto: 'Aceite', precio: 4 },
];

function setServiceWorker() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register('../sw.js')
      .then(function(reg) {
        // console.log('Service Worker registrado exitósamente', reg);
      })
      .catch(function(err) {
        console.error('Error registrando el Service Worker', err);
      });
  }
}

function getDatosLista() {
  $.get('lista.json', function(data) {
    // console.log(data);
    // listaDeCompras = data;
    // renderLista();
  });

  $.get('https://5d197decb3b6a100148d1fcd.mockapi.io/api/v1/lista', data => {
    // console.log(data);
    listaDeCompras = data;
    localStorage.setItem('lista', JSON.stringify(listaDeCompras));
    renderLista();
  })
    .done(() => {
      console.log('Success!');
    })
    .fail(error => {
      console.log('Error AJAX', error);
      // console.log(JSON.parse(localStorage.getItem('lista')));
      listaDeCompras = JSON.parse(localStorage.getItem('lista'));
      renderLista();
    })
    .always(() => {
      console.log('Fin de transferencia');
    });
}

function renderLista() {
  var source = $('#listaTemplate').html();
  var template = Handlebars.compile(source);
  var data = {
    listaDeCompras,
  };
  $('#lista').html(template(data));
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
  // console.log(listaDeCompras);
}

function configListeners() {
  $('#boton-borrar').click(() => {
    console.log('Click al botón borrar');

    listaDeCompras = [];

    renderLista();
  });

  // document.getElementById('boton-agregar').addEventListener('click', () => {
  $('#boton-agregar').click(() => {
    console.log('Click al botón agregar');

    // let producto = document.getElementById('producto').value;
    let producto = $('#producto').val();
    if (producto) {
      listaDeCompras.push({ producto, precio: 0 });
      // document.getElementById('producto').value = '';
      $('#producto').value = '';
    }

    renderLista();
  });
}

// localStorage.setItem('lista', 'lista de compras 01');
// document.querySelector('.prueba-jquery').innerHTML = '<i>Texto nuevo</i>';
// document.querySelector('.prueba-jquery').style.color = 'red';
// $('.prueba-jquery').html('<i>Texto nuevo</i>');
// $('.prueba-jquery').css('color', 'red');

setServiceWorker();
getDatosLista();
configListeners();
// renderLista();

// ----------------
// Ejemplo promises
// ----------------
// let promesa1 = new Promise((resolve, reject) => {
//   setTimeout(resolve, 1000, 'One');
// });
// let promesa2 = new Promise((resolve, reject) => {
//   setTimeout(resolve, 2000, 'Two');
// });
// let promesa3 = new Promise((resolve, reject) => {
//   setTimeout(resolve, 3000, 'Three');
// });
// let promesa4 = new Promise((resolve, reject) => {
//   setTimeout(resolve, 4000, 'Four');
// });
// let promesa5 = new Promise((resolve, reject) => {
//   reject('RECHAZADO!');
// });

// console.log('Promise start');

// Promise.all([promesa1, promesa2, promesa3, promesa4, promesa5])
//   .then(values => {
//     console.log(values);
//   })
//   .catch(error => console.log(error));

// promesa1.then(valor => {
//   console.log(valor);
// });

// promesa2.then(valor => {
//   console.log(valor);
// });

// promesa3.then(valor => {
//   console.log(valor);
// });

// promesa4.then(valor => {
//   console.log(valor);
// });
