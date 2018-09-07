const beat = document.getElementsByClassName("beat");
const createBeat = document.createElement("hr");
const valve1=document.querySelector(".valve1");
const valve2=document.querySelector(".valve2");
const valve3=document.querySelector(".valve3");

let points = 0;

let valve1Note = document.querySelector(".valve1-note");
valve1Note.classList.contains("")


//this creates all the beats
for(let i=0;i<90;i++){
	for(let k=0;k<beat.length;k++){
		beat[k].innerHTML+="<hr>"
	}	
}

let body = document.body;

///turns out, it's very difficult to get an  
//accurate reading of when a key is held down
//luckily, I found KEYDROWN, this SUPER small(.5kb) 
//and SUPER easy to use library that does the trick

//BIG shout out to Jeremy Kahn at https://github.com/jeremyckahn :) :) :)

let currentValves = [];

kd.run(function () {
  kd.tick();
});

//arrow keys don't work because of keyboard ghosting...

kd.LEFT.down(function(){
  valve1.style.border="6px solid yellow";
});

kd.LEFT.up(function(){
  valve1.style.border="6px solid white";
});

kd.DOWN.down(function(){
  valve2.style.border="6px solid yellow";
});

kd.DOWN.up(function(){
  valve2.style.border="6px solid white";
});

kd.RIGHT.down(function(){
  valve3.style.border="6px solid yellow";
});

kd.RIGHT.up(function(){
  valve3.style.border="6px solid white";
});


function remove(array, element) {
    const index = array.indexOf(element);
    array.splice(index, 1);
}

//spacebar for breath

const meter = document.querySelector(".meter")

kd.run(function () {
  kd.tick();
});

kd.SPACE.down(function(){
  meter.style.width="0%";
  meter.style.transition="17s";
    if(!currentValves.includes("air")){
      currentValves.push("air");
    }
});

kd.SPACE.up(function(){
  meter.style.width="100%";
  meter.style.transition="2s";
  remove(currentValves,"air");
});

//need to use these keys because of keyboard ghosting

kd.PERIOD.down(function(){
    valve1.style.border="6px solid black";
    if(!currentValves.includes(1)){
      currentValves.push(1);
    }
});

kd.PERIOD.up(function(){
    valve1.style.border="6px solid white";
    remove(currentValves,1)
});


kd.QMARK.down(function(){
    valve2.style.border="6px solid black";
    if(!currentValves.includes(2)){
    currentValves.push(2);
  }
});

kd.QMARK.up(function(){
    valve2.style.border="6px solid white";
    remove(currentValves,2)
});

kd.SHIFT.down(function(){
  valve3.style.border="6px solid black";
  if(!currentValves.includes(3)){
  currentValves.push(3);
  }
});

kd.SHIFT.up(function(){
  valve3.style.border="6px solid white";
  remove(currentValves,3)
});

let test = document.getElementById("testing");

setInterval(function(){ 
  // console.log(currentValves) 

}, 1000);


//collision logic

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

let valvePosition = getOffset(valve1).top;

//if vavle 1 div has similar position to valve 1 AND correct combo of valves is being pushed

let opennotes = document.querySelectorAll(".open-note");
let valve1notes = document.querySelectorAll(".valve1-note");
let valve2notes = document.querySelectorAll(".valve2-note");
let valve12notes = document.querySelectorAll(".combo12");
let valve23notes = document.querySelectorAll(".combo23");
let valve13notes = document.querySelectorAll(".combo13");
let valve123notes = document.querySelectorAll(".combo123");

function checkFor1stValve(){
  valvePosition = getOffset(valve1).top;
  valve1notes = document.querySelectorAll(".valve1-note");
  valve1notes.forEach(function(el){
    notePosition = getOffset(el).top;
    if(valvePosition + 4 > notePosition && valvePosition -16 < notePosition){
      if(arraysEqual(currentValves, ["air",1])){
      points+=3;
      }else{
        points-=1
      }
    }
//140 sets the valve to a detectable position, +4 and -16 is the margin of error (of 20 pixels)
  });
}

function checkFor2ndValve(){
  valvePosition = getOffset(valve2).top;
  valve2notes = document.querySelectorAll(".valve2-note");
  valve2notes.forEach(function(el){
    notePosition = getOffset(el).top;
    if(valvePosition + 4 > notePosition && valvePosition -16 < notePosition){
      if(arraysEqual(currentValves, ["air",2])){
      points+=3;
      }else{
        points-=1
      }
    }
//140 sets the valve to a detectable position, +4 and -16 is the margin of error (of 20 pixels)
  });
}

function checkFor12Valve(){
  valvePosition = getOffset(valve2).top;
  valve12notes = document.querySelectorAll(".combo12");
  valve12notes.forEach(function(el){
    notePosition = getOffset(el).top;
    if(valvePosition -30 + 4 > notePosition && valvePosition -30 -16 < notePosition){
      if(arraysEqual(currentValves, ["air",2,1])){
      points+=3;
      }else{
        points-=1
      }
    }
//140 sets the valve to a detectable position, +4 and -16 is the margin of error (of 20 pixels)
  });
}

function checkFor23Valve(){
  valvePosition = getOffset(valve2).top;
  valve23notes = document.querySelectorAll(".combo23");
  valve23notes.forEach(function(el){
    notePosition = getOffset(el).top;
    if(valvePosition + 4 > notePosition && valvePosition -16 < notePosition){
      if(arraysEqual(currentValves, ["air",2,3])){
      points+=3;
      }else{
        points-=1
      }
    }
//140 sets the valve to a detectable position, +4 and -16 is the margin of error (of 20 pixels)
  });
}

function checkFor13Valve(){
  valvePosition = getOffset(valve2).top;
  valve13notes = document.querySelectorAll(".combo13");
  valve13notes.forEach(function(el){
    notePosition = getOffset(el).top;
    if(valvePosition + 4 > notePosition && valvePosition -16 < notePosition){
      if(arraysEqual(currentValves, ["air",1,3])){
      points+=3;
      }else{
        points-=1
      }
    }
//140 sets the valve to a detectable position, +4 and -16 is the margin of error (of 20 pixels)
  });
}

function checkFor123Valve(){
  valvePosition = getOffset(valve2).top;
  valve123notes = document.querySelectorAll(".combo123");
  valve123notes.forEach(function(el){
    notePosition = getOffset(el).top;
    if(valvePosition + 4 > notePosition && valvePosition -16 < notePosition){
      if(arraysEqual(currentValves, ["air",1,2,3])){
      points+=3;
      } else{
        points-=1
      }
    }
//140 sets the valve to a detectable position, +4 and -16 is the margin of error (of 20 pixels)
  });
}


  // console.log("Random note position: "+valve1notes[18]);
  // for(let i=0;i<valve1notes.length-1;i++){
  // if(notePosition-5 > valvePosition || notePosition+5 < valvePosition){
  //   console.log("got it")
  // }
// }

setInterval(function(){ 
    checkFor1stValve();
    checkFor2ndValve();
    checkFor12Valve();
    checkFor13Valve();
    checkFor23Valve(); 
    checkFor123Valve();
}, 1);

let scoreDisplay = document.querySelector(".score")


setInterval(function(){ 
 scoreDisplay.innerHTML = points;
}, 1);







//check for 1st valve


