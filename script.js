const beat = document.getElementsByClassName("beat");
const createBeat = document.createElement("hr");
const valve1=document.querySelector(".valve1");
const valve2=document.querySelector(".valve2");
const valve3=document.querySelector(".valve3");

let valve1Note = document.querySelector(".valve1-note");
valve1Note.classList.contains("")

console.log(beat)


//this creates all the beats
for(let i=0;i<40;i++){
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
    valve1.style.border="6px solid black";
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

setInterval(function(){ 
  console.log(currentValves) 
}, 1000);


//collision logic

//check for 1st valve

// let circle1 = valve1;

// let dx = circle1.x - circle2.x;
// let dy = circle1.y - circle2.y;
// let distance = Math.sqrt(dx * dx + dy * dy);

// if (distance < circle1.radius + circle2.radius  && right valves are highlighted) {
//     (console.log("poop"))
// }
