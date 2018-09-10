//basic variables to navigate DOM
const beats = document.querySelector(".beats");
const valve1=document.querySelector(".valve1");
const valve2=document.querySelector(".valve2");
const valve3=document.querySelector(".valve3");
let scoreDisplay = document.querySelector(".score");
const finalScore = document.querySelector(".finalScore");
const audio = new Audio('corduroy.mp3');
const gameplay = document.querySelector(".gameplay");
const startingPosition = getOffset(gameplay).top;
let points = 0;

//modal variables
const gameStartButton = document.querySelector("#gameStartButton");
const startModal = document.querySelector(".startModal");
const blurredElements = document.querySelectorAll(".blur");
const gameOverModal = document.querySelector(".gameOverModal");
const gameOverMessage = document.querySelector("#endingMessage");


//game start modal
gameStartButton.addEventListener("click",function(){
  startModal.style.display="none"
  blurredElements.forEach(function(el){
    el.style.filter="none"
  })
});

//Google Chrome blocks audio from autoplaying without user input,
//so I added a "press enter to begin" functionality 
addEventListener('keypress', function (e) {
  let key = e.keyCode;
  if (key===13 && startModal.style.display==="none"){
    audio.currentTime=1;
    audio.play();
    gameplay.style.animationName = "notesMoving"
    setTimeout(function(){
    audio.pause();
    blurredElements.forEach(function(el){
    el.style.filter="blur(2px)"
    })
    audio.currentTime=0;
    if(points>100){
      gameOverMessage.textContent="Nice Work!";
    }else if(points>0){
      gameOverMessage.textContent="You did okay. Definitely not getting a call back";
    } else if(points<0){
      gameOverMessage.textContent="You gotta practice!!";
    }
    finalScore.textContent=points;
    gameOverModal.style.display="block";
    },68000)
  }
});

let valve1Note = document.querySelector(".valve1-note");
valve1Note.classList.contains("");

//this creates all the beats
for(let i=0;i<1000;i++){
  beats.innerHTML+="<div class='beat'></div>"
}

//                                  /-~~~key detection logic~~~-\

///turns out, it's very difficult to get an  
//accurate reading of when a key is held down
//luckily, I found KEYDROWN, this SUPER small(<.5kb) 
//and SUPER easy to use library that does the trick

//BIG shout out to Jeremy Kahn at https://github.com/jeremyckahn :) :) :)

//this variable will include all the valves currently being pressed
let currentValves = [];

//this intitiates keydrown according to its documentation
kd.run(function () {
  kd.tick();
});

//simple remove function to be used to remove a valve from the 
//currentValves array after the user lets go fo it
function remove(array, element) {
    const index = array.indexOf(element);
    array.splice(ind?>ex, 1);
}

//spacebar for breath
const meter = document.querySelector(".meter")


//if you push a key down, it gets added to currentValves array
kd.SPACE.down(function(){
  meter.style.width="0%";
  meter.style.transition="17s";
    if(!currentValves.includes("air")){
      currentValves.push("air");
    }
});

//if you let go of a key, it gets removed from the currentValves array
kd.SPACE.up(function(){
  meter.style.width="100%";
  meter.style.transition="2s";
  remove(currentValves,"air");
});

//need to use these keys because of keyboard ghosting

kd.PERIOD.down(function(){
    valve1.style.border="6px solid #0074D9";
    if(!currentValves.includes(1)){
      currentValves.push(1);
    }
});

kd.PERIOD.up(function(){
    valve1.style.border="6px solid #C1C4C3";
    remove(currentValves,1)
});


kd.QMARK.down(function(){
    valve2.style.border="6px solid #FFDC00";
    if(!currentValves.includes(2)){
    currentValves.push(2);
  }
});

kd.QMARK.up(function(){
    valve2.style.border="6px solid #C1C4C3";
    remove(currentValves,2)
});

kd.SHIFT.down(function(){
  valve3.style.border="6px solid #FF851B";
  if(!currentValves.includes(3)){
  currentValves.push(3);
  }
});

kd.SHIFT.up(function(){
  valve3.style.border="6px solid #C1C4C3";
  remove(currentValves,3)
});


//                                     ..~~~collision logic~~~..

//THANK YOU ADAM GRANT FROM STACK OVERFLOW
//FOR THIS AMAZING AND SIMLPLE getOffset FUNCTION
//https://stackoverflow.com/questions/442404/retrieve-the-position-x-y-of-an-html-element
function getOffset(el) {
  const rect = el.getBoundingClientRect();
  return {
    left: rect.left + window.scrollX,
    top: rect.top + window.scrollY
  };
}

//props to 
//https://stackoverflow.com/questions/6229197/how-to-know-if-two-arrays-have-the-same-values
//for this smart function to determine if two arrays have the same values
function arraysEqual(arr1, arr2) {
    if (!Array.isArray(arr1) || ! Array.isArray(arr2) || arr1.length !== arr2.length)
      return false;
    var arr1 = arr1.concat().sort();
    var arr2 = arr2.concat().sort();
    for (var i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i])
            return false;
    }
    return true;
}

//if valve 1 div has similar position to valve 1 AND correct combo of valves is being pushed

//I have to use let statements here because the values change if the window is resized
let valvePosition = getOffset(valve1).top;
let openNotes = document.querySelectorAll(".open-note");
let valve1notes = document.querySelectorAll(".valve1-note");
let valve2notes = document.querySelectorAll(".valve2-note");
let valve12notes = document.querySelectorAll(".combo12");
let valve23notes = document.querySelectorAll(".combo23");
let valve13notes = document.querySelectorAll(".combo13");
let valve123notes = document.querySelectorAll(".combo123");

//this variable isn't actually used,but I would have used this to refactor the code below. 
//these are the only things that change accross all the functions below 
const comboPairs = [
[openNotes,["air"]],
[valve1notes,["air",1]],
[valve2notes,["air",2]],
[valve12notes,["air",1,2]],
[valve23notes,["air",2,3]],
[valve13notes,["air",1,3]],
[valve123notes,["air",1,2,3]],
];


//each of these functions checks for different combos

function checkFor1stValve(){
  //where the notes get detected
  valvePosition = getOffset(valve1).top -30;
  //this adds all the valve1 notes to a valvePosition variable
  valve1notes = document.querySelectorAll(".valve1-note");
  valve1notes.forEach(function(el){
    notePosition = getOffset(el).top;
    // the numbers after valvePosition is how sensitive the collision detection is
    if(valvePosition+ 10 > notePosition && valvePosition-10 < notePosition){
      if(arraysEqual(currentValves, ["air",1])){
      points+=3;
      el.style.background="#2ECC40";
      }else{
        points-=1
        el.style.background="#FF4136";
      }
    }
  });
}

function checkFor2ndValve(){
  valvePosition = getOffset(valve2).top -30;
  valve2notes = document.querySelectorAll(".valve2-note");
  valve2notes.forEach(function(el){
    notePosition = getOffset(el).top;
    if(valvePosition + 10 > notePosition && valvePosition -10 < notePosition){
      if(arraysEqual(currentValves, ["air",2])){
        el.style.background="#2ECC40";
      points+=3;
      }else{
        points-=1
         el.style.background="#FF4136";
      }
    }
  });
}

let comboChangeColor = '';

function checkFor12Valve(){
  valvePosition = getOffset(valve2).top-30;
  valve12notes = document.querySelectorAll(".combo12");
  valve12notes.forEach(function(el){
    notePosition = getOffset(el).top;
    if(valvePosition + 10 > notePosition && valvePosition-10 < notePosition){
      if(arraysEqual(currentValves, ["air",2,1])){
        comboChangeColor = el.childNodes;
        comboChangeColor[1].style.background="#2ECC40"
        comboChangeColor[3].style.background="#2ECC40"
      points+=3;
      }else{
        points-=1
         comboChangeColor = el.childNodes;
        comboChangeColor[1].style.background="#FF4136"
        comboChangeColor[3].style.background="#FF4136"
      }
    }
  });
}

function checkFor23Valve(){
  valvePosition = getOffset(valve2).top-30;
  valve23notes = document.querySelectorAll(".combo23");
  valve23notes.forEach(function(el){
    notePosition = getOffset(el).top;
    if(valvePosition + 10 > notePosition && valvePosition -10 < notePosition){
      if(arraysEqual(currentValves, ["air",2,3])){
        comboChangeColor = el.childNodes;
        comboChangeColor[1].style.background="#2ECC40"
        comboChangeColor[3].style.background="#2ECC40"
      points+=3;
      }else{
        comboChangeColor = el.childNodes;
        comboChangeColor[1].style.background="#FF4136"
        comboChangeColor[3].style.background="#FF4136"
        points-=1
      }
    }
  });
}

function checkFor13Valve(){
  valvePosition = getOffset(valve2).top-30;
  valve13notes = document.querySelectorAll(".combo13");
  valve13notes.forEach(function(el){
    notePosition = getOffset(el).top;
    if(valvePosition + 10 > notePosition && valvePosition -10 < notePosition){
      if(arraysEqual(currentValves, ["air",1,3])){
        comboChangeColor = el.childNodes;
        comboChangeColor[1].style.background="#2ECC40"
        comboChangeColor[3].style.background="#2ECC40"
      points+=3;
      }else{
        comboChangeColor = el.childNodes;
        comboChangeColor[1].style.background="#FF4136"
        comboChangeColor[3].style.background="#FF4136"
        points-=1
      }
    }
  });
}

function checkFor123Valve(){
  valvePosition = getOffset(valve2).top-30;
  valve123notes = document.querySelectorAll(".combo123");
  valve123notes.forEach(function(el){
    notePosition = getOffset(el).top;
    if(valvePosition + 10 > notePosition && valvePosition -10 < notePosition){
      if(arraysEqual(currentValves, ["air",1,2,3])){
                comboChangeColor = el.childNodes;
        comboChangeColor[1].style.background="#2ECC40"
        comboChangeColor[3].style.background="#2ECC40"
        comboChangeColor[5].style.background="#2ECC40"
      points+=3;
      } else{
        comboChangeColor[1].style.background="#FF4136"
        comboChangeColor[3].style.background="#FF4136"
        comboChangeColor[5].style.background="#FF4136"
        points-=1
      }
    }
  });
}


function checkForOpen(){
  valvePosition = getOffset(valve2).top-30;
  openNotes = document.querySelectorAll(".open");
  openNotes.forEach(function(el){
    notePosition = getOffset(el).top;
    if(valvePosition + 10 > notePosition && valvePosition -10 < notePosition){
      if(arraysEqual(currentValves, ["air"])){
        el.style.background="#2ECC40";
      points+=3;
      } else{
        el.style.background="#FF4136";
        points-=1
      }
    }
  });
}

const bar = document.querySelector(".bar");

//this function handles the air logic
function checkForAir(){
  //get air as a percentage
let percentAirLeft = meter.offsetWidth/bar.offsetWidth;
//give player warning when there's low air
if(percentAirLeft < .2){
  beats.style.background = "#FF4136";
  beats.style.transition ="10s";
} else{
  beats.style.background = "#0f2027";
  beats.style.transition ="1s";
}
//end game if player runs out of air
if(percentAirLeft<.005){
  gameplay.style.animationDuration="0s";
  blurredElements.forEach(function(el){
    el.style.filter="blur(2px)"
  })
  gameOverMessage.textContent="Oh no! You forgot to breathe and passed out!";
  finalScore.textContent=points;
  audio.pause();
  audio.currentTime=0;
  setTimeout(function(){
  gameOverModal.style.display="block"
  },100)
}
}

// this checks for user input every millisecond and calls all the functions above
setInterval(function(){ 
    checkForOpen();
    checkFor1stValve();
    checkFor2ndValve();
    checkFor12Valve();
    checkFor13Valve();
    checkFor23Valve(); 
    checkFor123Valve();
    checkForAir();
    scoreDisplay.innerHTML = points;
}, 1);