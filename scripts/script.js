//Animal Facts

// A grid with randomly assigned animals.
// User will match two grids to get an animal fact.
// If user does not match two grid tiles, the grid flips back over. No animal fact is given.

//Tile options Arrays. 1 & 2 should be identical. Will concat and then sort them. Creating two arrays for ease of reading. 

//Duplicate the array.

let clickCounter = 0;
let matchCounter = 0;
const tileOptions1 = ['giraffe', 'blueWhale', 'blueJay', 'crocodile', 'tiger', 'elephant', 'koala', 'polarBear', 'gorilla', 'manedWolf'];
let tileOptions2 = tileOptions1.slice();
const finalTileOptions = tileOptions1.concat(tileOptions2).sort();

const randomizeTiles = () => {
  const initialArrayLength = finalTileOptions.length;
  for (let i = 1; i <= initialArrayLength; i++) {
    randomIndex = Math.floor(Math.random() * finalTileOptions.length);
    $('.box' + i).append(`<img class="${finalTileOptions[randomIndex]} hide" src="${animalImages[finalTileOptions[randomIndex]]}">`);
    finalTileOptions.splice(randomIndex, 1);
  };
};

const checkForMatch = () => {
  if ($('.active1 img').attr('class') === $('.active2 img').attr('class')) {
    addFacts();
    hideTiles('.box.active1', '.box.active2');
    removeActiveClass();
    clickCounter = 0;
    matchCounter = matchCounter + 1;  
    checkMatchCounter();
  } else {
    clickCounter = 0;
    delayedHideTiles();
    removeActiveClass();
  }
};

const checkMatchCounter = () => {
  if (matchCounter === tileOptions1.length) {
    $('.wrapper').html('<div>Game Over</div>');
  };
};

const addFacts = () => {
  $('.fact').html(`<div>${animalFacts[$('.active1 img').attr('class')][Math.floor(Math.random() * animalFacts[$('.active1 img').attr('class')].length)]}</div>`);
};

const hideTiles = (selector1, selector2) => {
  $(selector1).addClass('hide');
  $(selector2).addClass('hide');
};

const delayedHideTiles = () => {
  $('.box.active1 img').delay(500).queue(function() {
    $(this).addClass('hide').dequeue();
  });
  $('.box.active2 img').delay(500).queue(function() {
    $(this).addClass('hide').dequeue();
  });
};

const removeActiveClass = () => {
  $('.box').removeClass('active1');
  $('.box').removeClass('active2');
};

$('#play-button').click(function () {
  randomizeTiles();
});

$('.box').click(function () {
  clickCounter = clickCounter + 1;
  console.log(clickCounter);
  $(this).addClass('active' + clickCounter);
  console.log('active' + clickCounter);
  $(this).children().removeClass('hide');
  if (clickCounter === 2) {
    checkForMatch();
  }
});