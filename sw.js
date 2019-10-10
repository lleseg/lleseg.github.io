// Eventos Service Worker
// 'install', 'activate', 'push', 'fetch', 'sync', 'message'

const CACHE_STATIC_NAME = 'static-v1';
const CACHE_DYNAMIC_NAME = 'dynamic-v1';
const CACHE_IMMUTABLE_NAME = 'immutable-v1';

self.addEventListener('install', event => {
  console.log('SW install');

  const cacheStatic = caches.open(CACHE_STATIC_NAME).then(cache => {
    // App shell - lo necesario para que la app funcione offline
    return cache.addAll([
      '/',
      '/index.html',
      '/css/style.css',
      '/js/main.js',
      '/images/supermercado.jpg',
      'https://fonts.googleapis.com/icon?family=Material+Icons',
    ]);
  });

  const cacheImmutable = caches.open(CACHE_IMMUTABLE_NAME).then(cache => {
    // App shell - recursos versionados que con cambian
    return cache.addAll([
      'https://code.jquery.com/jquery-3.4.1.min.js',
      '/js/handlebars-v4.3.1.js',
      'https://code.getmdl.io/1.3.0/material.indigo-pink.min.css',
      'https://code.getmdl.io/1.3.0/material.min.js',
    ]);
  });

  event.waitUntil(Promise.all([cacheStatic, cacheImmutable]));
});

self.addEventListener('activate', event => {
  console.log('SW activate');

  let cacheWhiteList = [
    CACHE_STATIC_NAME,
    CACHE_DYNAMIC_NAME,
    CACHE_IMMUTABLE_NAME,
  ];

  caches.keys().then(cacheNames => {
    return Promise.all(
      cacheNames.map(cacheName => {
        if (cacheWhiteList.indexOf(cacheName) === -1) {
          return caches.delete(cacheName);
        }
      }),
    );
  });
});

self.addEventListener('fetch', event => {
  // console.log(event.request.url);

  const respuesta = caches.match(event.request).then(res => {
    if (res) {
      console.log(event.request.url, 'Encontrado!');
      return res;
    }
    console.log(event.request.url, 'NO encontrado!');

    return fetch(event.request).then(newRes => {
      caches.open(CACHE_DYNAMIC_NAME).then(cache => {
        cache.put(event.request, newRes);
      });
      return newRes.clone();
    });
  });

  event.respondWith(respuesta);

  // let requerimiento = event.request;
  // event.respondWith(fetch(requerimiento));

  // if (event.request.url.includes('supermercado.jpg')) {
  //   // console.log(event.request);
  //   let fotoReq = event.respondWith(fetch('images/supermercadoT.jpg'));
  //   event.respondWith(fotoReq);
  // } else if (event.request.url.includes('style.css')) {
  //   let respuesta = new Response(
  //     `main {
  //       padding: 10px;
  //     }

  //     .mdl-button {
  //       margin-left: 30px;
  //     }

  //     .boton-borrar {
  //       font-size: 0.7em;
  //       padding: 0;
  //       background-color: red;
  //       color: white;
  //     }

  //     .boton-borrar:hover {
  //       background-color: white;
  //       color: red;
  //     }

  //     .mdl-textfield__input,
  //     .mdl-textfield__label {
  //       margin-left: 30px;
  //       margin-right: 30px;
  //       width: 80%;
  //     }

  //     img {
  //       border-radius: 50%;
  //     }`,
  //     {
  //       headers: {
  //         'content-type': 'text/css',
  //       },
  //     },
  //   );

  //   event.respondWith(respuesta);
  // } else {
  //   event.respondWith(fetch(event.request));
  // }
});
