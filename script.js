const beat = document.getElementsByClassName("beat");
const createBeat = document.createElement("hr");
const valve1=document.querySelector(".valve1");
const valve2=document.querySelector(".valve2");
const valve3=document.querySelector(".valve3");

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

kd.run(function () {
  kd.tick();
});

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
