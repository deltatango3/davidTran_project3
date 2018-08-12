//Animal Facts

// A grid with randomly assigned animals.
// User will match two grids to get an animal fact.
// If user does not match two grid tiles, the grid flips back over. No animal fact is given.

//Tile options Arrays. 1 & 2 should be identical. Will concat and then sort them. Creating two arrays for ease of reading. 

//Duplicate the array.

let clickCounter = 0;
let matchCounter = 0;
const tileOptions1 = ['giraffe', 'whale'];
let tileOptions2 = tileOptions1.slice();
const finalTileOptions = tileOptions1.concat(tileOptions2).sort();
console.log(finalTileOptions);

let animalImages = {
  giraffe: 'https://images-na.ssl-images-amazon.com/images/I/41eVPa0N7ZL.jpg',
  whale: 'https://c402277.ssl.cf1.rackcdn.com/photos/11558/images/hero_full/shutterstock_112249448.jpg?1462221839',
};

let animalFacts = {
  giraffe: 'Giraffes have long necks',
  whale: 'Whales are hugeeee',
};

const randomizeTiles = () => {
  const initialArrayLength = finalTileOptions.length;
  for (let i = 1; i <= initialArrayLength; i++) {
    randomIndex = Math.floor(Math.random() * finalTileOptions.length);
    $('.box' + i).append(`<img class="${finalTileOptions[randomIndex]}" src="${animalImages[finalTileOptions[randomIndex]]}">`);
    finalTileOptions.splice(randomIndex, 1);
  };
};

checkForMatch = () => {
  if ($('.active1 > img').attr('class') === $('.active2 > img').attr('class')) {
    $('.fact').html(`<div>${animalFacts[$('.active1 > img').attr('class')]}</div>`);
    $('.box.active1').addClass('hide');
    $('.box.active2').addClass('hide');
    $('.box').removeClass('active1');
    $('.box').removeClass('active2');
    clickCounter = 0;
    matchCounter = matchCounter + 1;  
    checkMatchCounter();
  } else {
    clickCounter = 0;
    console.log('no match');
    $('.box').removeClass('active1');
    $('.box').removeClass('active2');
  }
}

checkMatchCounter = () => {
  if (matchCounter === tileOptions1.length) {
    $('.wrapper').html('<div>Game Over</div>');
  };
};

$('#play-button').click(function () {
  randomizeTiles();
});

$('.box').click(function () {
  clickCounter = clickCounter + 1;
  $(this).addClass('active' + clickCounter);  
  if (clickCounter === 2) {
    checkForMatch();
  }
});