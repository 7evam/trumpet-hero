# Trumpet Hero

## About this game

As a trumpet player, I've always wanted to share with other people what playing the trumpet is like, but since you have to first learn how to form an embouchure, there can be a steep learning curve. Trumpet Hero is a rhythm game similar to Guitar Hero that simulates playing the trumpet. It's made entirely with HTML, CSS and vanilla Javascript. A player has to make sure they're holding down the correct valve combination while exhaling (holding down the space bar). Make sure not to hold your breath too long though, or you might pass out and lose!

### Screencast
https://www.youtube.com/watch?v=QmsopSs7SZ0

### Deployment
https://pages.git.generalassemb.ly/7evam/tptHero/


## Features

There are a few main elements to the game:

Valves: These are the valves at the top of the page. This is what the user controls with the . / and shift keythe valves are detected with a small library called keydrown. This helps the valves be detected in real time instead of having a delay that would make this game impossible.

Keydrown: https://jeremyckahn.github.io/keydrown/

Beats: These are a series of divs with a dotted border. CSS animations moves these divs upward on the page so that the dotted borders pass the valves in time with the music

Notes: Notes are overlayed on the beats divs to represent the notes to be played on the trumpet. They passthe valves in time so that the player must press the correct valve combination to earn points

Air meter: In order to play trumpet, you must blow! Holding down the spacebar simluates blowing through the trumpet. The player has 17 seconds of air before they pass out. Taking a full breath in takes 2 seconds.

Collision detection: As the notes move up the page, functions fire off every millisecond checking if the playeris holding the right valve combination while blowing air. This is done by checking the position of the notesrelative to the window size and comparing that with the position of the valves relative to the window size.If the note and valve are within +/ 10 pixels of each other, the game checks the currentValves array to seeif the player gets points or not.

