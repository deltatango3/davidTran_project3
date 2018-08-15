const animals = {
  giraffe: {
    name: 'Giraffe',
    image: 'assets/giraffe.svg',
    facts: [
      `A giraffe's spots are like human fingerprints. No two individual giraffes have exactly the same pattern.`,
      `Giraffes only need 5 to 30 minutes of sleep a day. They often take quick naps that last a minute or two.`,
      `The first giraffe to reach Europe was brough there by Julias Caesar in 46 B.C.`
    ]
  },
  blueWhale: {
    name: 'Blue Whale',
    image: 'assets/whale.svg',
    facts: [
      `Blue Whales are the biggest animal that has lived. Ever.`,
      `Blue Whales have been around for the last 54 million years.`,
      `Blue Whales sleep while they swim. They are able to use half their brain for sleeping while the other remains active.`
    ]
  },
  crocodile: {
    name: 'Crocodile',
    image: 'assets/croc.svg',
    facts: [
      `Crocodiles first appeared around 250 million years ago, the same time when dinosaurs appeared.`,
      `There was once a type of crocodile that could gallop.`,
      `Crocodiles have the strongest bite ever measured. But their muscles to open their jaw are too weak to prevent a human from holding their mouth closed.`,
    ]
  },
  tiger: {
    name: 'Tiger',
    image: 'assets/tiger.svg',
    facts: [
      `A tiger's stripes are unique each individual, similar to a human fingerprint.`,
      `Tigers usually live solitary lives. The term for a group of tigers is a "streak"`,
      `Tigers are completely striped. They even have stripes on their skin.`
    ]
  },
  elephant: {
    name: 'Elephant',
    image: 'assets/elephant.svg',
    facts: [
      `Elephants communicate over long distances using a sub-sonic rumble that can travel over the ground faster than sound through air.`,
      `An Elephant's tusk can weight up to 22 pounds and each one is worth $10,000 - $15,000 on the black market in Asia.`,
      `An elephant trunk weighs about 400 pounds, but they are able to pick up tiny things such as a single grain of rice.`,
    ]
  },
  koala: {
    name: 'Koala',
    image: 'assets/koala.svg',
    facts: [
      `Koalas fingerprints are virtually indistinguishable from human ones, so much so that they can be mistaken for one another in criminal investigations.`,
      `Koalas are not bears: They’re marsupials. Their closest living relative is the wombat.`,
      `Baby koalas are called joeys. Many other babies that belong to the Marsupial family are also called joeys.`,
    ]
  },
  polarBear: {
    name: 'Polar Bear',
    image: 'assets/polar-bear.svg',
    facts: [
      `Polar bears have jet black skin. Their fur is translucent and only appears white because it reflects visible light.`,
      `Polar bear-grizzly bears exist. They are called 'grolar bears or pizzly bears.`,
      `Polar bears are the only bear species to be considered marine mammals.`,
    ]
  },
  gorilla: {
    name: 'Gorilla',
    image: 'assets/gorilla.svg',
    facts: [
      `The word gorilla come from the greek work 'gorillai', which means tribe of hairy women.`,
      `Gorillas purr.`,
      `Mike Tyson offered a zoo attendant $10,000 to open the gate and let him fight a gorilla. The zoo attendant did not accept.`,
    ]
  },
}

let clickCounter = 0;
let matchCounter = 0;
const tileOptions1 = ['giraffe', 'blueWhale', 'gorilla', 'crocodile', 'tiger', 'elephant', 'koala', 'polarBear'];
let tileOptions2 = tileOptions1.slice();
const finalTileOptions = tileOptions1.concat(tileOptions2).sort();

const randomizeTiles = () => {
  const initialArrayLength = finalTileOptions.length;
  for (let i = 1; i <= initialArrayLength; i++) {
    randomIndex = Math.floor(Math.random() * finalTileOptions.length);
    $('.tile' + i).append(`<img class="${finalTileOptions[randomIndex]} hide" src="${animals[finalTileOptions[randomIndex]].image}">`);
    finalTileOptions.splice(randomIndex, 1);
  };
};

const checkForMatch = () => {
  if ($('.active1 img').attr('class') === $('.active2 img').attr('class')) {
    addFacts();
    addHideClass('.tile.active1', 700);
    addHideClass('.tile.active2', 700);
    removeActiveClass();
    clickCounter = 0;
    matchCounter = matchCounter + 1;  
    checkMatchCounter();
  } else {
    clickCounter = 0;
    addHideClass('.tile.active1 img', 500);
    addHideClass('.tile.active2 img', 500);
    removeActiveClass();
  }
};

const checkMatchCounter = () => {
  if (matchCounter === tileOptions1.length) {
    $('.wrapper').html('<div>Game Over</div>');
  };
};

const addFacts = () => {
  $('header h1').text(`The ${animals[$('.active1 img').attr('class')].name}`);
  $('header .blurb').text(`${animals[$('.active1 img').attr('class')].facts[Math.floor(Math.random() * animals[$('.active1 img').attr('class')].facts.length)]}`);

};

const addHideClass = (selector, time = '') => {
  $(selector).delay(time).queue(function() {
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
});