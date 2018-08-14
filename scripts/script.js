//Animal Facts

// A grid with randomly assigned animals.
// User will match two grids to get an animal fact.
// If user does not match two grid tiles, the grid flips back over. No animal fact is given.

//Tile options Arrays. 1 & 2 should be identical. Will concat and then sort them. Creating two arrays for ease of reading. 

//Duplicate the array.

let clickCounter = 0;
let matchCounter = 0;
const tileOptions1 = ['giraffe', 'blueWhale', 'blueJay', 'crocodile', 'tiger', 'elephant', 'koala', 'polarBear'];
let tileOptions2 = tileOptions1.slice();
const finalTileOptions = tileOptions1.concat(tileOptions2).sort();

const randomizeTiles = () => {
  const initialArrayLength = finalTileOptions.length;
  for (let i = 1; i <= initialArrayLength; i++) {
    randomIndex = Math.floor(Math.random() * finalTileOptions.length);
    $('.tile' + i).append(`<img class="${finalTileOptions[randomIndex]} hide" src="${animalImages[finalTileOptions[randomIndex]]}">`);
    finalTileOptions.splice(randomIndex, 1);
  };
};

const checkForMatch = () => {
  if ($('.active1 img').attr('class') === $('.active2 img').attr('class')) {
    addFacts();
    addHideClass('.tile.active1');
    addHideClass('.tile.active2');
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
  $('.fact-modal').css({'display': 'flex'});
  $('.fact p').html(`${animalFacts[$('.active1 img').attr('class')][Math.floor(Math.random() * animalFacts[$('.active1 img').attr('class')].length)]}`);
};

const addHideClass = (selector) => {
  $(selector).addClass('hide');
};

const delayedHideTiles = () => {
  $('.tile.active1 img').delay(500).queue(function() {
    $(this).addClass('hide').dequeue();
  });
  $('.tile.active2 img').delay(500).queue(function() {
    $(this).addClass('hide').dequeue();
  });
};

const removeActiveClass = () => {
  $('.tile').removeClass('active1');
  $('.tile').removeClass('active2');
};

$(function() {

  randomizeTiles();

  $('#play-button').click(function () {
    $('.tile').removeClass('hide');
    $('.tiles-wrapper').css({'background-color': 'transparent'});
    addHideClass('.button-wrapper');
  });
  
  $('.tile').click(function () {
    clickCounter = clickCounter + 1;
    $(this).addClass('active' + clickCounter);
    $(this).children().removeClass('hide');
    if (clickCounter === 2) {
      checkForMatch();
    }
  });

  $('button.close-modal-button').on('click', function() {
    $('.fact-modal').css({'display': 'none'});
  });

});