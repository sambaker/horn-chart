function Horns() {
    function partial() {
        var p = [];
        for (var i = 0; i < arguments.length; i += 3) {
            p.push({
                index: arguments[i],
                octave: arguments[i+1],
                score: arguments[i+2]
            });
        }
        return {
            positions: p
        }
    }

    var instruments = {
        trumpet: {
            noteLocations: { undefined: {} },
            partials: []
        },
        trombone: {
            noteLocations: { undefined: {} },
            partials: [
                partial(
                    10, 2, 10,
                    9, 2, 10,
                    8, 2, 10,
                    7, 2, 10,
                    6, 2, 10,
                    5, 2, 10,
                    4, 2, 10
                    ),
                partial(
                    5, 3, 10,
                    4, 3, 10,
                    3, 3, 10,
                    2, 3, 10,
                    1, 3, 10,
                    0, 3, 10,
                    11, 2, 10
                    ),
                partial(
                    10, 3, 10,
                    9, 3, 10,
                    8, 3, 10,
                    7, 3, 10,
                    6, 3, 10,
                    5, 3, 5,
                    4, 3, 5
                    ),
                partial(
                    2, 4, 10,
                    1, 4, 10,
                    0, 4, 10,
                    11, 3, 10,
                    10, 3, 5,
                    9, 3, 5,
                    8, 3, 5
                    ),
                partial(
                    5, 4, 10,
                    4, 4, 10,
                    3, 4, 10,
                    2, 4, 5,
                    1, 4, 5,
                    0, 4, 5,
                    11, 3, 5
                    ),
                partial(
                    8, 4, 10,
                    7, 4, 10,
                    6, 4, 10,
                    5, 4, 5,
                    4, 4, 5,
                    3, 4, 5,
                    2, 4, 5
                    ),
                partial(
                    10, 4, 10,
                    9, 4, 10,
                    8, 4, 5,
                    7, 4, 5,
                    6, 4, 5,
                    5, 4, 5,
                    4, 4, 5
                    ),
                partial(
                    0, 5, 10,
                    11, 4, 10,
                    10, 4, 5,
                    9, 4, 5,
                    8, 4, 5,
                    7, 4, 5,
                    6, 4, 5
                    ),
                partial(
                    2, 5, 10,
                    1, 5, 10,
                    0, 5, 5,
                    11, 4, 5,
                    10, 4, 5,
                    9, 4, 5,
                    8, 4, 5
                    )
            ]
        }
    };

    function transposePartials(partials, transpose) {
        var transposed = []
        partials.forEach(function(partial) {
            var tp = []
            transposed.push({
                positions: tp
            });
            partial.positions.forEach(function(position) {
                var tpos = {}
                tpos.index = position.index + transpose;
                tpos.octave = position.octave;
                tpos.score = position.score;
                if (tpos.index >= 12) {
                    ++tpos.octave;
                    tpos.index -= 12;
                }
                if (tpos.index < 0) {
                    --tpos.octave;
                    tpos.index += 12;
                }
                tp.push(tpos);
            })
        })
        return transposed;
    }

    instruments.trumpet.partials = transposePartials(instruments.trombone.partials, 2);

    _.each(instruments, function(instrument, name) {
        var partials = instrument.partials;
        var noteLocations = instrument.noteLocations;
        partials.forEach(function(partial, i) {
            partial.positions.forEach(function(position, j) {
                if (!noteLocations[position.octave]) {
                    noteLocations[position.octave] = {};
                }
                if (!noteLocations[position.octave][position.index]) {
                    noteLocations[position.octave][position.index] = [];
                }
                if (!noteLocations[undefined][position.index]) {
                    noteLocations[undefined][position.index] = [];
                }
                noteLocations[position.octave][position.index].push({
                    partial: i,
                    position: j,
                    index: position.index,
                    octave: position.octave,
                    score: position.score
                });
                noteLocations[undefined][position.index].push({
                    partial: i,
                    position: j,
                    index: position.index,
                    octave: position.octave,
                    score: position.score
                });
            })
        })

        // Save reversedPartials
        instrument.reversedPartials = partials.slice().reverse();

        _.each(noteLocations, function(locationsByOctave) {
            _.each(locationsByOctave, function(locationsByNote) {
                locationsByNote.sort(function(a, b) {
                    return b.score - a.score;
                });
            })
        })
    });

    this.instruments = instruments;

    this.createSelection = function(instrument, notes) {
        //debugger;
        var noteLocations = instruments[instrument].noteLocations;
        var selection = [];
        notes.forEach(function(note) {
            if (noteLocations[note.octave]) {
                var locations = noteLocations[note.octave][note.index];
                locations.forEach(function(location) {
                    selection.push({
                        location: location,
                        name: note.name,
                        interval: note.interval
                    });
                });
            }
        }, this);
        return selection;
    }

    this.getInstruments = function() {
        return _.keys(instruments);
    }
}
