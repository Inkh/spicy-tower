'use strict';

console.log('link about');

//For pixel hover
var pictures = document.getElementsByTagName('img');
console.log(pictures);

// 1 4 7 10
//Brian
pictures[1].addEventListener('mouseover', function(){
  pictures[1].src = 'assets/bri-pix.png';
});

pictures[1].addEventListener('mouseout', function(){
  pictures[1].src = 'assets/brian.png';
});

//Rebecca
pictures[4].addEventListener('mouseover', function(){
  pictures[4].src = 'assets/reb-pix.png';
});

pictures[4].addEventListener('mouseout', function(){
  pictures[4].src = 'assets/rebe.png';
});

//Jeff
pictures[7].addEventListener('mouseover', function(){
  pictures[7].src = 'assets/jeff-pix.png';
});

pictures[7].addEventListener('mouseout', function(){
  pictures[7].src = 'assets/jeff.png';
});

//Suzanne
pictures[10].addEventListener('mouseover', function(){
  pictures[10].src = 'assets/suz-pix.png';
});

pictures[10].addEventListener('mouseout', function(){
  pictures[10].src = 'assets/suzy.png';
});

