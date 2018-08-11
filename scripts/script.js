//Animal Facts

// A grid with randomly assigned animals.
// User will match two grids to get an animal fact.
// If user does not match two grid tiles, the grid flips back over. No animal fact is given.

//Tile options Arrays. 1 & 2 should be identical. Will concat and then sort them. Creating two arrays for ease of reading. 

//Duplicate the array.

let tileOptions1 = ['giraffe', 'whale'];
let tileOptions2 = tileOptions1.slice();
let clickCounter = 0;
let matchCounter = 0;

let finalTileOptions = tileOptions1.concat(tileOptions2).sort();
console.log(finalTileOptions);

let animalFacts = {
  giraffe: 'Giraffes have long necks',
  whale: 'Whales are hugeeee',
};

const randomizeTiles = () => {
  const initialArrayLength = finalTileOptions.length;
  for (let i = 1; i <= initialArrayLength; i++) {
    randomIndex = Math.floor(Math.random() * finalTileOptions.length);
    $('.box' + i).append(`${finalTileOptions[randomIndex]}`);
    finalTileOptions.splice(randomIndex, 1);
  };
};

checkForMatch = () => {
  if ($('.box.active1').html() === $('.box.active2').html()) {
    $('.fact').html(`<div>${animalFacts[$('.active1').html()]}</div>`);
    $('.box.active1').addClass('hide');
    $('.box.active2').addClass('hide');
    clickCounter = 0;
    matchCounter = matchCounter + 1;  
    checkMatchCounter();
  } else {
    alert('no match');
    clickCounter = 0;
    $('.box').removeClass('active1');
    $('.box').removeClass('active2');
  }
}

checkMatchCounter = () => {
  if (matchCounter === 2) {
    $('.wrapper').html('<div>Game Over</div>');
  };
};

$('#play-button').click(function () {
  randomizeTiles();
});

$('.box').click(function () {
  clickCounter = clickCounter + 1;
  console.log(clickCounter);
  $(this).addClass('active' + clickCounter);
  if (clickCounter === 2) {
    checkForMatch();
  }
});