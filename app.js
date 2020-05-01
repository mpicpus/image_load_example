// Este listener es muy practico para arrancar solo cuando el contenido esta cargado.
window.addEventListener('DOMContentLoaded', (event) => {
  initialize();
})


// Aqui los datos (aqui un amigo...)
let list = [
  {
    name: 'monkey01',
    text: 'This is an awesome image'
  },
  {
    name: 'monkey02',
    text: 'This is another awesome image'
  },
  {
    name: 'monkey03',
    text: 'Yet another one'
  }
]

let imgFolder = "./monkeys";
let imageWrapper; // Esto es para el lio opcional

// Aqui el bacalao...
function initialize() {
  // referencia a los elementos que necesitamos:
  let ulElement = document.querySelector('#list');
  let imageElement = document.querySelector('#the-image');

  // Este es para el lio opcional.
  imageWrapper = document.querySelector('#images-wrapper');
  window.img = imageWrapper;


  // creamos la lista en el DOM:
  list.forEach((item) => {
    let newItem = document.createElement('li');
    newItem.innerText = item.text;

    ulElement.appendChild(newItem);

    // Cada elemento con su listener y el callback...
    // Haciendolo asi no nos hace falta depender del evento o el id del elemento.
    newItem.addEventListener('mouseover', () => {
      imageElement.src = `${imgFolder}/${item.name}.jpg`;
      // onListHover(item); // => esta es parte opcional, ya por liarla parda del todo.
    })
  })

  // loadItAll(); // Si descomentas esta linea, todas las imagenes se cargan al principio.
}


//////// ##### Esto es lo basico. #### //////////

// Si quieres, el resto es por liarla.
// El modelo básico tiene una pega: las imágenes se vuelven a cargar cada vez que haces hover.
// El modelo chulo las carga solo una vez (a la vez al principio o cuando se necesitan, depende de la linea 46).
// Comentas la linea 41 y descomentas la 42 y opcionalmente la 46, la idea sería la misma.


function onListHover(item) {
  loadItemImage(item).then(() => {
    renderImage(item.image)
  })
}


function loadItemImage(item) {
  return new Promise((resolve, reject) => {
    if (item.image){
      resolve();
      return;
    };

    let image = new Image();
    image.src = `${imgFolder}/${item.name}.jpg`;

    image.addEventListener('load', resolve);

    item.image = image;
  })
}


function renderImage(image) {
  imageWrapper.innerHTML = '';
  imageWrapper.appendChild(image);
}


// opcional:
// cargamos las imagenes previamente, para que no haya tiempo de espera.
function loadItAll() {
  list.forEach((item) => {
    loadItemImage(item)
  })
}
