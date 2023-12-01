const notes=document.querySelector('.notes');

// this function creates a note based on three arguments
// value - how long the note is
// type - can be a note or rest
// valves - if this is a note, what valves are pressed (0 for open)
const noteFactory = function (value, type, valves) {
    const note = document.createElement("div");
    if (valves) {
        valves = valves.split('') // convert valves to array
        if (valves.length > 1) {
            note.classList.add('valve-combo', `combo${valves.join('')}`, value);
            valves.forEach(valve => {
                const valveElement = document.createElement("div");
                valveElement.classList.add(`valve${valve}-combo`, value, type);
                note.appendChild(valveElement);
            });
        } else if (valves[0] === '0') {
            note.classList.add('open', value, type);
        } else {
            note.classList.add(`valve${valves[0]}-note`, value, type);
        }
    } else {
        note.classList.add(value, type);
    }
    return note;
};

const fourBarPhrase = [
    ['eighth', 'note', '1'],
    ['eighth', 'note', '12'],
    ['quarter', 'note', '0'],
    ['quarter', 'note', '1'],
    // measure 2
    ['eighth', 'note', '12'],
    ['eighth', 'note', '1'],
    ['eighth', 'note', '1'],
    ['dotted-quarter', 'note', '0'],
    ['sixteenth', 'note', '1'],
    ['sixteenth', 'note', '0'],
    ['eighth', 'note', '12'],
    // measure 3
    ['dotted-quarter', 'note', '1'],
    ['dotted-quarter', 'note', '1'],
    ['sixteenth', 'note', '1'],
    ['sixteenth', 'note', '0'],
    ['eighth', 'note', '12'],
    // measure 4
    ['eighth', 'note', '1'],
    ['eighth', 'note', '12'],
    ['eighth', 'note', '23'],
    ['dotted-quarter', 'note', '0'],
    ['quarter', 'rest'],
]

// after some rests the same four bar phrase is repeated 4 times in the song
// to adjust for how the song starts, there the first four bar phrase is missing a quarter rest
const songArray = [
    ['quarter', 'rest'],
    ['quarter', 'rest'],
    ['quarter', 'rest'],
    ['whole', 'rest'],
    ['whole', 'rest'],
    ['whole', 'rest'],
    ['whole', 'rest'],
    ['whole', 'rest'],
    ['whole', 'rest'],
    ['whole', 'rest'],
    ['whole', 'rest'],
    ...fourBarPhrase,
    ['quarter', 'rest'],
    ...fourBarPhrase,
    ['quarter', 'rest'],
    ...fourBarPhrase,
    ['quarter', 'rest'],
    ...fourBarPhrase
]

// add the notes to the DOM
songArray.forEach(function(item){
    notes.appendChild(noteFactory(...item))
})