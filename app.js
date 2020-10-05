// My current listener of choice to run any content-dependant code.
window.addEventListener('DOMContentLoaded', (event) => {
  initialize();
})


// Data structure, as simple as possible.
let list = [
  {
    name: 'monkey01',
    text: 'This is an awesome image',
    class: 'monkey-class1'
  },
  {
    name: 'monkey02',
    text: 'This is another awesome image',
    class: 'monkey-class2'
  },
  {
    name: 'monkey03',
    text: 'Yet another one',
    class: 'monkey-class3'
  }
]

let imgFolder = "./monkeys";
let imageWrapper, imageElement, listWrapper;


// #### Configuration variables ####

// Toggle between image load versions.
let useEfficientLoad = false;
// Trigger eager load of all images on app initialization.
let eagerLoad = false;


// Main initializer
function initialize() {
  // Reference the needed elements.
  listWrapper = document.querySelector('#list');
  imageElement = document.querySelector('#the-image');

  // This is for the "premium" version.
  imageWrapper = document.querySelector('#images-wrapper');

  // Create unordered list in the DOM:
  list.forEach((item) => {
    let newItem = document.createElement('div');
    newItem.innerText = item.text;
    newItem.classList.add(item.class);

    listWrapper.appendChild(newItem);

    // Every element will have its listener and callback.
    newItem.addEventListener('mouseover', () => {
      onListHover(item);
    })
  })

  // Load all images at the beginning. For sprite-like scenarios might come in handy.
  if (eagerLoad)
    loadItAll();
}


//////// ##### Code ends here in the Basic version. #####

// The added code below fuels the PREMIUM alternative with a version of in-memory image load.
// Basic mode is simpler but has a possible drawback: images are re-loaded from server/browser cache on every call.
// It might be just a slight difference, but the load event is triggered. Maybe we can do better.
//
// Premium mode will load each image only once
//    (all at the beginning if "eagerLoad" is enabled, useful for sprite-like scenarios,
//    or later, one by one, when they are needed)
// and reuse them later directly from memory.


// If the image was already loaded, we simply inject it;
// else we call the loader function.
function onListHover(item) {
  if (!useEfficientLoad) {
    simpleImgLoad(item);
    return
  }

  if (item.image)
    renderImage(item.image)
  else
    loadItemImage(item).then(() => {
      renderImage(item.image)
    })
}

function simpleImgLoad(item) {
  console.log('here')
  imageWrapper.classList.remove('visible');

  setTimeout(() => {
    imageElement.src = `${imgFolder}/${item.name}.jpg`; 
    imageWrapper.classList.add('visible');
  }, 50)
}


// Loads the image and injects it into our data object for future reference.
// Returns a promise: execution can be resumed when the image is effectively loaded.
function loadItemImage(item) {
  return new Promise((resolve, reject) => {
    let image = new Image();
    image.src = `${imgFolder}/${item.name}.jpg`;

    item.image = image;

    // Load process starts when we set the 'src' attribute,
    // but it takes time to complete, so we'll return the fulfilled promise when load is finished.
    image.addEventListener('load', resolve);
  })
}


// Simple image substitution. Refactor to your needs.
// This one will toggle ".visible" class with a slight (50ms) fade while switching images.
function renderImage(image) {
  imageWrapper.classList.remove('visible');
  setTimeout(() => {
    imageWrapper.innerHTML = '';
    imageWrapper.appendChild(image);
    imageWrapper.classList.add('visible');
  }, 50)
}


// Optional: eager load all images, useful for sprite-like scenarios.
// Ideally we also return a Promise (Promise.all()) here, but let's keep it simple.
function loadItAll() {
  list.forEach((item) => {
    loadItemImage(item)
  })
}
