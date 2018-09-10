# tptHero
Trumpet Hero!

deployment: https://pages.git.generalassemb.ly/7evam/tptHero/

screencast: https://www.youtube.com/watch?v=QmsopSs7SZ0

Trumpet Hero is a rhythm game similar to Guitar Hero that simulates playing the trumpet.

There are a few main elements to the game:

Valves: These are the valves at the top of the page. This is what the user controls with the . / and shift keythe valves are detected with a small library called keydrown. This helps the valves be detected in real time instead of having a delay that would make this game impossible.

Keydrown: https://jeremyckahn.github.io/keydrown/

Beats: These are a series of divs with a dotted border. CSS animations moves these divs upward on the page so that the dotted borders pass the valves in time with the music

Notes: Notes are overlayed on the beats divs to represent the notes to be played on the trumpet. They passthe valves in time so that the player must press the correct valve combination to earn points

Air meter: In order to play trumpet, you must blow! Holding down the spacebar simluates blowing through the trumpet. The player has 17 seconds of air before they pass out. Taking a full breath in takes 2 seconds.

Collision detection: As the notes move up the page, functions fire off every millisecond checking if the playeris holding the right valve combination while blowing air. This is done by checking the position of the notesrelative to the window size and comparing that with the position of the valves relative to the window size.If the note and valve are within +/ 10 pixels of each other, the game checks the currentValves array to seeif the player gets points or not.

PROBLEMS I RAN INTO

Keyboard ghosting: I originally wanted to use the arrow keys as the valves. Turns out, thanks to some extensive research on keyboard ghosting, most keyboards cannot detect a user holding down more than two keys at once. Luckily, there are some exceptions to this like the Shift key and Space Bar, so I was able to survive by changing the controls of my game

Collision detection: I had no idea how I was going to accomplish collision detection before I googled it, but soon after, I found a function on Stack Overflow that finds the position of an element in the DOM in real time. This was ESSENTIAL to my game. I'm sure I will use this function in the future. The function is very simple(about 5 lines), but uses properties that i didn't know existed.

https://stackoverflow.com/questions/442404/retrieve-the-position-x-y-of-an-html-element

Matching music the the beat: This was a challenge, but was ultimately just a matter of trial and error. I mapped out all the variables that would change the tempo and moved one variable up in small increments until the song was in time. Getting the song to start on beat 1 was pretty difficult, but I was ultimately able to solve it by starting the audio at 0:01 instead of 0:00 (and having some luck). This process took a couple hours. I would still like to tweak it some more.

UNSOLVED PROBLEMS

Matching up with music: The game as-is is extremely imperfect by nature of how I set it up. Rhythm is a relatively exact
science and it and I was able to approximate through trial and error the beat of the song. If the song went on longer, the beat would ineveitably get off track. The collision detection is also slightly off at some points. If I were to start over, I would try to find a way to use collision detection with the time code of the song so the user's score was based on how well they were matching the actual music instead of an approximation with CSS animations.

Cross-browser support: Another big flaw with using CSS animations for this game is that every browser interprets the animations slightly different. This game is unplayable in Safari, and I was unable to test in Firefox because the / key automatically launches an annoying finder feature that i was unable to figure out how to turn off. So this game only works in Chrome.

New game button on game over modal: It is very difficult to restart a CSS animation. Since the entire game runs on that, I was unable to make a reset game button in time despite spending HOURS trying to do so. If I go back to fix it, I would check out this article: https://css-tricks.com/restart-css-animation/

Refactoring my checkForX functions: My javascript code to check for valve combos is extremely WET. I was able to successfully refactor the code into one function for all single valve notes, but ran into a problem with coloring the multi-valve notes green or red. The multi-valve notes are wrapped inside of a seperate div that gets checked for collision detection so that a player doesn't double their score just because a note has two valves. This means I would need to color the child elements of the wrapper for multi-valve notes. I was very close to figuring this out in time, but alas couldn't get it before the buzzer. The game still has the same functionality.

Different scores depending on window size: This one is a doozy to me. You can score more points if your browser window is smaller. I really don't know how that happened since the valve positions and note positions variables are updated ever milisecond and all of the note and valve sizes are hard coded with pixels. Even though the game is still playable with this issuee, this is obviously a huge issue and I hope to get to the bottom of it soon.


