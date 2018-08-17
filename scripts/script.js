const matchGame = {};

matchGame.animals = {
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
      `Tigers usually live solitary lives. The term for a group of tigers is a "streak".`,
      `Tigers are completely striped. They even have stripes on their skin.`
    ]
  },
  elephant: {
    name: 'Elephant',
    image: 'assets/elephant.svg',
    facts: [
      `Elephants communicate over long distances using a sub-sonic rumble that can travel over the ground faster than sound through air.`,
      `An Elephant's tusk can weigh up to 22 pounds and each one is worth $10,000 - $15,000 on the black market in Asia.`,
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
      `Polar bear-grizzly bears exist. They are called 'grolar bears' or 'pizzly bears.'`,
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

matchGame.clickCounter = 0;
matchGame.matchCounter = 0;
matchGame.tileOptions1 = ['giraffe', 'blueWhale', 'gorilla', 'crocodile', 'tiger', 'elephant', 'koala', 'polarBear'];
matchGame.tileOptions2 = matchGame.tileOptions1.slice();

matchGame.ogHeader = `Animal Facts`;
matchGame.ogInstructions = `Reveal two of the same animals under the tiles and receive an animal fact!`;

matchGame.randomizeTiles = () => {

  matchGame.finalTileOptions = matchGame.tileOptions1.concat(matchGame.tileOptions2).sort();
  const initialArrayLength = matchGame.finalTileOptions.length;

  for (let i = 1; i <= initialArrayLength; i++) {
    randomIndex = Math.floor(Math.random() * matchGame.finalTileOptions.length);
    $('.tile' + i).append(`<img data-animal="${matchGame.finalTileOptions[randomIndex]}" class="hide" src="${matchGame.animals[matchGame.finalTileOptions[randomIndex]].image}">`);
    matchGame.finalTileOptions.splice(randomIndex, 1);
  };

};

matchGame.checkForMatch = () => {
  if ($('.active1 img').data('animal') === $('.active2 img').data('animal')) {
    matchGame.addFacts();
    matchGame.shimmerOnHeading();
    matchGame.addHideClass('.tile.active1', 1000);
    matchGame.addHideClass('.tile.active2', 1000);
    matchGame.removeActiveClass();
    matchGame.clickCounter = 0;
    matchGame.matchCounter += 1;  
    matchGame.checkMatchCounter();
  } else {
    matchGame.clickCounter = 0;
    matchGame.addHideClass('.tile.active1 img', 500);
    matchGame.addHideClass('.tile.active2 img', 500);
    matchGame.removeActiveClass();
  }
};

matchGame.checkMatchCounter = () => {
  if (matchGame.matchCounter === matchGame.tileOptions1.length) {
    $('.tiles-wrapper').css({'display': 'none'});
    $('.game-over').css({'display': 'flex'});
    matchGame.matchCounter = 0;
  };
};

matchGame.addFacts = () => {
  $('header h1').text(`The ${matchGame.animals[$('.active1 img').data('animal')].name}`);
  $('header .blurb').text(`${matchGame.animals[$('.active1 img').data('animal')].facts[Math.floor(Math.random() * matchGame.animals[$('.active1 img').data('animal')].facts.length)]}`);
};

matchGame.addHideClass = (selector, time = '') => {
  $(selector).delay(time).queue(function() {
    $(this).addClass('hide').dequeue();
  });
};

matchGame.removeActiveClass = () => {
  $('.tile').removeClass('active1');
  $('.tile').removeClass('active2');
};

matchGame.startGame = () => {
  $('#play-button').on('click', function() {
    // $('.tile').removeClass('hide');
    // $('.tiles-wrapper').css({'background-color': 'transparent'});
    matchGame.raiseIndex();
    matchGame.addHideClass('.button-wrapper');
  });
};

matchGame.resetGame = () => {
  $('#reset-button').on('click', function() {
    $('.game-over').css({'display': 'none'});
    $('.tiles-wrapper').css({'display': 'flex'});
    $('.tile img').remove();
    matchGame.randomizeTiles();
    matchGame.addHideClass('.tile img');
    $('.tile').removeClass('hide');
    $('header h1').text(matchGame.ogHeader);
    $('header p').text(matchGame.ogInstructions);
  });
};

// matchGame.hoverTile = () => {
//   $('.tile').hover(function() {
//     $(this).addClass('hover');
//   }, function() {
//     $(this).removeClass('hover');
//   })
// };

matchGame.raiseIndex = () => {
  $('.tile').removeClass('zindex');
};

matchGame.clickTile = () => {
  $('.tile').on('click', function() {
    if ($(this).hasClass('active1') !== true || $(this).hassClass('active2') !== true) {
      matchGame.clickCounter += 1;
      $(this).addClass('active' + matchGame.clickCounter);
      $(this).children().removeClass('hide');
      if (matchGame.clickCounter === 2) {
        matchGame.checkForMatch();
      }
    }
  });
};

matchGame.shimmerOnHeading = () => {
  $('header h1').addClass('shimmer');
  $('header h1').delay(1000).queue(function() {
    $(this).removeClass('shimmer').dequeue();
  })
};

matchGame.init = () => {
  matchGame.randomizeTiles();
  matchGame.startGame();
  // matchGame.hoverTile();
  matchGame.clickTile();
  matchGame.resetGame();
};

$(function() {
  matchGame.init();
});
