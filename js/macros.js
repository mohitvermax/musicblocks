// Copyright (c) 2017-19 Walter Bender
//
// This program is free software; you can redistribute it and/or
// modify it under the terms of the The GNU Affero General Public
// License as published by the Free Software Foundation; either
// version 3 of the License, or (at your option) any later version.
//
// You should have received a copy of the GNU Affero General Public
// License along with this library; if not, write to the Free Software
// Foundation, 51 Franklin Street, Suite 500 Boston, MA 02110-1335 USA

// Macro expansions

// To add a macro:
// (1) you need to ensure that there is a block defined in
// basicblocks.js;
// (2) add an entry in BLOCKISMACRO array in the blockIsMacro function
// below with the block name from basicblocks.js;
// (3) define the macro (the JSON representation of the blocks that
// the macro expands to, where the position is specified as x, y); and
// (4) add an entry to the BUILTINMACROS dictionary.

// Regarding Step 3 above, the easiest way to generate the JSON code
// is to generate the blocks you need and save them in a project,
// which saves them in the same JSON format as used below. You may
// need to change the block numbers as they should start with Block 0.

// Note that the numbers at the beginning of each block need to
// adjusted so the first block starts at 0. If you remove all of
// the blocks except the ones you want in your macro (and one start
// block, since that is required) then add a start block and remove
// the start block you had saved, it will ensure that the macro
// numbering begins with Block 0 and all of the "connections" are
// correct.

function blockIsMacro (blkname) {

    const BLOCKISMACRO = ['accidental', 'action', 'actionhelp', 'amsynthhelp', 'archelp', 'articulation', 'articulationhelp', 'augmented1', 'augmented2', 'augmented3', 'augmented4', 'augmented5', 'augmented6', 'augmented7', 'augmented8', 'backward', 'beatvaluehelp', 'bottle', 'bottomposhelp', 'box1', 'box1help', 'box2', 'box2help', 'bpmhelp', 'broadcasthelp', 'bubbles', 'cat', 'chine', 'chordI', 'chordIV', 'chordV', 'chorushelp', 'clang', 'clap', 'clickhelp', 'cowbell', 'crash', 'crescendo', 'cricket', 'cup', 'custompitch', 'darbuka', 'decrescendo', 'decrescendohelp', 'definemode', 'deltapitchhelp', 'diminished2', 'diminished3', 'diminished4', 'diminished5', 'diminished6', 'diminished7', 'diminished8', 'dishelp', 'dohelp', 'dog', 'doublyhelp', 'downsixthinterval', 'downthirdinterval', 'downmajor3', 'downmajor6', 'downminor3', 'downminor6', 'downsixth', 'downthird', 'drift', 'duck', 'duplicatenotes', 'duphelp', 'effectshelp', 'eihelp', 'eighthNote', 'elapsedhelp', 'elapsednotes2', 'elifhelp', 'f', 'ff', 'fff', 'fill', 'fillhelp', 'fingercymbals', 'fifth',, 'fifthinterval', 'flat', 'floortom', 'fmsynthhelp', 'foreverhelp', 'forwardhelp', 'fourth', 'fourthinterval', 'glide', 'halfNote', 'harmonic', 'harmonic2', 'harmonichelp', 'hihat', 'hollowline', 'ifhelp', 'interval', 'invert', 'invert1', 'inverthelp', 'kick', 'lrhelp', 'major2', 'major3', 'major6', 'major7', 'matrix', 'matrixcmajor', 'matrixgmajor', 'meter', 'meterwidget', 'mf', 'midi', 'minor2', 'minor3', 'minor6', 'minor7', 'mousebuttonhelp', 'movable', 'movablehelp', 'mp', 'multiplybeatfactor', 'multiplybeathelp', 'musickeyboard2', 'musickeyboardja', 'neighbor', 'neighbor2', 'neighborhelp', 'neighbor2help', 'newnote', 'newslur', 'newstaccato', 'newswing', 'newswing2', 'swinghelp', 'note', 'note1', 'note2', 'note3', 'note4', 'note5', 'note6', 'note7', 'octave', 'oneOf', 'osctime', 'p', 'perfect4', 'perfect5', 'perfect8', 'pickup', 'pitch2', 'pitchdrummatrix', 'pitchslider', 'pitchstaircase', 'playdrum', 'playeffect', 'playnoise', 'pp', 'ppp', 'quarterNote', 'rest2', 'rhythm2', 'rhythmicdot', 'rhythmicdot2', 'rhythmruler2', 'rhythmruler3', 'ridebell', 'sawtooth', 'second', 'secondinterval', 'semitoneinterval', 'setbpm', 'setbpm2', 'setbpm3', 'setdrum', 'setdrumvolume', 'setkey2', 'setnotevolume2', 'setsynthvolume', 'setmasterbpm', 'setmasterbpm2', 'settimbre', 'settemperament', 'setscalartransposition', 'settransposition', 'setvoice', 'seventh', 'seventhinterval', 'sharp', 'sine', 'sixteenthNote', 'sixth', 'sixthinterval', 'sixtyfourthNote', 'skipnotes', 'slap', 'slur', 'snare', 'splash', 'square', 'staccato', 'startdrum', 'status', 'storebox1', 'storebox2', 'stuplet', 'stuplet3', 'stuplet5', 'stuplet7', 'swing', 'switch', 'temperament', 'tempo', 'third', 'thirtysecondNote', 'tie', 'timbre', 'tom', 'tone', 'triangle', 'trianglebell', 'tuplet3', 'tuplet4', 'turtleshell', 'unison', 'unisoninterval', 'vibrato', 'wholeNote', 'black', 'white', 'red', 'orange', 'yellow', 'green', 'blue', 'purple'];
    return BLOCKISMACRO.indexOf(blkname) > -1;
};

function getMacroExpansion (blkname, x, y) {
    // Some blocks are expanded on load.
    const ACCIDENTALOBJ = [[0, 'accidental', x, y, [null, 11, 1, 10]], [1, 'newnote', x, y, [0, 2, 5, 9]], [2, 'divide', 0, 0, [1, 3, 4]], [3, ['number', {'value': 1}], 0, 0, [2]], [4, ['number', {'value': 4}], 0, 0, [2]], [5, 'vspace', 0, 0, [1, 6]], [6, 'pitch', 0, 0, [5, 7, 8, null]], [7, ['solfege', {'value': 'sol'}], 0, 0, [6]], [8, ['number', {'value': 4}], 0, 0, [6]], [9, 'hidden', 0, 0, [1, null]], [10, 'hidden', 0, 0, [0, null]], [11, ['accidentalname', {value: 'natural' + ' ♮'}], 0, 0, [0]]];
    const ACTIONOBJ = [[0, 'action', x, y, [null, 1, 2, null]], [1, ['text', {'value': _('action')}], 0, 0, [0]], [2, 'hidden', 0, 0, [0, null]]];
    const ACTIONHELP = [[0, 'action', x, y, [null, 31, 1, null]], [1, 'settimbre', 0, 0, [0, 2, 4, 3]], [2, ['voicename', {'value': 'guitar'}], 0, 0, [1]], [3, 'hidden', 0, 0, [1, null]], [4, 'newnote', 0, 0, [1, 5, 8, 12]], [5, 'divide', 0, 0, [4, 6, 7]], [6, ['number', {'value': 1}], 0, 0, [5]], [7, ['number', {'value': 4}], 0, 0, [5]], [8, 'vspace', 0, 0, [4, 9]], [9, 'pitch', 0, 0, [8, 10, 11, null]], [10, ['solfege', {'value': 'sol'}], 0, 0, [9]], [11, ['number', {'value': 4}], 0, 0, [9]], [12, 'hidden', 0, 0, [4, 13]], [13, 'newnote', 0, 0, [12, 14, 17, 21]], [14, 'divide', 0, 0, [13, 15, 16]], [15, ['number', {'value': 1}], 0, 0, [14]], [16, ['number', {'value': 4}], 0, 0, [14]], [17, 'vspace', 0, 0, [13, 18]], [18, 'pitch', 0, 0, [17, 19, 20, null]], [19, ['solfege', {'value': 'mi'}], 0, 0, [18]], [20, ['number', {'value': 4}], 0, 0, [18]], [21, 'hidden', 0, 0, [13, 22]], [22, 'newnote', 0, 0, [21, 23, 26, 30]], [23, 'divide', 0, 0, [22, 24, 25]], [24, ['number', {'value': 1}], 0, 0, [23]], [25, ['number', {'value': 2}], 0, 0, [23]], [26, 'vspace', 0, 0, [22, 27]], [27, 'pitch', 0, 0, [26, 28, 29, null]], [28, ['solfege', {'value': 'sol'}], 0, 0, [27]], [29, ['number', {'value': 4}], 0, 0, [27]],	[30, 'hidden', 0, 0, [22, null]], [31, ['text', {'value': _('action')}], 0, 0, [0]]];
    const ARCHELP = [[0, 'everybeatdo', x, y, [null, 1, null]], [1, ['text', {'value': 'action'}], 0, 0, [0]], [2, ['action', {'collapsed': false}], x, y + 100, [null, 3, 4, null]], [3, ['text', {'value': 'action'}], 0, 0, [2]], [4, 'hidden', 0, 0, [2, 5]], [5, 'arc', 0, 0, [4, 8, 7, null]], [6, ['number', {'value': 360}], 0, 0, [8]], [7, ['number', {'value': 100}], 0, 0, [5]], [8, 'multiply', 0, 0, [5, 9, 6]], [9, 'mynotevalue', 0, 0, [8]]];
    const AMSYNTHHELP = [[0, ['newnote', {'collapsed': false}], 0, 0, [9, 1, 4, 8]], [1, 'divide', 0, 0, [0, 2, 3]], [2, ['number', {'value': 1}], 0, 0, [1]], [3, ['number', {'value': 2}], 0, 0, [1]], [4, 'vspace', 0, 0, [0, 5]], [5, 'pitch', 0, 0, [4, 6, 7, null]], [6, ['solfege', {'value': 'sol'}], 0, 0, [5]], [7, ['number', {'value': 4}], 0, 0, [5]], [8, 'hidden', 0, 0, [0, null]], [9, 'settimbre', x, y + 200, [null, 10, 0, 11]], [10, ['voicename', {'value': 'custom'}], 0, 0, [9]], [11, 'hidden', 0, 0, [9, null]], [12, ['timbre', {'collapsed': false}], x, y, [null, 13, 15, 14]], [13, ['text', {'value': 'custom'}], 0, 0, [12]], [14, 'hiddennoflow', 0, 0, [12, null]], [15, 'amsynth', 0, 0, [12, 16, null]], [16, ['number', {'value': 1}], 0, 0, [15]]];
    const ARTICULATIONOBJ = [[0, 'articulation', x, y, [null, 1, null, 2]], [1, ['number', {'value': 25}], 0, 0, [0]], [2, 'hidden', 0, 0, [0, null]]];
    const ARTICULATIONHELP = [[0, 'articulation', x, y, [null, 31, 1, null]], [1, 'settimbre', 0, 0, [0, 2, 4, 3]], [2, ['voicename', {'value': 'guitar'}], 0, 0, [1]], [3, 'hidden', 0, 0, [1, null]], [4, 'newnote', 0, 0, [1, 5, 8, 12]], [5, 'divide', 0, 0, [4, 6, 7]], [6, ['number', {'value': 1}], 0, 0, [5]], [7, ['number', {'value': 4}], 0, 0, [5]], [8, 'vspace', 0, 0, [4, 9]], [9, 'pitch', 0, 0, [8, 10, 11, null]], [10, ['solfege', {'value': 'sol'}], 0, 0, [9]], [11, ['number', {'value': 4}], 0, 0, [9]], [12, 'hidden', 0, 0, [4, 13]], [13, 'newnote', 0, 0, [12, 14, 17, 21]], [14, 'divide', 0, 0, [13, 15, 16]], [15, ['number', {'value': 1}], 0, 0, [14]], [16, ['number', {'value': 4}], 0, 0, [14]], [17, 'vspace', 0, 0, [13, 18]], [18, 'pitch', 0, 0, [17, 19, 20, null]], [19, ['solfege', {'value': 'mi'}], 0, 0, [18]], [20, ['number', {'value': 4}], 0, 0, [18]], [21, 'hidden', 0, 0, [13, 22]], [22, 'newnote', 0, 0, [21, 23, 26, 30]], [23, 'divide', 0, 0, [22, 24, 25]], [24, ['number', {'value': 1}], 0, 0, [23]], [25, ['number', {'value': 2}], 0, 0, [23]], [26, 'vspace', 0, 0, [22, 27]], [27, 'pitch', 0, 0, [26, 28, 29, null]], [28, ['solfege', {'value': 'sol'}], 0, 0, [27]], [29, ['number', {'value': 4}], 0, 0, [27]], [30, 'hidden', 0, 0, [22, null]], [31, ['number', {'value': 25}], 0, 0, [0]]];
    const AUGMENTED1OBJ = [[0, 'semitoneinterval', x, y, [null, 1, 6, 7]], [1, 'plus', 0, 0, [0, 2, 3]], [2, ['intervalname', {'value': 'augmented 1'}], 0, 0, [1]], [3, 'multiply', 0, 0, [1, 4, 5]], [4, ['number', {'value': 0}], 0, 0, [3]], [5, ['number', {'value': 12}], 0, 0, [3]], [6, 'vspace', 0, 0, [0, null]], [7, 'hidden', 0, 0, [0, null]]];
    const AUGMENTED2OBJ = [[0, 'semitoneinterval', x, y, [null, 1, 6, 7]], [1, 'plus', 0, 0, [0, 2, 3]], [2, ['intervalname', {'value': 'augmented 2'}], 0, 0, [1]], [3, 'multiply', 0, 0, [1, 4, 5]], [4, ['number', {'value': 0}], 0, 0, [3]], [5, ['number', {'value': 12}], 0, 0, [3]], [6, 'vspace', 0, 0, [0, null]], [7, 'hidden', 0, 0, [0, null]]];
    const AUGMENTED3OBJ = [[0, 'semitoneinterval', x, y, [null, 1, 6, 7]], [1, 'plus', 0, 0, [0, 2, 3]], [2, ['intervalname', {'value': 'augmented 3'}], 0, 0, [1]], [3, 'multiply', 0, 0, [1, 4, 5]], [4, ['number', {'value': 0}], 0, 0, [3]], [5, ['number', {'value': 12}], 0, 0, [3]], [6, 'vspace', 0, 0, [0, null]], [7, 'hidden', 0, 0, [0, null]]];
    const AUGMENTED4OBJ = [[0, 'semitoneinterval', x, y, [null, 1, 6, 7]], [1, 'plus', 0, 0, [0, 2, 3]], [2, ['intervalname', {'value': 'augmented 4'}], 0, 0, [1]], [3, 'multiply', 0, 0, [1, 4, 5]], [4, ['number', {'value': 0}], 0, 0, [3]], [5, ['number', {'value': 12}], 0, 0, [3]], [6, 'vspace', 0, 0, [0, null]], [7, 'hidden', 0, 0, [0, null]]];
    const AUGMENTED5OBJ = [[0, 'semitoneinterval', x, y, [null, 1, 6, 7]], [1, 'plus', 0, 0, [0, 2, 3]], [2, ['intervalname', {'value': 'augmented 5'}], 0, 0, [1]], [3, 'multiply', 0, 0, [1, 4, 5]], [4, ['number', {'value': 0}], 0, 0, [3]], [5, ['number', {'value': 12}], 0, 0, [3]], [6, 'vspace', 0, 0, [0, null]], [7, 'hidden', 0, 0, [0, null]]];
    const AUGMENTED6OBJ = [[0, 'semitoneinterval', x, y, [null, 1, 6, 7]], [1, 'plus', 0, 0, [0, 2, 3]], [2, ['intervalname', {'value': 'augmented 6'}], 0, 0, [1]], [3, 'multiply', 0, 0, [1, 4, 5]], [4, ['number', {'value': 0}], 0, 0, [3]], [5, ['number', {'value': 12}], 0, 0, [3]], [6, 'vspace', 0, 0, [0, null]], [7, 'hidden', 0, 0, [0, null]]];
    const AUGMENTED7OBJ = [[0, 'semitoneinterval', x, y, [null, 1, 6, 7]], [1, 'plus', 0, 0, [0, 2, 3]], [2, ['intervalname', {'value': 'augmented 7'}], 0, 0, [1]], [3, 'multiply', 0, 0, [1, 4, 5]], [4, ['number', {'value': 0}], 0, 0, [3]], [5, ['number', {'value': 12}], 0, 0, [3]], [6, 'vspace', 0, 0, [0, null]], [7, 'hidden', 0, 0, [0, null]]];
    const AUGMENTED8OBJ = [[0, 'semitoneinterval', x, y, [null, 1, 6, 7]], [1, 'plus', 0, 0, [0, 2, 3]], [2, ['intervalname', {'value': 'augmented 8'}], 0, 0, [1]], [3, 'multiply', 0, 0, [1, 4, 5]], [4, ['number', {'value': 0}], 0, 0, [3]], [5, ['number', {'value': 12}], 0, 0, [3]], [6, 'vspace', 0, 0, [0, null]], [7, 'hidden', 0, 0, [0, null]]];
    const BACKWARDOBJ = [[0, 'backward', x, y, [null, 1, null]], [1, 'hidden', 0, 0, [0, null]]];
    const BEATVALUEHELP = [[0, 'setheading', x, y, [null, 2, null]], [1, 'beatvalue', 0, 0, [2]], [2, 'multiply', 0, 0, [0, 1, 3]], [3, ['number', {'value': 90}], 0, 0, [2]]];
    const BOTTLEOBJ = [[0, 'playdrum', x, y, [null, 1, null]], [1, ['effectsname', {'value': 'bottle'}], 0, 0, [0]]];
    const BOTTOMPOSHELP = [[0, 'setheading', x, y, [2, 1, 14]], [1, ['number', {'value': 0}], 0, 0, [0]], [2, ['start', {'collapsed': false}], x, y, [null, 0, null]], [3, 'if', 0, 0, [4, 13, 8, null]], [4, 'forward', 0, 0, [14, 5, 3]], [5, ['number', {'value': 10}], 0, 0, [4]], [6, 'setxy', 0, 0, [8, 7, 10, 9]], [7, ['number', {'value': 0}], 0, 0, [6]], [8, 'penup', 0, 0, [3, 6]], [9, 'pendown', 0, 0, [6, null]], [10, 'bottompos', 0, 0, [6]], [11, 'toppos', 0, 0, [13]], [12, 'y', 0, 0, [13]], [13, 'greater', 0, 0, [3, 12, 11]], [14, 'forever', 0, 0, [0, 4, null]]];
    const BOX1 = [[0, ['namedbox', {'value': _('box1')}], x, y, [null]]];
    const BOX1HELP = [[0, ['storein2', {'value': 'box1'}], x, y, [null, 1, null]], [1, ['number', {'value': 1}], 0, 0, [0]], [2, ['namedbox', {'value': 'box1'}], 0, 0, [11]], [3, 'incrementOne', 0, 0, [10, 4, null]], [4, ['namedbox', {'value': 'box1'}], 0, 0, [3]], [5, ['nameddo', {'value': _('action')}], 0, 0, [10, null]], [6, ['nameddo', {'value': _('action')}], 0, 0, [8, null]], [7, 'backward', 0, 0, [10, 8, 9]], [8, 'hidden', 0, 0, [7, 6]], [9, 'hidden', 0, 0, [7, null]], [10, 'ifthenelse', 0, 0, [null, 11, 5, 7, 3]], [11, 'equal', 0, 0, [10, 2, 12]], [12, ['number', {'value': 1}], 0, 0, [11]]];
    const BOX2 = [[0, ['namedbox', {'value': _('box2')}], x, y, [null]]];
    const BOX2HELP = [[0, ['nameddo', {'value': _('action')}], x, y, [1, null]], [1, 'if', 0, 0, [null, 7, 0, 2]], [2, 'increment', 0, 0, [1, 3, 5, null]], [3, ['namedbox', {'value': 'box2'}], 0, 0, [2]], [4, ['namedbox', {'value': 'box2'}], 0, 0, [7]], [5, ['number', {'value': 4}], 0, 0, [2]], [6, ['number', {'value': 4}], 0, 0, [7]], [7, 'greater', 0, 0, [1, 4, 6]], [8, ['storein2', {'value': 'box2'}], 0, 0, [null, 9, null]], [9, ['number', {'value': 1}], 0, 0, [8]]];
    const BPMOBJ = [[0, 'setbpm', x, y, [null, 1, null, 2]], [1, ['number', {'value': 90}], 0, 0, [0]], [2, 'hidden', 0, 0, [0, null]]];
    const BPMOBJ2 = [[0, 'setbpm2', x, y, [null, 1, 3, 2, 6]], [1, ['number', {'value': 90}], 0, 0, [0]], [2, 'vspace', 0, 0, [0, null]], [3, 'divide', 0, 0, [0, 4, 5]], [4, ['number', {'value': 1}], 0, 0, [3]], [5, ['number', {'value': 4}], 0, 0, [3]], [6, 'hidden', 0, 0, [0, null]]];
    const BPMOBJ3 = [[0, 'setbpm3', x, y, [null, 1, 2, 5]], [1, ['number', {'value': 90}], 0, 0, [0]], [2, 'divide', 0, 0, [0, 3, 4]], [3, ['number', {'value': 1}], 0, 0, [2]], [4, ['number', {'value': 4}], 0, 0, [2]], [5, 'vspace', 0, 0, [0, null]]];
    const BPMHELP = [[0, ['start', {'collapsed': false}], x, y, [null, 1, null]], [1, 'setbpm3', 0, 0, [0, 2, 3, 6]], [2, ['number', {'value': 30}], 0, 0, [1]], [3, 'divide', 0, 0, [1, 4, 5]], [4, ['number', {'value': 1}], 0, 0, [3]], [5, ['number', {'value': 4}], 0, 0, [3]], [6, 'vspace', 0, 0, [1, 7]], [7, ['newnote', {'collapsed': false}], 0, 0, [6, 8, 11, 15]], [8, 'divide', 0, 0, [7, 9, 10]], [9, ['number', {'value': 1}], 0, 0, [8]], [10, ['number', {'value': 4}], 0, 0, [8]], [11, 'vspace', 0, 0, [7, 12]], [12, 'pitch', 0, 0, [11, 13, 14, null]], [13, ['solfege', {'value': 'sol'}], 0, 0, [12]], [14, ['number', {'value': 4}], 0, 0, [12]], [15, 'hidden', 0, 0, [7, null]]];
    const BROADCASTHELP = [[0, 'listen', x, y, [null, 7, 1, null]], [1, ['text', {'value': 'action'}], 0, 0, [0]], [2, 'listen', x, y + 100, [null, 3, 4, null]], [3, ['text', {'value': 'event'}], 0, 0, [2]], [4, ['text', {'value': 'action'}], 0, 0, [2]], [5, 'dispatch', x, y + 200, [null, 6, null]], [6, ['text', {'value': 'event'}], 0, 0, [5]], [7, 'myclick', 0, 0, [0]]];
    const BUBBLESOBJ = [[0, 'playdrum', x, y, [null, 1, null]], [1, ['effectsname', {'value': 'bubbles'}], 0, 0, [0]]];
    const CATOBJ = [[0, 'playdrum', x, y, [null, 1, null]], [1, ['effectsname', {'value': 'cat'}], 0, 0, [0]]];
    const CHINEOBJ = [[0, 'playdrum', x, y, [null, 1, null]], [1, ['drumname', {'value': 'chime'}], 0, 0, [0]]];
    const CHORDI = [[0, 'interval', x, y, [null, 1, 3, 2]], [1, ['number', {'value': 4}], 0, 0, [0]], [2, 'hidden', 0, 0, [0, null]], [3, 'interval', 0, 0, [0, 4, 6, 5]], [4, ['number', {'value': 2}], 0, 0, [3]], [5, 'hidden', 0, 0, [3, null]], [6, ['newnote', {'collapsed': false}], 0, 0, [3, 7, 10, 14]], [7, 'divide', 0, 0, [6, 8, 9]], [8, ['number', {'value': 1}], 0, 0, [7]], [9, ['number', {'value': 1}], 0, 0, [7]], [10, 'vspace', 0, 0, [6, 11]], [11, 'pitch', 0, 0, [10, 12, 13, null]], [12, ['solfege', {'value': 'do'}], 0, 0, [11]], [13, ['number', {'value': 4}], 0, 0, [11]], [14, 'hidden', 0, 0, [6, null]]];
    const CHORDIV = [[0, 'interval', x, y, [null, 1, 3, 2]], [1, ['number', {'value': 5}], 0, 0, [0]], [2, 'hidden', 0, 0, [0, null]], [3, 'interval', 0, 0, [0, 4, 6, 5]], [4, ['number', {'value': 3}], 0, 0, [3]], [5, 'hidden', 0, 0, [3, null]], [6, ['newnote', {'collapsed': false}], 0, 0, [3, 7, 10, 14]], [7, 'divide', 0, 0, [6, 8, 9]], [8, ['number', {'value': 1}], 0, 0, [7]], [9, ['number', {'value': 1}], 0, 0, [7]], [10, 'vspace', 0, 0, [6, 11]], [11, 'pitch', 0, 0, [10, 12, 13, null]], [12, ['solfege', {'value': 'do'}], 0, 0, [11]], [13, ['number', {'value': 4}], 0, 0, [11]], [14, 'hidden', 0, 0, [6, null]]];
    const CHORDV = [[0, 'interval', x, y, [null, 1, 3, 2]], [1, ['number', {'value': 3}], 0, 0, [0]], [2, 'hidden', 0, 0, [0, null]], [3, 'interval', 0, 0, [0, 4, 6, 5]], [4, ['number', {'value': 2}], 0, 0, [3]], [5, 'hidden', 0, 0, [3, null]], [6, ['newnote', {'collapsed': false}], 0, 0, [3, 7, 10, 14]], [7, 'divide', 0, 0, [6, 8, 9]], [8, ['number', {'value': 1}], 0, 0, [7]], [9, ['number', {'value': 1}], 0, 0, [7]], [10, 'vspace', 0, 0, [6, 11]], [11, 'pitch', 0, 0, [10, 12, 13, null]], [12, ['solfege', {'value': 're'}], 0, 0, [11]], [13, ['number', {'value': 4}], 0, 0, [11]], [14, 'hidden', 0, 0, [6, null]]];
    const CHORUSHELP = [[0, 'chorus', x, y, [null, 1, 2, 3, 4, null]], [1, ['number', {'value': 1.5}], 0, 0, [0]], [2, ['number', {'value': 3.5}], 0, 0, [0]], [3, ['number', {'value': 70}], 0, 0, [0]], [4, ['newnote', {'collapsed': false}], 0, 0, [0, 5, 8, 12]], [5, 'divide', 0, 0, [4, 6, 7]], [6, ['number', {'value': 1}], 0, 0, [5]], [7, ['number', {'value': 4}], 0, 0, [5]], [8, 'vspace', 0, 0, [4, 9]], [9, 'pitch', 0, 0, [8, 10, 11, null]], [10, ['solfege', {'value': 'sol'}], 0, 0, [9]], [11, ['number', {'value': 4}], 0, 0, [9]], [12, 'hidden', 0, 0, [4, null]]];
    const CLANGOBJ = [[0, 'playdrum', x, y, [null, 1, null]], [1, ['effectsname', {'value': 'clang'}], 0, 0, [0]]];
    const CLAPOBJ = [[0, 'playdrum', x, y, [null, 1, null]], [1, ['effectsname', {'value': 'clap'}], 0, 0, [0]]];
    const CLICKHELP = [[0, ['start', {'collapsed': false}], x, y, [null, 1, null]], [1, 'setturtlename2', 0, 0, [0, 2, 3]], [2, ['text', {'value': 'snare drum'}], 0, 0, [1]], [3, 'listen', 0, 0, [1, 5, 4, null]], [4, ['text', {'value': 'action'}], 0, 0, [3]], [5, 'myclick', 0, 0, [3]], [6, ['action', {'collapsed': false}], x, y + 100, [null, 7, 8, null]], [7, ['text', {'value': 'action'}], 0, 0, [6]], [8, 'hidden', 0, 0, [6, 9]], [9, ['newnote', {'collapsed': false}], 0, 0, [8, 10, 13, 15]], [10, 'divide', 0, 0, [9, 11, 12]], [11, ['number', {'value': 1}], 0, 0, [10]], [12, ['number', {'value': 4}], 0, 0, [10]], [13, 'vspace', 0, 0, [9, 14]], [14, 'playdrum', 0, 0, [13, 16, null]], [15, 'hidden', 0, 0, [9, null]], [16, 'turtlename', 0, 0, [14]]];
    const COWBELLOBJ = [[0, 'playdrum', x, y, [null, 1, null]], [1, ['drumname', {'value': 'cow bell'}], 0, 0, [0]]];
    const CRASHOBJ = [[0, 'playdrum', x, y, [null, 1, null]], [1, ['effectsname', {'value': 'crash'}], 0, 0, [0]]];
    const CRESCENDOOBJ = [[0, 'crescendo', x, y, [null, 1, null, 2]], [1, ['number', {'value': 5}], 0, 0, [0]], [2, 'hidden', 0, 0, [0, null]]];
    const CRESCENDOHELP = [[0, 'crescendo', x, y, [null, 31, 1, null]], [1, 'settimbre', 0, 0, [0, 2, 4, 3]], [2, ['voicename', {'value': 'guitar'}], 0, 0, [1]], [3, 'hidden', 0, 0, [1, null]], [4, 'newnote', 0, 0, [1, 5, 8, 12]], [5, 'divide', 0, 0, [4, 6, 7]], [6, ['number', {'value': 1}], 0, 0, [5]], [7, ['number', {'value': 4}], 0, 0, [5]], [8, 'vspace', 0, 0, [4, 9]], [9, 'pitch', 0, 0, [8, 10, 11, null]], [10, ['solfege', {'value': 'sol'}], 0, 0, [9]], [11, ['number', {'value': 4}], 0, 0, [9]], [12, 'hidden', 0, 0, [4, 13]], [13, 'newnote', 0, 0, [12, 14, 17, 21]], [14, 'divide', 0, 0, [13, 15, 16]], [15, ['number', {'value': 1}], 0, 0, [14]], [16, ['number', {'value': 4}], 0, 0, [14]], [17, 'vspace', 0, 0, [13, 18]], [18, 'pitch', 0, 0, [17, 19, 20, null]], [19, ['solfege', {'value': 'mi'}], 0, 0, [18]], [20, ['number', {'value': 4}], 0, 0, [18]], [21, 'hidden', 0, 0, [13, 22]], [22, 'newnote', 0, 0, [21, 23, 26, 30]], [23, 'divide', 0, 0, [22, 24, 25]], [24, ['number', {'value': 1}], 0, 0, [23]], [25, ['number', {'value': 2}], 0, 0, [23]], [26, 'vspace', 0, 0, [22, 27]], [27, 'pitch', 0, 0, [26, 28, 29, null]], [28, ['solfege', {'value': 'sol'}], 0, 0, [27]], [29, ['number', {'value': 4}], 0, 0, [27]], [30, 'hidden', 0, 0, [22, null]], [31, ['number', {'value': 5}], 0, 0, [0]]];
    const CRICKETOBJ = [[0, 'playdrum', x, y, [null, 1, null]], [1, ['effectsname', {'value': 'cricket'}], 0, 0, [0]]];
    const CUPOBJ = [[0, 'playdrum', x, y, [null, 1, null]], [1, ['drumname', {'value': 'cup drum'}], 0, 0, [0]]];
    const CUSTOMPITCHOBJ = [[0, 'pitch', x, y, [null, 1, 2, null]], [1, ['customNote', {'value': 'C(+0)'}], 0, 0, [0]], [2, ['number', {'value': 4}], 0, 0, [0]]];
    const DARBUKAOBJ = [[0, 'playdrum', x, y, [null, 1, null]], [1, ['drumname', {'value': 'darbuka drum'}], 0, 0, [0]]];
    const DECRESCENDOOBJ = [[0, 'decrescendo', x, y, [null, 1, null, 2]], [1, ['number', {'value': 5}], 0, 0, [0]], [2, 'hidden', 0, 0, [0, null]]];
    const DECRESCENDOHELP = [[0, 'decrescendo', x, y, [null, 31, 1, null]], [1, 'settimbre', 0, 0, [0, 2, 4, 3]], [2, ['voicename', {'value': 'guitar'}], 0, 0, [1]], [3, 'hidden', 0, 0, [1, null]], [4, 'newnote', 0, 0, [1, 5, 8, 12]], [5, 'divide', 0, 0, [4, 6, 7]], [6, ['number', {'value': 1}], 0, 0, [5]], [7, ['number', {'value': 4}], 0, 0, [5]], [8, 'vspace', 0, 0, [4, 9]], [9, 'pitch', 0, 0, [8, 10, 11, null]], [10, ['solfege', {'value': 'sol'}], 0, 0, [9]], [11, ['number', {'value': 4}], 0, 0, [9]], [12, 'hidden', 0, 0, [4, 13]], [13, 'newnote', 0, 0, [12, 14, 17, 21]], [14, 'divide', 0, 0, [13, 15, 16]], [15, ['number', {'value': 1}], 0, 0, [14]], [16, ['number', {'value': 4}], 0, 0, [14]], [17, 'vspace', 0, 0, [13, 18]], [18, 'pitch', 0, 0, [17, 19, 20, null]], [19, ['solfege', {'value': 'mi'}], 0, 0, [18]], [20, ['number', {'value': 4}], 0, 0, [18]], [21, 'hidden', 0, 0, [13, 22]], [22, 'newnote', 0, 0, [21, 23, 26, 30]], [23, 'divide', 0, 0, [22, 24, 25]], [24, ['number', {'value': 1}], 0, 0, [23]], [25, ['number', {'value': 2}], 0, 0, [23]], [26, 'vspace', 0, 0, [22, 27]], [27, 'pitch', 0, 0, [26, 28, 29, null]], [28, ['solfege', {'value': 'sol'}], 0, 0, [27]], [29, ['number', {'value': 4}], 0, 0, [27]], [30, 'hidden', 0, 0, [22, null]], [31, ['number', {'value': 5}], 0, 0, [0]]];
    const DEFINEMODEOBJ = [[0, 'definemode', x, y, [null, 1, 2, 16]], [1, ['modename', {'value': 'custom'}], 0, 0, [0]], [2, 'pitchnumber', 0, 0, [0, 3, 4]], [3, ['number', {'value': 0}], 0, 0, [2]], [4, 'pitchnumber', 0, 0, [2, 5, 6]], [5, ['number', {'value': 2}], 0, 0, [4]], [6, 'pitchnumber', 0, 0, [4, 7, 8]], [7, ['number', {'value': 4}], 0, 0, [6]], [8, 'pitchnumber', 0, 0, [6, 9, 10]], [9, ['number', {'value': 5}], 0, 0, [8]], [10, 'pitchnumber', 0, 0, [8, 11, 12]], [11, ['number', {'value': 7}], 0, 0, [10]], [12, 'pitchnumber', 0, 0, [10, 13, 14]], [13, ['number', {'value': 9}], 0, 0, [12]], [14, 'pitchnumber', 0, 0, [12, 15, null]], [15, ['number', {'value': 11}], 0, 0, [14]], [16, 'hidden', 0, 0, [0, null]]];
    const DELTAPITCHHELP = [[0, ['action', {'collapsed': false}], x, y + 100, [null, 1, 2, null]], [1, ['text', {'value': 'action'}], 0, 0, [0]], [2, 'hidden', 0, 0, [0, 3]], [3, 'forward', 533, 361, [2, 6, null]], [4, 'everybeatdo', x, y, [null, 5, null]], [5, ['text', {'value': 'action'}], 0, 0, [4]], [6, 'deltapitch', 0, 0, [3]]];
    const DIMINISHED2OBJ = [[0, 'semitoneinterval', x, y, [null, 1, 6, 7]], [1, 'plus', 0, 0, [0, 2, 3]], [2, ['intervalname', {'value': 'diminished 2'}], 0, 0, [1]], [3, 'multiply', 0, 0, [1, 4, 5]], [4, ['number', {'value': 0}], 0, 0, [3]], [5, ['number', {'value': 12}], 0, 0, [3]], [6, 'vspace', 0, 0, [0, null]], [7, 'hidden', 0, 0, [0, null]]];
    const DIMINISHED3OBJ = [[0, 'semitoneinterval', x, y, [null, 1, 6, 7]], [1, 'plus', 0, 0, [0, 2, 3]], [2, ['intervalname', {'value': 'diminished 3'}], 0, 0, [1]], [3, 'multiply', 0, 0, [1, 4, 5]], [4, ['number', {'value': 0}], 0, 0, [3]], [5, ['number', {'value': 12}], 0, 0, [3]], [6, 'vspace', 0, 0, [0, null]], [7, 'hidden', 0, 0, [0, null]]];
    const DIMINISHED4OBJ = [[0, 'semitoneinterval', x, y, [null, 1, 6, 7]], [1, 'plus', 0, 0, [0, 2, 3]], [2, ['intervalname', {'value': 'diminished 4'}], 0, 0, [1]], [3, 'multiply', 0, 0, [1, 4, 5]], [4, ['number', {'value': 0}], 0, 0, [3]], [5, ['number', {'value': 12}], 0, 0, [3]], [6, 'vspace', 0, 0, [0, null]], [7, 'hidden', 0, 0, [0, null]]];
    const DIMINISHED5OBJ = [[0, 'semitoneinterval', x, y, [null, 1, 6, 7]], [1, 'plus', 0, 0, [0, 2, 3]], [2, ['intervalname', {'value': 'diminished 5'}], 0, 0, [1]], [3, 'multiply', 0, 0, [1, 4, 5]], [4, ['number', {'value': 0}], 0, 0, [3]], [5, ['number', {'value': 12}], 0, 0, [3]], [6, 'vspace', 0, 0, [0, null]], [7, 'hidden', 0, 0, [0, null]]];
    const DIMINISHED6OBJ = [[0, 'semitoneinterval', x, y, [null, 1, 6, 7]], [1, 'plus', 0, 0, [0, 2, 3]], [2, ['intervalname', {'value': 'diminished 6'}], 0, 0, [1]], [3, 'multiply', 0, 0, [1, 4, 5]], [4, ['number', {'value': 0}], 0, 0, [3]], [5, ['number', {'value': 12}], 0, 0, [3]], [6, 'vspace', 0, 0, [0, null]], [7, 'hidden', 0, 0, [0, null]]];
    const DIMINISHED7OBJ = [[0, 'semitoneinterval', x, y, [null, 1, 6, 7]], [1, 'plus', 0, 0, [0, 2, 3]], [2, ['intervalname', {'value': 'diminished 7'}], 0, 0, [1]], [3, 'multiply', 0, 0, [1, 4, 5]], [4, ['number', {'value': 0}], 0, 0, [3]], [5, ['number', {'value': 12}], 0, 0, [3]], [6, 'vspace', 0, 0, [0, null]], [7, 'hidden', 0, 0, [0, null]]];
    const DIMINISHED8OBJ = [[0, 'semitoneinterval', x, y, [null, 1, 6, 7]], [1, 'plus', 0, 0, [0, 2, 3]], [2, ['intervalname', {'value': 'diminished 8'}], 0, 0, [1]], [3, 'multiply', 0, 0, [1, 4, 5]], [4, ['number', {'value': 0}], 0, 0, [3]], [5, ['number', {'value': 12}], 0, 0, [3]], [6, 'vspace', 0, 0, [0, null]], [7, 'hidden', 0, 0, [0, null]]];
    const DISHELP = [[0, 'dis', x, y, [null, 11, 1, 10]], [1, 'newnote', x, y, [0, 2, 5, 9]], [2, 'divide', 0, 0, [1, 3, 4]], [3, ['number', {'value': 1}], 0, 0, [2]], [4, ['number', {'value': 4}], 0, 0, [2]], [5, 'vspace', 0, 0, [1, 6]], [6, 'pitch', 0, 0, [5, 7, 8, null]], [7, ['solfege', {'value': 'sol'}], 0, 0, [6]], [8, ['number', {'value': 4}], 0, 0, [6]], [9, 'hidden', 0, 0, [1, null]], [10, 'hidden', 0, 0, [0, null]], [11, ['number', {value: 40}], 0, 0, [0]]];
    const DOHELP = [[0, 'do', x, y, [null, 2, 3]], [1, ['text', {'value': 'part 2'}], 790, 122, [2]], [2, 'oneOf', 0, 0, [0, 4, 1]], [3, 'vspace', 0, 0, [0, null]], [4, ['text', {'value': 'part 1'}], 0, 0, [2]]];
    const DOGOBJ = [[0, 'playdrum', x, y, [null, 1, null]], [1, ['effectsname', {'value': 'dog'}], 0, 0, [0]]];
    const DOUBLYHELP = [[0, 'semitoneinterval', x, y, [null, 1, 6, 7]], [1, 'plus', 0, 0, [0, 8, 3]], [2, ['intervalname', {'value': 'augmented 5'}], 0, 0, [8]], [3, 'multiply', 0, 0, [1, 4, 5]], [4, ['number', {'value': 0}], 0, 0, [3]], [5, ['number', {'value': 12}], 0, 0, [3]], [6, 'vspace', 0, 0, [0, 9]], [7, 'hidden', 0, 0, [0, 18]], [8, 'doubly', 0, 0, [1, 2]], [9, ['newnote', {'collapsed': false}], 0, 0, [6, 10, 13, 17]], [10, 'divide', 0, 0, [9, 11, 12]], [11, ['number', {'value': 1}], 0, 0, [10]], [12, ['number', {'value': 4}], 0, 0, [10]], [13, 'vspace', 0, 0, [9, 14]], [14, 'pitch', 0, 0, [13, 15, 16, null]], [15, ['solfege', {'value': 'sol'}], 0, 0, [14]], [16, ['number', {'value': 4}], 0, 0, [14]], [17, 'hidden', 0, 0, [9, null]], [18, ['newnote', {'collapsed': false}], 0, 0, [7, 19, 22, 26]], [19, 'divide', 0, 0, [18, 20, 21]], [20, ['number', {'value': 1}], 0, 0, [19]], [21, ['number', {'value': 4}], 0, 0, [19]], [22, 'vspace', 0, 0, [18, 23]], [23, 'pitch', 0, 0, [22, 24, 25, 27]], [24, ['solfege', {'value': 'sol'}], 0, 0, [23]], [25, ['number', {'value': 4}], 0, 0, [23]], [26, 'hidden', 0, 0, [18, null]], [27, 'pitch', 0, 0, [23, 28, 29, null]], [28, ['solfege', {'value': 'mi'}], 0, 0, [27]], [29, ['number', {'value': 5}], 0, 0, [27]]];
    const DOWNMAJOR3OBJ = [[0, 'semitoneinterval', x, y, [null, 1, 6, 7]], [1, 'minus', 0, 0, [0, 8, 3]], [2, ['intervalname', {'value': 'major 3'}], 0, 0, [8]], [3, 'multiply', 0, 0, [1, 4, 5]], [4, ['number', {'value': 0}], 0, 0, [3]], [5, ['number', {'value': 12}], 0, 0, [3]], [6, 'vspace', 0, 0, [0, null]], [7, 'hidden', 0, 0, [0, null]], [8, 'neg', 0, 0, [1, 2]]];
    const DOWNMAJOR6OBJ = [[0, 'semitoneinterval', x, y, [null, 1, 6, 7]], [1, 'minus', 0, 0, [0, 8, 3]], [2, ['intervalname', {'value': 'major 6'}], 0, 0, [8]], [3, 'multiply', 0, 0, [1, 4, 5]], [4, ['number', {'value': 0}], 0, 0, [3]], [5, ['number', {'value': 12}], 0, 0, [3]], [6, 'vspace', 0, 0, [0, null]], [7, 'hidden', 0, 0, [0, null]], [8, 'neg', 0, 0, [1, 2]]];
    const DOWNMINOR3OBJ = [[0, 'semitoneinterval', x, y, [null, 1, 6, 7]], [1, 'minus', 0, 0, [0, 8, 3]], [2, ['intervalname', {'value': 'minor 3'}], 0, 0, [8]], [3, 'multiply', 0, 0, [1, 4, 5]], [4, ['number', {'value': 0}], 0, 0, [3]], [5, ['number', {'value': 12}], 0, 0, [3]], [6, 'vspace', 0, 0, [0, null]], [7, 'hidden', 0, 0, [0, null]], [8, 'neg', 0, 0, [1, 2]]];
    const DOWNMINOR6OBJ = [[0, 'semitoneinterval', x, y, [null, 1, 6, 7]], [1, 'minus', 0, 0, [0, 8, 3]], [2, ['intervalname', {'value': 'minor 6'}], 0, 0, [8]], [3, 'multiply', 0, 0, [1, 4, 5]], [4, ['number', {'value': 0}], 0, 0, [3]], [5, ['number', {'value': 12}], 0, 0, [3]], [6, 'vspace', 0, 0, [0, null]], [7, 'hidden', 0, 0, [0, null]], [8, 'neg', 0, 0, [1, 2]]];
    const DOWNSIXTHINTERVALOBJ = [[0, 'interval', x, y, [null, 1, 6, 8]], [1, 'minus', 0, 0, [0, 2, 3]], [2, ['number', {'value': -5}], 0, 0, [1]], [3, 'multiply', 0, 0, [1, 4, 5]], [4, ['number', {'value': 0}], 0, 0, [3]], [5, 'modelength', 0, 0, [3]], [6, 'vspace', 0, 0, [0, 7]], [7, 'vspace', 0, 0, [6, null]], [8, 'hidden', 0, 0, [0, null]]];
    const DOWNTHIRDINTERVALOBJ = [[0, 'interval', x, y, [null, 1, 6, 8]], [1, 'minus', 0, 0, [0, 2, 3]], [2, ['number', {'value': -2}], 0, 0, [1]], [3, 'multiply', 0, 0, [1, 4, 5]], [4, ['number', {'value': 0}], 0, 0, [3]], [5, 'modelength', 0, 0, [3]], [6, 'vspace', 0, 0, [0, 7]], [7, 'vspace', 0, 0, [6, null]], [8, 'hidden', 0, 0, [0, null]]];
    const DOWNSIXTHOBJ = [[0, 'setscalartransposition', x, y, [null, 1, 6, 8]], [1, 'minus', 0, 0, [0, 2, 3]], [2, ['number', {'value': -5}], 0, 0, [1]], [3, 'multiply', 0, 0, [1, 4, 5]], [4, ['number', {'value': 0}], 0, 0, [3]], [5, 'modelength', 0, 0, [3]], [6, 'vspace', 0, 0, [0, 7]], [7, 'vspace', 0, 0, [6, null]], [8, 'hidden', 0, 0, [0, null]]];
    const DOWNTHIRDOBJ = [[0, 'setscalartransposition', x, y, [null, 1, 6, 8]], [1, 'minus', 0, 0, [0, 2, 3]], [2, ['number', {'value': -2}], 0, 0, [1]], [3, 'multiply', 0, 0, [1, 4, 5]], [4, ['number', {'value': 0}], 0, 0, [3]], [5, 'modelength', 0, 0, [3]], [6, 'vspace', 0, 0, [0, 7]], [7, 'vspace', 0, 0, [6, null]], [8, 'hidden', 0, 0, [0, null]]];
    const DOTOBJ = [[0, 'rhythmicdot', x, y, [null, null, 1]], [1, 'hidden', 0, 0, [0, null]]];
    const DOTOBJ2 = [[0, 'rhythmicdot2', x, y, [null, 1, null, 2]], [1, ['number', {'value': 1}], 0, 0, [0]], [2, 'hidden', 0, 0, [0, null]]];
    const DRIFTOBJ = [[0, 'drift', x, y, [null, null, 1]], [1, 'hidden', 0, 0, [0, null]]];
    const DUCKOBJ = [[0, 'playdrum', x, y, [null, 1, null]], [1, ['effectsname', {'value': 'duck'}], 0, 0, [0]]];
    const DUOSYNTHHELP = [[0, 'duosynth', x, y, [15, 1, 2, null]], [1, ['number', {'value': 10}], 0, 0, [0]], [2, ['number', {'value': 5}], 0, 0, [0]], [3, ['newnote', {'collapsed': false}], 0, 0, [12, 4, 7, 11]], [4, 'divide', 0, 0, [3, 5, 6]], [5, ['number', {'value': 1}], 0, 0, [4]], [6, ['number', {'value': 2}], 0, 0, [4]], [7, 'vspace', 0, 0, [3, 8]], [8, 'pitch', 0, 0, [7, 9, 10, null]], [9, ['solfege', {'value': 'sol'}], 0, 0, [8]], [10, ['number', {'value': 4}], 0, 0, [8]], [11, 'hidden', 0, 0, [3, null]], [12, 'settimbre', x, y + 200, [null, 13, 3, 14]], [13, ['voicename', {'value': 'custom'}], 0, 0, [12]], [14, 'hidden', 0, 0, [12, null]], [15, ['timbre', {'collapsed': false}], x, y, [null, 16, 0, 17]], [16, ['text', {'value': 'custom'}], 0, 0, [15]], [17, 'hiddennoflow', 0, 0, [15, null]]];
    const DUPOBJ = [[0, 'duplicatenotes', x, y, [null, 1, null, 2]], [1, ['number', {'value': 2}], 0, 0, [0]], [2, 'hidden', 0, 0, [0, null]]];
    const DUPHELP = [[0, ['newnote', {'collapsed': false}], 0, 0, [18, 1, 4, 8]], [1, 'divide', 0, 0, [0, 2, 3]], [2, ['number', {'value': 1}], 0, 0, [1]], [3, ['number', {'value': 4}], 0, 0, [1]], [4, 'vspace', 0, 0, [0, 5]], [5, 'pitch', 0, 0, [4, 6, 7, null]], [6, ['solfege', {'value': 'sol'}], 0, 0, [5]], [7, ['number', {'value': 4}], 0, 0, [5]], [8, 'hidden', 0, 0, [0, 9]], [9, ['newnote', {'collapsed': false}], 0, 0, [8, 10, 13, 17]], [10, 'divide', 0, 0, [9, 11, 12]], [11, ['number', {'value': 1}], 0, 0, [10]], [12, ['number', {'value': 4}], 0, 0, [10]], [13, 'vspace', 0, 0, [9, 14]], [14, 'pitch', 0, 0, [13, 15, 16, null]], [15, ['solfege', {'value': 'mi'}], 0, 0, [14]], [16, ['number', {'value': 4}], 0, 0, [14]], [17, 'hidden', 0, 0, [9, null]], [18, 'duplicatenotes', x, y, [null, 19, 0, 20]], [19, ['number', {'value': 2}], 0, 0, [18]], [20, 'hidden', 0, 0, [18, null]], [21, ['newnote', {'collapsed': false}], x, y + 400, [null, 22, 25, 29]], [22, 'divide', 0, 0, [21, 23, 24]], [23, ['number', {'value': 1}], 0, 0, [22]], [24, ['number', {'value': 4}], 0, 0, [22]], [25, 'vspace', 0, 0, [21, 26]], [26, 'pitch', 0, 0, [25, 27, 28, null]], [27, ['solfege', {'value': 'sol'}], 0, 0, [26]], [28, ['number', {'value': 4}], 0, 0, [26]], [29, 'hidden', 0, 0, [21, 30]], [30, ['newnote', {'collapsed': false}], 0, 0, [29, 31, 34, 38]], [31, 'divide', 0, 0, [30, 32, 33]], [32, ['number', {'value': 1}], 0, 0, [31]], [33, ['number', {'value': 4}], 0, 0, [31]], [34, 'vspace', 0, 0, [30, 35]], [35, 'pitch', 0, 0, [34, 36, 37, null]], [36, ['solfege', {'value': 'sol'}], 0, 0, [35]], [37, ['number', {'value': 4}], 0, 0, [35]], [38, 'hidden', 0, 0, [30, 39]], [39, ['newnote', {'collapsed': false}], 0, 0, [38, 40, 43, 47]], [40, 'divide', 0, 0, [39, 41, 42]], [41, ['number', {'value': 1}], 0, 0, [40]], [42, ['number', {'value': 4}], 0, 0, [40]], [43, 'vspace', 0, 0, [39, 44]], [44, 'pitch', 0, 0, [43, 45, 46, null]], [45, ['solfege', {'value': 'mi'}], 0, 0, [44]], [46, ['number', {'value': 4}], 0, 0, [44]], [47, 'hidden', 0, 0, [39, 48]], [48, ['newnote', {'collapsed': false}], 0, 0, [47, 49, 52, 56]], [49, 'divide', 0, 0, [48, 50, 51]], [50, ['number', {'value': 1}], 0, 0, [49]], [51, ['number', {'value': 4}], 0, 0, [49]], [52, 'vspace', 0, 0, [48, 53]], [53, 'pitch', 0, 0, [52, 54, 55, null]], [54, ['solfege', {'value': 'mi'}], 0, 0, [53]], [55, ['number', {'value': 4}], 0, 0, [53]], [56, 'hidden', 0, 0, [48, null]]];
    const EFFECTSHELP = [[0, 'newnote', x, y, [null, 1, 4, 7]], [1, 'divide', 0, 0, [0, 2, 3]], [2, ['number', {'value': 1}], 0, 0, [1]], [3, ['number', {'value': 4}], 0, 0, [1]], [4, 'vspace', 0, 0, [0, 5]], [5, 'playdrum', 0, 0, [4, 6, null]], [6, ['drumname', {'value': _('duck')}], 0, 0, [5]], [7, 'hidden', 0, 0, [0, null]]];
    const EIHELP = [[0, 'newnote', x, y, [null, 1, 4, 8]], [1, 'divide', 0, 0, [0, 2, 3]], [2, ['number', {'value': 1}], 0, 0, [1]], [3, ['number', {'value': 4}], 0, 0, [1]], [4, 'vspace', 0, 0, [0, 5]], [5, 'pitch', 0, 0, [4, 6, 7, null]], [6, ['eastindiansolfege', {'value': 'pa'}], 0, 0, [5]], [7, ['number', {'value': 4}], 0, 0, [5]], [8, 'hidden', 0, 0, [0, null]]];
    const ELAPSEDHELP = [[0, ['newnote', {'collapsed': false}], 0, 0, [6, 1, 4, 5]], [1, 'divide', 0, 0, [0, 2, 3]], [2, ['number', {'value': 1}], 0, 0, [1]], [3, ['number', {'value': 4}], 0, 0, [1]], [4, 'vspace', 0, 0, [0, 8]], [5, 'hidden', 0, 0, [0, null]], [6, 'repeat', 0, 0, [19, 7, 0, null]], [7, ['number', {'value': 400}], 0, 0, [6]], [8, 'playdrum', 0, 0, [4, 9, null]], [9, ['drumname', {'value': 'kick drum'}], 0, 0, [8]], [10, ['action', {'collapsed': false}], x,  y + 400, [null, 11, 12, null]], [11, ['text', {'value': 'action'}], 0, 0, [10]], [12, 'hidden', 0, 0, [10, 13]], [13, 'setshade', 0, 0, [12, 18, 14]], [14, 'forward', 0, 0, [13, 15, 16]], [15, ['number', {'value': 100}], 0, 0, [14]], [16, 'right', 0, 0, [14, 17, null]], [17, ['number', {'value': 90}], 0, 0, [16]], [18, 'elapsednotes', 0, 0, [13]], [19, 'everybeatdo', x, y, [null, 20, 6]], [20, ['text', {'value': 'action'}], 0, 0, [19]]];
    const ELAPSEDNOTESOBJ = [[0, 'elapsednotes2', x, y, [null, 1]], [1, 'divide', 0, 0, [0, 2, 3]], [2, ['number', {'value': 1}], 0, 0, [1]], [3, ['number', {'value': 4}], 0, 0, [1]]];
    const ELIFHELP = [[0, ['newnote', {'collapsed': false}], 0, 0, [16, 1, 4, 5]], [1, 'divide', 0, 0, [0, 2, 3]], [2, ['number', {'value': 1}], 0, 0, [1]], [3, ['number', {'value': 4}], 0, 0, [1]], [4, 'vspace', 0, 0, [0, 6]], [5, 'hidden', 0, 0, [0, null]], [6, 'playdrum', 0, 0, [4, 7, null]], [7, ['drumname', {'value': 'kick drum'}], 0, 0, [6]], [8, ['newnote', {'collapsed': false}], 0, 0, [16, 9, 12, 15]], [9, 'divide', 0, 0, [8, 10, 11]], [10, ['number', {'value': 1}], 0, 0, [9]], [11, ['number', {'value': 4}], 0, 0, [9]], [12, 'vspace', 0, 0, [8, 13]], [13, 'playdrum', 0, 0, [12, 14, null]], [14, ['drumname', {'value': 'snare drum'}], 0, 0, [13]], [15, 'hidden', 0, 0, [8, null]], [16, 'ifthenelse', 0, 0, [17, 18, 8, 0, null]], [17, 'forever', x, y, [null, 16, null]], [18, 'mousebutton', 0, 0, [16]]];
    const EIGHTHOBJ = [[0, 'rhythm2', x, y, [null, 1, 2, 5]], [1, ['number', {'value': 1}], 0, 0, [0]], [2, 'divide', 0, 0, [0, 3, 4]], [3, ['number', {'value': 1}], 0, 0, [2]], [4, ['number', {'value': 8}], 0, 0, [2]], [5, 'vspace', 0, 0, [0, null]]];
    const FIFTHOBJ = [[0, 'setscalartransposition', x, y, [null, 1, 6, 8]], [1, 'plus', 0, 0, [0, 2, 3]], [2, ['number', {'value': 4}], 0, 0, [1]], [3, 'multiply', 0, 0, [1, 4, 5]], [4, ['number', {'value': 0}], 0, 0, [3]], [5, 'modelength', 0, 0, [3]], [6, 'vspace', 0, 0, [0, 7]], [7, 'vspace', 0, 0, [6, null]], [8, 'hidden', 0, 0, [0, null]]];
    const FIFTHINTERVALOBJ = [[0, 'interval', x, y, [null, 1, 6, 8]], [1, 'plus', 0, 0, [0, 2, 3]], [2, ['number', {'value': 4}], 0, 0, [1]], [3, 'multiply', 0, 0, [1, 4, 5]], [4, ['number', {'value': 0}], 0, 0, [3]], [5, 'modelength', 0, 0, [3]], [6, 'vspace', 0, 0, [0, 7]], [7, 'vspace', 0, 0, [6, null]], [8, 'hidden', 0, 0, [0, null]]];
    const FILLOBJ = [[0, 'fill', x, y, [null, null, 1]], [1, 'hidden', 0, 0, [0, null]]];
    const FILLHELP = [[0, 'fill', x, y, [null, 2, 1]], [1, 'hidden', 0, 0, [0, null]], [2, 'repeat', 0, 0, [0, 3, 4, null]], [3, ['number', {'value': 4}], 0, 0, [2]], [4, 'forward', 0, 0, [2, 5, 6]], [5, ['number', {'value': 100}], 0, 0, [4]], [6, 'right', 0, 0, [4, 7, null]], [7, ['number', {'value': 90}], 0, 0, [6]]];
    const FINGERCYMBALSOBJ = [[0, 'playdrum', x, y, [null, 1, null]], [1, ['drumname', {'value': 'finger cymbals'}], 0, 0, [0]]];
    const FLATOBJ = [[0, 'accidental', x, y, [null, 11, 1, 10]], [1, 'newnote', x, y, [0, 2, 5, 9]], [2, 'divide', 0, 0, [1, 3, 4]], [3, ['number', {'value': 1}], 0, 0, [2]], [4, ['number', {'value': 4}], 0, 0, [2]], [5, 'vspace', 0, 0, [1, 6]], [6, 'pitch', 0, 0, [5, 7, 8, null]], [7, ['solfege', {'value': 'sol'}], 0, 0, [6]], [8, ['number', {'value': 4}], 0, 0, [6]], [9, 'hidden', 0, 0, [1, null]], [10, 'hidden', 0, 0, [0, null]], [11, ['accidentalname', {value: 'flat' + ' ♭'}], 0, 0, [0]]];
    const FLOORTOMOBJ = [[0, 'playdrum', x, y, [null, 1, null]], [1, ['drumname', {'value': 'floor tom tom'}], 0, 0, [0]]];
    const FMSYNTHHELP = [[0, ['newnote', {'collapsed': false}], 0, 0, [9, 1, 4, 8]], [1, 'divide', 0, 0, [0, 2, 3]], [2, ['number', {'value': 1}], 0, 0, [1]], [3, ['number', {'value': 2}], 0, 0, [1]], [4, 'vspace', 0, 0, [0, 5]], [5, 'pitch', 0, 0, [4, 6, 7, null]], [6, ['solfege', {'value': 'sol'}], 0, 0, [5]], [7, ['number', {'value': 4}], 0, 0, [5]], [8, 'hidden', 0, 0, [0, null]], [9, 'settimbre', x, y + 200, [null, 10, 0, 11]], [10, ['voicename', {'value': 'custom'}], 0, 0, [9]], [11, 'hidden', 0, 0, [9, null]], [12, ['timbre', {'collapsed': false}], x, y, [null, 13, 15, 14]], [13, ['text', {'value': 'custom'}], 0, 0, [12]], [14, 'hiddennoflow', 0, 0, [12, null]], [15, 'fmsynth', 0, 0, [12, 16, null]], [16, ['number', {'value': 1}], 0, 0, [15]]];
    const FOREVERHELP = [[0, 'forever', x, y, [null, 1, null]], [1, ['nameddo', {'value': _('action')}], 0, 0, [0, null]]];
    const FORWARDHELP = [[0, 'repeat', x, y, [null, 1, 6, null]], [1, ['number', {'value': 4}], 0, 0, [0]], [2, 'forward', 0, 0, [11, 3, 4]], [3, ['number', {'value': 100}], 0, 0, [2]], [4, 'right', 0, 0, [2, 5, null]], [5, ['number', {'value': 90}], 0, 0, [4]], [6, ['newnote', {'collapsed': false}], 0, 0, [0, 7, 10, 14]], [7, 'divide', 0, 0, [6, 8, 9]], [8, ['number', {'value': 1}], 0, 0, [7]], [9, ['number', {'value': 4}], 0, 0, [7]], [10, 'vspace', 0, 0, [6, 11]], [11, 'pitch', 0, 0, [10, 12, 13, 2]], [12, ['solfege', {'value': 'sol'}], 0, 0, [11]], [13, ['number', {'value': 4}], 0, 0, [11]], [14, 'hidden', 0, 0, [6, null]]];
    const FOURTHOBJ = [[0, 'setscalartransposition', x, y, [null, 1, 6, 7]], [1, 'plus', 0, 0, [0, 2, 3]], [2, ['number', {'value': 3}], 0, 0, [1]], [3, 'multiply', 0, 0, [1, 4, 5]], [4, ['number', {'value': 0}], 0, 0, [3]], [5, 'modelength', 0, 0, [3]], [6, 'vspace', 0, 0, [0, null]], [7, 'hidden', 0, 0, [0, null]]];
    const FOURTHINTERVALOBJ = [[0, 'interval', x, y, [null, 1, 6, 7]], [1, 'plus', 0, 0, [0, 2, 3]], [2, ['number', {'value': 3}], 0, 0, [1]], [3, 'multiply', 0, 0, [1, 4, 5]], [4, ['number', {'value': 0}], 0, 0, [3]], [5, 'modelength', 0, 0, [3]], [6, 'vspace', 0, 0, [0, null]], [7, 'hidden', 0, 0, [0, null]]];
    const GLIDEOBJ = [[0, 'glide', x, y, [null, 1, 4, 5]], [1, 'divide', 0, 0, [0, 2, 3]], [2, ['number', {'value': 1}], 0, 0, [1]], [3, ['number', {'value': 16}], 0, 0, [1]], [4, 'vspace', 0, 0, [0, null]], [5, 'hidden', 0, 0, [0, null]]];
    const HALFOBJ = [[0, 'rhythm2', x, y, [null, 1, 2, 5]], [1, ['number', {'value': 1}], 0, 0, [0]], [2, 'divide', 0, 0, [0, 3, 4]], [3, ['number', {'value': 1}], 0, 0, [2]], [4, ['number', {'value': 2}], 0, 0, [2]], [5, 'vspace', 0, 0, [0, null]]];
    const HARMONICOBJ = [[0, 'harmonic', x, y, [null, 2, 1]], [1, 'hidden', 0, 0, [0, null]], [2, 'partial', 0, 0, [0, 3, 4]], [3, ['number', {'value': 1}], 0, 0, [2]], [4, 'partial', 0, 0, [2, 5, 6]], [5, ['number', {'value': 0.2}], 0, 0, [4]], [6, 'partial', 0, 0, [4, 7, null]], [7, ['number', {'value': 0.01}], 0, 0, [6]]];
    const HARMONIC2OBJ = [[0, 'harmonic2', x, y, [null, 2, null, 1]], [1, 'hidden', 0, 0, [0, null]], [2, ['number', {'value': 1}], 0, 0, [0]]];
    const HARMONICHELP = [[0, 'harmonic2', x, y, [null, 11, 1, 10]], [1, 'newnote', x, y, [0, 2, 5, 9]], [2, 'divide', 0, 0, [1, 3, 4]], [3, ['number', {'value': 1}], 0, 0, [2]], [4, ['number', {'value': 4}], 0, 0, [2]], [5, 'vspace', 0, 0, [1, 6]], [6, 'pitch', 0, 0, [5, 7, 8, null]], [7, ['solfege', {'value': 'sol'}], 0, 0, [6]], [8, ['number', {'value': 4}], 0, 0, [6]], [9, 'hidden', 0, 0, [1, null]], [10, 'hidden', 0, 0, [0, null]], [11, ['number', {value: 1}], 0, 0, [0]]];
    const HIHATOBJ = [[0, 'playdrum', x, y, [null, 1, null]], [1, ['drumname', {'value': 'hi hat'}], 0, 0, [0]]];
    const HOLLOWOBJ = [[0, 'hollowline', x, y, [null, null, 1]], [1, 'hidden', 0, 0, [0, null]]];
    const IFHELP = [[0, 'forever', x, y, [null, 1, null]], [1, 'if', 0, 0, [0, 2, 3, null]], [2, 'mousebutton', 0, 0, [1]], [3, ['newnote', {'collapsed': false}], 0, 0, [1, 4, 7, 10]], [4, 'divide', 0, 0, [3, 5, 6]], [5, ['number', {'value': 1}], 0, 0, [4]], [6, ['number', {'value': 4}], 0, 0, [4]], [7, 'vspace', 0, 0, [3, 8]], [8, 'playdrum', 0, 0, [7, 9, null]], [9, ['drumname', {'value': 'kick drum'}], 0, 0, [8]], [10, 'hidden', 0, 0, [3, null]]];
    const INTERVALOBJ = [[0, 'interval', x, y, [null, 1, null, 2]], [1, ['number', {'value': 5}], 0, 0, [0]], [2, 'hidden', 0, 0, [0, null]]];
    const INVERTOBJ = [[0, 'invert', x, y, [null, 1, 2, null, 3]], [1, ['solfege', {'value': 'sol'}], 0, 0, [0]], [2, ['number', {'value': 4}], 0, 0, [0]], [3, 'hidden', 0, 0, [0, null]]];
    const INVERT1OBJ = [[0, 'invert1', x, y, [null, 1, 2, 3, null, 4]], [1, ['solfege', {'value': 'sol'}], 0, 0, [0]], [2, ['number', {'value': 4}], 0, 0, [0]], [3, ['invertmode', {'value': 'even'}], 0, 0, [0]], [4, 'hidden', 0, 0, [0, null]]];
    const INVERTHELP = [[0, 'invert1', x, y, [null, 1, 2, 3, 5, 4]], [1, ['solfege', {'value': 'do'}], 0, 0, [0]], [2, ['number', {'value': 5}], 0, 0, [0]], [3, ['invertmode', {'value': 'even'}], 0, 0, [0]], [4, 'hidden', 0, 0, [0, 14]], [5, ['newnote', {'collapsed': false}], 0, 0, [0, 6, 9, 13]], [6, 'divide', 0, 0, [5, 7, 8]], [7, ['number', {'value': 1}], 0, 0, [6]], [8, ['number', {'value': 4}], 0, 0, [6]], [9, 'vspace', 0, 0, [5, 10]], [10, 'pitch', 0, 0, [9, 11, 12, null]], [11, ['solfege', {'value': 'fa'}], 0, 0, [10]], [12, ['number', {'value': 4}], 0, 0, [10]], [13, 'hidden', 0, 0, [5, null]], [14, ['newnote', {'collapsed': false}], 0, 0, [4, 15, 18, 22]], [15, 'divide', 0, 0, [14, 16, 17]], [16, ['number', {'value': 1}], 0, 0, [15]], [17, ['number', {'value': 4}], 0, 0, [15]], [18, 'vspace', 0, 0, [14, 19]], [19, 'pitch', 0, 0, [18, 20, 21, null]], [20, ['solfege', {'value': 'sol'}], 0, 0, [19]], [21, ['number', {'value': 5}], 0, 0, [19]], [22, 'hidden', 0, 0, [14, null]]];
    const KICKOBJ = [[0, 'playdrum', x, y, [null, 1, null]], [1, ['drumname', {'value': 'kick drum'}], 0, 0, [0]]];
    const LRHELP = [[0, ['start', {'collapsed': false}], 0, 0, [null, 3, null]], [1, ['forever', {}], 0, 0, [3, 5, null]], [2, 'if', 0, 0, [5, 7, 8, null]], [3, 'setheading', 0, 0, [0, 4, 1]], [4, ['number', {'value': 90}], 0, 0, [3]], [5, 'forward', 0, 0, [1, 6, 2]], [6, ['number', {'value': 10}], 0, 0, [5]], [7, 'greater', 0, 0, [2, 12, 14]], [8, 'penup', 0, 0, [2, 10]], [9, 'pendown', 0, 0, [10, null]], [10, 'setxy', 0, 0, [8, 13, 11, 9]], [11, 'y', 0, 0, [10]], [12, 'x', 0, 0, [7]], [13, 'leftpos', 0, 0, [10]], [14, 'rightpos', 0, 0, [7]]];
    const MAJOR2OBJ = [[0, 'semitoneinterval', x, y, [null, 1, 6, 7]], [1, 'plus', 0, 0, [0, 2, 3]], [2, ['intervalname', {'value': 'major 2'}], 0, 0, [1]], [3, 'multiply', 0, 0, [1, 4, 5]], [4, ['number', {'value': 0}], 0, 0, [3]], [5, ['number', {'value': 12}], 0, 0, [3]], [6, 'vspace', 0, 0, [0, null]], [7, 'hidden', 0, 0, [0, null]]];
    const MAJOR3OBJ = [[0, 'semitoneinterval', x, y, [null, 1, 6, 7]], [1, 'plus', 0, 0, [0, 2, 3]], [2, ['intervalname', {'value': 'major 3'}], 0, 0, [1]], [3, 'multiply', 0, 0, [1, 4, 5]], [4, ['number', {'value': 0}], 0, 0, [3]], [5, ['number', {'value': 12}], 0, 0, [3]], [6, 'vspace', 0, 0, [0, null]], [7, 'hidden', 0, 0, [0, null]]];
    const MAJOR6OBJ = [[0, 'semitoneinterval', x, y, [null, 1, 6, 7]], [1, 'plus', 0, 0, [0, 2, 3]], [2, ['intervalname', {'value': 'major 6'}], 0, 0, [1]], [3, 'multiply', 0, 0, [1, 4, 5]], [4, ['number', {'value': 0}], 0, 0, [3]], [5, ['number', {'value': 12}], 0, 0, [3]], [6, 'vspace', 0, 0, [0, null]], [7, 'hidden', 0, 0, [0, null]]];
    const MAJOR7OBJ = [[0, 'semitoneinterval', x, y, [null, 1, 6, 7]], [1, 'plus', 0, 0, [0, 2, 3]], [2, ['intervalname', {'value': 'major 7'}], 0, 0, [1]], [3, 'multiply', 0, 0, [1, 4, 5]], [4, ['number', {'value': 0}], 0, 0, [3]], [5, ['number', {'value': 12}], 0, 0, [3]], [6, 'vspace', 0, 0, [0, null]], [7, 'hidden', 0, 0, [0, null]]];
    const MATRIXOBJ = [[0, 'matrix', x, y, [null, 1, 33]], [1, 'pitch', 0, 0, [0, 2, 3, 4]], [2, ['solfege', {'value': 'ti'}], 0, 0, [1]], [3, ['number', {'value': 4}], 0, 0, [1]], [4, 'pitch', 0, 0, [1, 5, 6, 7]], [5, ['solfege', {'value': 'la'}], 0, 0, [4]], [6, ['number', {'value': 4}], 0, 0, [4]], [7, 'pitch', 0, 0, [4, 8, 9, 10]], [8, ['solfege', {'value': 'sol'}], 0, 0, [7]], [9, ['number', {'value': 4}], 0, 0, [7]], [10, 'pitch', 0, 0, [7, 11, 12, 13]], [11, ['solfege', {'value': 'mi'}], 0, 0, [10]], [12, ['number', {'value': 4}], 0, 0, [10]], [13, 'pitch', 0, 0, [10, 14, 15, 16]], [14, ['solfege', {'value': 're'}], 0, 0, [13]], [15, ['number', {'value': 4}], 0, 0, [13]], [16, 'playdrum', 0, 0, [13, 17, 18]], [17, ['drumname', {'value': 'snare drum'}], 0, 0, [16]], [18, 'forward', 0, 0, [16, 19, 20]], [19, ['number', {'value': 100}], 0, 0, [18]], [20, 'right', 0, 0, [18, 21, 22]], [21, ['number', {'value': 90}], 0, 0, [20]], [22, 'rhythm2', 0, 0, [20, 23, 24, 27]], [23, ['number', {'value': 6}], 0, 0, [22]], [24, 'divide', 0, 0, [22, 25, 26]], [25, ['number', {'value': 1}], 0, 0, [24]], [26, ['number', {'value': 4}], 0, 0, [24]], [27, 'vspace', 0, 0, [22, 28]], [28, 'rhythm2', 0, 0, [27, 29, 30 , null]], [29, ['number', {'value': 1}], 0, 0, [28]], [30, 'divide', 0, 0, [28, 31, 32]], [31, ['number', {'value': 1}], 0, 0, [30]], [32, ['number', {'value': 2}], 0, 0, [30]], [33, 'hiddennoflow', 0, 0, [0, null]]];
    const MATRIXCMAJOBJ = [[0, ['matrix', {'collapsed': false}], x, y, [null, 5, 21]], [1, ['solfege', {'value': 'do'}], 0, 0, [10]], [2, ['number', {'value': 5}], 0, 0, [10]], [3, 'steppitch', 0, 0, [8, 4, null]], [4, ['number', {'value': -1}], 0, 0, [3]], [5, 'setkey2', 0, 0, [0, 6, 7, 10]], [6, ['notename', {'value': 'C'}], 0, 0, [5]], [7, ['modename', {'value': 'major'}], 0, 0, [5]], [8, 'repeat', 0, 0, [10, 9, 3, 11]], [9, 'modelength', 0, 0, [8]], [10, 'pitch', 0, 0, [5, 1, 2, 8]], [11, 'rhythm2', 0, 0, [8, 12, 14, 22]], [12, ['number', {'value': 6}], 0, 0, [11]], [13, ['number', {'value': 1}], 0, 0, [14]], [14, 'divide', 0, 0, [11, 13, 15]], [15, ['number', {'value': 4}], 0, 0, [14]], [16, 'rhythm2', 0, 0, [22, 17, 19, null]], [17, ['number', {'value': 1}], 0, 0, [16]], [18, ['number', {'value': 1}], 0, 0, [19]], [19, 'divide', 0, 0, [16, 18, 20]], [20, ['number', {'value': 2}], 0, 0.5, [19]], [21, 'hiddennoflow', 0, 0, [0, null]], [22, 'vspace', 0, 0, [11, 16]]];
    const MATRIXGMAJOBJ = [[0, ['matrix', {'collapsed': false}], x, y, [null, 5, 21]], [1, ['solfege', {'value': 'sol'}], 0, 0, [10]], [2, ['number', {'value': 5}], 0, 0, [10]], [3, 'steppitch', 0, 0, [8, 4, null]], [4, ['number', {'value': -1}], 0, 0, [3]], [5, 'setkey2', 0, 0, [0, 6, 7, 10]], [6, ['notename', {'value': 'G'}], 0, 0, [5]], [7, ['modename', {'value': 'major'}], 0, 0, [5]], [8, 'repeat', 0, 0, [10, 9, 3, 11]], [9, 'modelength', 0, 0, [8]], [10, 'pitch', 0, 0, [5, 1, 2, 8]], [11, 'rhythm2', 0, 0, [8, 12, 14, 22]], [12, ['number', {'value': 6}], 0, 0, [11]], [13, ['number', {'value': 1}], 0, 0, [14]], [14, 'divide', 0, 0, [11, 13, 15]], [15, ['number', {'value': 4}], 0, 0, [14]], [16, 'rhythm2', 0, 0, [22, 17, 19, null]], [17, ['number', {'value': 1}], 0, 0, [16]], [18, ['number', {'value': 1}], 0, 0, [19]], [19, 'divide', 0, 0, [16, 18, 20]], [20, ['number', {'value': 2}], 0, 0.5, [19]], [21, 'hiddennoflow', 0, 0, [0, null]], [22, 'vspace', 0, 0, [11, 16]]];
    const METEROBJ = [[0, 'meter', x, y, [null, 1, 2, 5]], [1, ['number', {'value': 4}], 0, 0, [0]], [2, 'divide', 0, 0, [0, 3, 4]], [3, ['number', {'value': 1}], 0, 0, [2]], [4, ['number', {'value': 4}], 0, 0, [2]], [5, 'vspace', 0, 0, [0, null]]];
    const METERWIDGETOBJ = [[0, ['meterwidget', {'collapsed': false}], x, y, [null, 1, 7]], [1, 'meter', 0, 0, [0, 2, 3, 6]], [2, ['number', {'value': 4}], 0, 0, [1]], [3, ['divide', {}], 0, 0, [1, 4, 5]], [4, ['number', {'value': 1}], 0, 0, [3]], [5, ['number', {'value': 4}], 0, 0, [3]], [6, 'vspace', 0, 0, [1, null]], [7, 'hidden', 0, 0, [0, null]]];
    const MIDIOBJ = [[0, 'setpitchnumberoffset', x, y, [null, 1, 2, null]], [1, ['notename', {'value': 'C'}], 0, 0, [0]], [2, ['number', {'value': -1}], 0, 0, [0]]];
    const MINOR2OBJ = [[0, 'semitoneinterval', x, y, [null, 1, 6, 7]], [1, 'plus', 0, 0, [0, 2, 3]], [2, ['intervalname', {'value': 'minor 2'}], 0, 0, [1]], [3, 'multiply', 0, 0, [1, 4, 5]], [4, ['number', {'value': 0}], 0, 0, [3]], [5, ['number', {'value': 12}], 0, 0, [3]], [6, 'vspace', 0, 0, [0, null]], [7, 'hidden', 0, 0, [0, null]]];
    const MINOR3OBJ = [[0, 'semitoneinterval', x, y, [null, 1, 6, 7]], [1, 'plus', 0, 0, [0, 2, 3]], [2, ['intervalname', {'value': 'minor 3'}], 0, 0, [1]], [3, 'multiply', 0, 0, [1, 4, 5]], [4, ['number', {'value': 0}], 0, 0, [3]], [5, ['number', {'value': 12}], 0, 0, [3]], [6, 'vspace', 0, 0, [0, null]], [7, 'hidden', 0, 0, [0, null]]];
    const MINOR6OBJ = [[0, 'semitoneinterval', x, y, [null, 1, 6, 7]], [1, 'plus', 0, 0, [0, 2, 3]], [2, ['intervalname', {'value': 'minor 6'}], 0, 0, [1]], [3, 'multiply', 0, 0, [1, 4, 5]], [4, ['number', {'value': 0}], 0, 0, [3]], [5, ['number', {'value': 12}], 0, 0, [3]], [6, 'vspace', 0, 0, [0, null]], [7, 'hidden', 0, 0, [0, null]]];
    const MINOR7OBJ = [[0, 'semitoneinterval', x, y, [null, 1, 6, 7]], [1, 'plus', 0, 0, [0, 2, 3]], [2, ['intervalname', {'value': 'minor 7'}], 0, 0, [1]], [3, 'multiply', 0, 0, [1, 4, 5]], [4, ['number', {'value': 0}], 0, 0, [3]], [5, ['number', {'value': 12}], 0, 0, [3]], [6, 'vspace', 0, 0, [0, null]], [7, 'hidden', 0, 0, [0, null]]];
    const MODEWIDGETOBJ = [[0, 'modewidget', x, y, [null, 1, 4]], [1, 'setkey2', 0, 0, [0, 2, 3, null]], [2, ['notename', {'value': 'C'}], 0, 0, [1]], [3, ['modename', {'value': DEFAULTMODE}], 0, 0, [1]], [4, 'hiddennoflow', 0, 0, [0, null]]];
    const MOUSEBUTTONHELP = [[0, ['start', {'collapsed': false}], x, y, [null, 1, null]], [1, 'forever', 0, 0, [0, 2, null]], [2, 'ifthenelse', 0, 0, [1, 8, 7, 6, 3]], [3, 'setxy', 0, 0, [2, 4, 5, null]], [4, 'mousex', 0, 0, [3]], [5, 'mousey', 0, 0, [3]], [6, 'penup', 0, 0, [2, null]], [7, 'pendown', 0, 0, [2, null]], [8, 'mousebutton', 0, 0, [2]]];
    const MOVABLEOBJ = [[0, 'movable', x, y, [null, 1, null]], [1, ['boolean', {'value':  true}], 0, 0, [0]]];
    const MOVABLEHELP = [[0, ['start', {'collapsed': false}], x, y, [null, 1, null]], [1, 'setkey2', 0, 0, [0, 2, 3, 4]], [2, ['notename', {'value': 'B'}], 0, 0, [1]], [3, ['modename', {'value': 'aeolian'}], 0, 0, [1]], [4, 'movable', 0, 0, [1, 5, 7]], [5, ['boolean', {'value': true}], 0, 0, [4]], [6, 'repeat', 0, 0, [15, 16, 17, null]], [7, ['newnote', {'collapsed': false}], 0, 0, [4, 8, 11, 15]], [8, 'divide', 0, 0, [7, 9, 10]], [9, ['number', {'value': 1}], 0, 0, [8]], [10, ['number', {'value': 4}], 0, 0, [8]], [11, 'vspace', 0, 0, [7, 12]], [12, 'pitch', 0, 0, [11, 13, 14, null]], [13, ['solfege', {'value': 'do'}], 0, 0, [12]], [14, ['number', {'value': 4}], 0, 0, [12]], [15, 'hidden', 0, 0, [7, 6]], [16, 'modelength', 0, 0, [6]], [17, ['newnote', {'collapsed': false}], 0, 0, [6, 18, 21, 24]], [18, 'divide', 0, 0, [17, 19, 20]], [19, ['number', {'value': 1}], 0, 0, [18]], [20, ['number', {'value': 4}], 0, 0, [18]], [21, 'vspace', 0, 0, [17, 22]], [22, 'steppitch', 0, 0, [21, 23, null]], [23, ['number', {'value': 1}], 0, 0, [22]], [24, 'hidden', 0, 0, [17, null]]];
    const MULTBEATOBJ = [[0, 'multiplybeatfactor', x, y, [null, 1, 4, 5]], [1, 'divide', 0, 0, [0, 2, 3]], [2, ['number', {'value': 1}], 0, 0, [1]], [3, ['number', {'value': 2}], 0, 0, [1]], [4, 'vspace', 0, 0, [0, null]], [5, 'hidden', 0, 0, [0, null]]];
    const MULTBEATHELP = [[0, 'multiplybeatfactor', 0, 0, [null, 1, 4, 5]], [1, 'divide', 0, 0, [0, 2, 3]], [2, ['number', {'value': 1}], 0, 0, [1]], [3, ['number', {'value': 2}], 0, 0, [1]], [4, 'vspace', 0, 0, [0, 12]], [5, 'hidden', 0, 0, [0, 21]], [6, 'multiplybeatfactor', 0, 0, [29, 7, 10, 11]], [7, 'divide', 0, 0, [6, 9, 8]], [8, ['number', {'value': 1}], 0, 0, [7]], [9, ['number', {'value': 2}], 0, 0, [7]], [10, 'vspace', 0, 0, [6, 30]], [11, 'hidden', 0, 0, [6, 39]], [12, ['newnote', {'collapsed': false}], 0, 0, [4, 13, 16, 20]], [13, 'divide', 0, 0, [12, 14, 15]], [14, ['number', {'value': 1}], 0, 0, [13]], [15, ['number', {'value': 4}], 0, 0, [13]], [16, 'vspace', 0, 0, [12, 17]], [17, 'pitch', 0, 0, [16, 18, 19, null]], [18, ['solfege', {'value': 'sol'}], 0, 0, [17]], [19, ['number', {'value': 4}], 0, 0, [17]], [20, 'hidden', 0, 0, [12, null]], [21, ['newnote', {'collapsed': false}], 0, 0, [5, 22, 25, 29]], [22, 'divide', 0, 0, [21, 23, 24]], [23, ['number', {'value': 1}], 0, 0, [22]], [24, ['number', {'value': 8}], 0, 0, [22]], [25, 'vspace', 0, 0, [21, 26]], [26, 'pitch', 0, 0, [25, 27, 28, null]], [27, ['solfege', {'value': 'sol'}], 0, 0, [26]], [28, ['number', {'value': 4}], 0, 0, [26]], [29, 'hidden', 0, 0, [21, 6]], [30, ['newnote', {'collapsed': false}], 0, 0, [10, 31, 34, 38]], [31, 'divide', 0, 0, [30, 32, 33]], [32, ['number', {'value': 1}], 0, 0, [31]], [33, ['number', {'value': 4}], 0, 0, [31]], [34, 'vspace', 0, 0, [30, 35]], [35, 'pitch', 0, 0, [34, 36, 37, null]], [36, ['solfege', {'value': 'sol'}], 0, 0, [35]], [37, ['number', {'value': 4}], 0, 0, [35]], [38, 'hidden', 0, 0, [30, null]], [39, ['newnote', {'collapsed': false}], 0, 0, [11, 40, 43, 47]], [40, 'divide', 0, 0, [39, 41, 42]], [41, ['number', {'value': 1}], 0, 0, [40]], [42, ['number', {'value': 2}], 0, 0, [40]], [43, 'vspace', 0, 0, [39, 44]], [44, 'pitch', 0, 0, [43, 45, 46, null]], [45, ['solfege', {'value': 'sol'}], 0, 0, [44]], [46, ['number', {'value': 4}], 0, 0, [44]], [47, 'hidden', 0, 0, [39, null]]];
    const MUSICKEYBOARDOBJ = [[0, 'musickeyboard', x, y, [null, 1, 16]], [1, 'pitch', 0, 0, [0, 2, 3, 4]], [2, ['solfege', {'value': 'sol'}], 0, 0, [1]], [3, ['number', {'value': 4}], 0, 0, [1]], [4, 'pitch', 0, 0, [1, 5, 6, 7]], [5, ['solfege', {'value': 'fa'}], 0, 0, [4]], [6, ['number', {'value': 4}], 0, 0, [4]], [7, 'pitch', 0, 0, [4, 8, 9, 10]], [8, ['solfege', {'value': 'mi'}], 0, 0, [7]], [9, ['number', {'value': 4}], 0, 0, [7]], [10, 'pitch', 0, 0, [7, 11, 12, 13]], [11, ['solfege', {'value': 're'}], 0, 0, [10]], [12, ['number', {'value': 4}], 0, 0, [10]], [13, 'pitch', 0, 0, [10, 14, 15, null]], [14, ['solfege', {'value': 'do'}], 0, 0, [13]], [15, ['number', {'value': 4}], 0, 0, [13]], [16, 'hiddennoflow', 0, 0, [0, null]]];
    const MUSICKEYBOARDJAOBJ = [[0, 'musickeyboard', x, y, [null, 1, 16]], [1, 'pitch', 0, 0, [0, 2, 3, 4]], [2, ['solfege', {'value': 'la'}], 0, 0, [1]], [3, ['number', {'value': 4}], 0, 0, [1]], [4, 'pitch', 0, 0, [1, 5, 6, 7]], [5, ['solfege', {'value': 'sol'}], 0, 0, [4]], [6, ['number', {'value': 4}], 0, 0, [4]], [7, 'pitch', 0, 0, [4, 8, 9, 10]], [8, ['solfege', {'value': 'mi'}], 0, 0, [7]], [9, ['number', {'value': 4}], 0, 0, [7]], [10, 'pitch', 0, 0, [7, 11, 12, 13]], [11, ['solfege', {'value': 're'}], 0, 0, [10]], [12, ['number', {'value': 4}], 0, 0, [10]], [13, 'pitch', 0, 0, [10, 14, 15, null]], [14, ['solfege', {'value': 'do'}], 0, 0, [13]], [15, ['number', {'value': 4}], 0, 0, [13]], [16, 'hiddennoflow', 0, 0, [0, null]]];
    const NEIGHBOROBJ = [[0, 'neighbor', x, y, [null, 1, 3, 2, 6]], [1, ['number', {'value': 1}], 0, 0, [0]], [2, 'vspace', 0, 0, [0, null]], [3, 'divide', 0, 0, [0, 4, 5]], [4, ['number', {'value': 1}], 0, 0, [3]], [5, ['number', {'value': 16}], 0, 0, [3]], [6, 'hidden', 0, 0, [0, null]]];
    const NEIGHBOR2OBJ = [[0, 'neighbor2', x, y, [null, 1, 3, 2, 6]], [1, ['number', {'value': 1}], 0, 0, [0]], [2, 'vspace', 0, 0, [0, null]], [3, 'divide', 0, 0, [0, 4, 5]], [4, ['number', {'value': 1}], 0, 0, [3]], [5, ['number', {'value': 16}], 0, 0, [3]], [6, 'hidden', 0, 0, [0, null]]];
    const NEIGHBORHELP = [[0, 'neighbor', x, y, [null, 1, 3, 2, 6]], [1, ['number', {'value': 1}], 0, 0, [0]], [2, 'vspace', 0, 0, [0, 7]], [3, 'divide', 0, 0, [0, 4, 5]], [4, ['number', {'value': 1}], 0, 0, [3]], [5, ['number', {'value': 16}], 0, 0, [3]], [6, 'hidden', 0, 0, [0, null]], [7, ['newnote', {'collapsed': false}], 0, 0, [2, 8, 11, 15]], [8, 'divide', 0, 0, [7, 9, 10]], [9, ['number', {'value': 1}], 0, 0, [8]], [10, ['number', {'value': 4}], 0, 0, [8]], [11, 'vspace', 0, 0, [7, 12]], [12, 'pitch', 0, 0, [11, 13, 14, null]], [13, ['solfege', {'value': 'sol'}], 0, 0, [12]], [14, ['number', {'value': 4}], 0, 0, [12]], [15, 'hidden', 0, 0, [7, null]]];
    const NEIGHBOR2HELP = [[0, 'neighbor2', x, y, [null, 1, 3, 2, 6]], [1, ['number', {'value': 1}], 0, 0, [0]], [2, 'vspace', 0, 0, [0, 7]], [3, 'divide', 0, 0, [0, 4, 5]], [4, ['number', {'value': 1}], 0, 0, [3]], [5, ['number', {'value': 16}], 0, 0, [3]], [6, 'hidden', 0, 0, [0, null]], [7, ['newnote', {'collapsed': false}], 0, 0, [2, 8, 11, 15]], [8, 'divide', 0, 0, [7, 9, 10]], [9, ['number', {'value': 1}], 0, 0, [8]], [10, ['number', {'value': 4}], 0, 0, [8]], [11, 'vspace', 0, 0, [7, 12]], [12, 'pitch', 0, 0, [11, 13, 14, null]], [13, ['solfege', {'value': 'sol'}], 0, 0, [12]], [14, ['number', {'value': 4}], 0, 0, [12]], [15, 'hidden', 0, 0, [7, null]]];
    const NEWNOTEOBJ = [[0, 'newnote', x, y, [null, 1, 4, 8]], [1, 'divide', 0, 0, [0, 2, 3]], [2, ['number', {'value': 1}], 0, 0, [1]], [3, ['number', {'value': 4}], 0, 0, [1]], [4, 'vspace', 0, 0, [0, 5]], [5, 'pitch', 0, 0, [4, 6, 7, null]], [6, ['solfege', {'value': 'sol'}], 0, 0, [5]], [7, ['number', {'value': 4}], 0, 0, [5]], [8, 'hidden', 0, 0, [0, null]]];
    const NEWSLUROBJ = [[0, 'newslur', x, y, [null, 1, 4, 5]], [1, 'divide', 0, 0, [0, 2, 3]], [2, ['number', {'value': 1}], 0, 0, [1]], [3, ['number', {'value': 16}], 0, 0, [1]], [4, 'vspace', 0, 0, [0, null]], [5, 'hidden', 0, 0, [0, null]]];
    const NEWSTACCATOOBJ = [[0, 'newstaccato', x, y, [null, 1, 4, 5]], [1, 'divide', 0, 0, [0, 2, 3]], [2, ['number', {'value': 1}], 0, 0, [1]], [3, ['number', {'value': 32}], 0, 0, [1]], [4, 'vspace', 0, 0, [0, null]], [5, 'hidden', 0, 0, [0, null]]];
    const NEWSWING2OBJ = [[0, 'newswing2', x, y, [null, 1, 6, 9, 10]], [1, 'hspace', 0, 0, [0, 2]], [2, 'hspace', 0, 0, [1, 3]], [3, 'divide', 0, 0, [2, 4, 5]], [4, ['number', {'value': 1}], 0, 0, [3]], [5, ['number', {'value': 24}], 0, 0, [3]], [6, 'divide', 0, 0, [0, 7, 8]], [7, ['number', {'value': 1}], 0, 0, [6]], [8, ['number', {'value': 8}], 0, 0, [6]], [9, 'vspace', 0, 0, [0, null]], [10, 'hidden', 0, 0, [0, null]]];
    const NEWSWINGOBJ = [[0, 'newswing', x, y, [null, 1, 4, 5]], [1, 'divide', 0, 0, [0, 2, 3]], [2, ['number', {'value': 1}], 0, 0, [1]], [3, ['number', {'value': 16}], 0, 0, [1]], [4, 'vspace', 0, 0, [0, null]], [5, 'hidden', 0, 0, [0, null]]];
    const SWINGHELP = [[0, 'newswing2', x, y, [null, 1, 6, 9, 10]], [1, 'hspace', 0, 0, [0, 2]], [2, 'hspace', 0, 0, [1, 3]], [3, 'divide', 0, 0, [2, 4, 5]], [4, ['number', {'value': 1}], 0, 0, [3]], [5, ['number', {'value': 24}], 0, 0, [3]], [6, 'divide', 0, 0, [0, 7, 8]], [7, ['number', {'value': 1}], 0, 0, [6]], [8, ['number', {'value': 8}], 0, 0, [6]], [9, 'vspace', 0, 0, [0, 11]], [10, 'hidden', 0, 0, [0, 29]], [11, ['newnote', {'collapsed': false}], 0, 0, [9, 12, 15, 19]], [12, 'divide', 0, 0, [11, 13, 14]], [13, ['number', {'value': 1}], 0, 0, [12]], [14, ['number', {'value': 8}], 0, 0, [12]], [15, 'vspace', 0, 0, [11, 16]], [16, 'pitch', 0, 0, [15, 17, 18, null]], [17, ['solfege', {'value': 'sol'}], 0, 0, [16]], [18, ['number', {'value': 4}], 0, 0, [16]], [19, 'hidden', 0, 0, [11, 20]], [20, ['newnote', {'collapsed': false}], 0, 0, [19, 21, 24, 28]], [21, 'divide', 0, 0, [20, 22, 23]], [22, ['number', {'value': 1}], 0, 0, [21]], [23, ['number', {'value': 8}], 0, 0, [21]], [24, 'vspace', 0, 0, [20, 25]], [25, 'pitch', 0, 0, [24, 26, 27, null]], [26, ['solfege', {'value': 'sol'}], 0, 0, [25]], [27, ['number', {'value': 4}], 0, 0, [25]], [28, 'hidden', 0, 0, [20, null]], [29, ['newnote', {'collapsed': false}], 0, 0, [10, 30, 33, 37]], [30, 'divide', 0, 0, [29, 31, 32]], [31, ['number', {'value': 1}], 0, 0, [30]], [32, ['number', {'value': 6}], 0, 0, [30]], [33, 'vspace', 0, 0, [29, 34]], [34, 'pitch', 0, 0, [33, 35, 36, null]], [35, ['solfege', {'value': 'sol'}], 0, 0, [34]], [36, ['number', {'value': 4}], 0, 0, [34]], [37, 'hidden', 0, 0, [29, 38]], [38, ['newnote', {'collapsed': false}], 0, 0, [37, 39, 42, 46]], [39, 'divide', 0, 0, [38, 40, 41]], [40, ['number', {'value': 1}], 0, 0, [39]], [41, ['number', {'value': 12}], 0, 0, [39]], [42, 'vspace', 0, 0, [38, 43]], [43, 'pitch', 0, 0, [42, 44, 45, null]], [44, ['solfege', {'value': 'sol'}], 0, 0, [43]], [45, ['number', {'value': 4}], 0, 0, [43]], [46, 'hidden', 0, 0, [38, null]]];
    const NOTE1OBJ = [[0, 'newnote', x, y, [null, 1, 4, 8]], [1, 'divide', 0, 0, [0, 2, 3]], [2, ['number', {'value': 1}], 0, 0, [1]], [3, ['number', {'value': 4}], 0, 0, [1]], [4, 'vspace', 0, 0, [0, 5]], [5, 'pitch', 0, 0, [4, 6, 7, null]], [6, ['solfege', {'value': 'sol'}], 0, 0, [5]], [7, ['number', {'value': 4}], 0, 0, [5]], [8, 'hidden', 0, 0, [0, null]]];
    const NOTE2OBJ = [[0, 'newnote', x, y, [null, 1, 4, 8]], [1, 'divide', 0, 0, [0, 2, 3]], [2, ['number', {'value': 1}], 0, 0, [1]], [3, ['number', {'value': 4}], 0, 0, [1]], [4, 'vspace', 0, 0, [0, 5]], [5, 'pitch', 0, 0, [4, 6, 7, null]], [6, ['notename', {'value': 'G'}], 0, 0, [5]], [7, ['number', {'value': 4}], 0, 0, [5]], [8, 'hidden', 0, 0, [0, null]]];
    const NOTE3OBJ = [[0, 'newnote', x, y, [null, 1, 4, 7]], [1, 'divide', 0, 0, [0, 2, 3]], [2, ['number', {'value': 1}], 0, 0, [1]], [3, ['number', {'value': 4}], 0, 0, [1]], [4, 'vspace', 0, 0, [0, 5]], [5, 'hertz', 0, 0, [4, 6, null]], [6, ['number', {'value': 392}], 0, 0, [5]], [7, 'hidden', 0, 0, [0, null]]];
    const NOTE4OBJ = [[0, 'newnote', x, y, [null, 1, 4, 7]], [1, 'divide', 0, 0, [0, 2, 3]], [2, ['number', {'value': 1}], 0, 0, [1]], [3, ['number', {'value': 4}], 0, 0, [1]], [4, 'vspace', 0, 0, [0, 5]], [5, 'playdrum', 0, 0, [4, 6, null]], [6, ['drumname', {'value': DEFAULTDRUM}], 0, 0, [5]], [7, 'hidden', 0, 0, [0, null]]];
    const NOTE5OBJ = [[0, 'newnote', x, y, [null, 1, 4, 7]], [1, 'divide', 0, 0, [0, 2, 3]], [2, ['number', {'value': 1}], 0, 0, [1]], [3, ['number', {'value': 4}], 0, 0, [1]], [4, 'vspace', 0, 0, [0, 5]], [5, 'pitchnumber', 0, 0, [4, 6, null]], [6, ['number', {'value': 7}], 0, 0, [5]], [7, 'hidden', 0, 0, [0, null]]];
    const NOTE6OBJ = [[0, 'newnote', x, y, [null, 1, 4, 7]], [1, 'divide', 0, 0, [0, 2, 3]], [2, ['number', {'value': 1}], 0, 0, [1]], [3, ['number', {'value': 4}], 0, 0, [1]], [4, 'vspace', 0, 0, [0, 5]], [5, 'steppitch', 0, 0, [4, 6, null]], [6, ['number', {'value': 1}], 0, 0, [5]], [7, 'hidden', 0, 0, [0, null]]];
    const NOTE7OBJ = [[0, 'newnote', x, y, [null, 1, 4, 8]], [1, 'divide', 0, 0, [0, 2, 3]], [2, ['number', {'value': 1}], 0, 0, [1]], [3, ['number', {'value': 4}], 0, 0, [1]], [4, 'vspace', 0, 0, [0, 5]], [5, 'scaledegree', 0, 0, [4, 6, 7, null]], [6, ['number', {'value': 5}], 0, 0, [5]], [7, ['number', {'value': 4}], 0, 0, [5]], [8, 'hidden', 0, 0, [0, null]]];
    const NOTEOBJ = [[0, 'newnote', x, y, [null, 1, 2, 5]], [1, ['number', {'value': 8}], 0, 0, [0]], [2, 'pitch', 0, 0, [0, 3, 4, null]], [3, ['solfege', {'value': 'sol'}], 0, 0, [2]], [4, ['number', {'value': 4}], 0, 0, [2]], [5, 'hidden', 0, 0, [0, null]]];
    const OCTAVEOBJ = [[0, 'settransposition', x, y, [null, 1, 4, 5]], [1, 'multiply', 0, 0, [0, 2, 3]], [2, ['number', {'value': 1}], 0, 0, [1]], [3, ['number', {'value': 12}], 0, 0, [1]], [4, 'vspace', 0, 0, [0, null]], [5, 'hidden', 0, 0, [0, null]]];
    const ONEOFOBJ = [[0, 'oneOf',  x, y, [null, 1, 2, null]], [1, ['solfege', {'value': 'do'}], 0, 0, [0]], [2, ['solfege', {'value': 're'}], 0, 0, [0]]];
    const OSCTIMEOBJ = [[0, 'osctime', x, y, [null, 2, 1, 7]], [1, 'vspace', 0, 0, [0, 5]], [2, 'divide', 0, 0, [0, 3, 4]], [3, ['number', {'value': 1000}], 0, 0, [2]], [4, 'divide', 0, 0, [2, 8, 9]], [5, 'hertz', 0, 0, [1, 6, null]], [6, ['number', {'value': 392}], 0, 0, [5]], [7, 'hidden', 0, 0, [0, null]], [8, ['number', {'value': 3}], 0, 0, [4]], [9, ['number', {'value': 2}], 0, 0, [4]]];
    const PERFECT4OBJ = [[0, 'semitoneinterval', x, y, [null, 1, 6, 7]], [1, 'plus', 0, 0, [0, 2, 3]], [2, ['intervalname', {'value': 'perfect 4'}], 0, 0, [1]], [3, 'multiply', 0, 0, [1, 4, 5]], [4, ['number', {'value': 0}], 0, 0, [3]], [5, ['number', {'value': 12}], 0, 0, [3]], [6, 'vspace', 0, 0, [0, null]], [7, 'hidden', 0, 0, [0, null]]];
    const PERFECT5OBJ = [[0, 'semitoneinterval', x, y, [null, 1, 6, 7]], [1, 'plus', 0, 0, [0, 2, 3]], [2, ['intervalname', {'value': 'perfect 5'}], 0, 0, [1]], [3, 'multiply', 0, 0, [1, 4, 5]], [4, ['number', {'value': 0}], 0, 0, [3]], [5, ['number', {'value': 12}], 0, 0, [3]], [6, 'vspace', 0, 0, [0, null]], [7, 'hidden', 0, 0, [0, null]]];
    const PERFECT8OBJ = [[0, 'semitoneinterval', x, y, [null, 1, 6, 7]], [1, 'plus', 0, 0, [0, 2, 3]], [2, ['intervalname', {'value': 'perfect 8'}], 0, 0, [1]], [3, 'multiply', 0, 0, [1, 4, 5]], [4, ['number', {'value': 0}], 0, 0, [3]], [5, ['number', {'value': 12}], 0, 0, [3]], [6, 'vspace', 0, 0, [0, null]], [7, 'hidden', 0, 0, [0, null]]];
    const PICKUPOBJ = [[0, 'pickup', x, y, [null, 1, 4]], [1, 'divide', 0, 0, [0, 2, 3]], [2, ['number', {'value': 0}], 0, 0, [1]], [3, ['number', {'value': 4}], 0, 0, [1]], [4, 'vspace', 0, 0, [0, null]]];
    const PITCH2OBJ = [[0, 'pitch', x, y, [null, 1, 2, null]], [1, ['notename', {'value': 'G'}], 0, 0, [0]], [2, ['number', {'value': 4}], 0, 0, [0]]];
    const PITCHDRUMMATRIXOBJ = [[0, 'pitchdrummatrix', x, y, [null, 1, 16]], [1, 'pitch', 0, 0, [0, 2, 3, 4]], [2, ['solfege', {'value':'sol'}], 0, 0, [1]], [3, ['number', {'value':4}], 0, 0, [1]], [4, 'pitch', 0, 0, [1, 5, 6, 7]], [5, ['solfege', {'value':'mi'}], 0, 0, [4]], [6, ['number', {'value':4}], 0, 0,[4]], [7, 'pitch', 0, 0, [4, 8, 9, 10]], [8, ['solfege', {'value':'re'}], 0, 0, [7]], [9, ['number', {'value':4}], 0, 0, [7]], [10, 'playdrum', 0, 0, [7, 11, 12]], [11, ['drumname', {'value':'kick drum'}], 0, 0, [10]], [12, 'playdrum', 0, 0, [10, 13, 14]], [13, ['drumname', {'value':'snare drum'}], 0, 0, [12]], [14, 'playdrum', 0, 0, [12, 15, null]], [15, ['drumname',{'value':'ride bell'}], 0, 0, [14]], [16, 'hiddennoflow', 0, 0, [0, null]]];
    const PITCHSLIDEROBJ = [[0, 'pitchslider', x, y, [null, 1, 3]], [1, 'hertz', 0, 0, [0, 2, null]], [2, ['number', {'value': 392}], 0, 0, [1]], [3, 'hiddennoflow', 0, 0, [0, null]]];
    const PITCHSTAIRCASEOBJ = [[0, 'pitchstaircase', x, y, [null, 1, 4]], [1, 'pitch', 0, 0, [0, 2, 3, null]], [2, ['solfege', {'value': 'sol'}], 0, 0, [1]], [3, ['number', {'value': 3}], 0, 0, [1]], [4, 'hiddennoflow', 0, 0, [0, null]]];
    const PLAYDRUMOBJ = [[0, 'playdrum', x, y, [null, 1, null]], [1, ['drumname', {'value': DEFAULTDRUM}], 0, 0, [0]]];
    const PLAYEFFECTOBJ = [[0, 'playdrum', x, y, [null, 1, null]], [1, ['effectsname', {'value': DEFAULTEFFECT}], 0, 0, [0]]];
    const PLAYNOISEOBJ = [[0, 'playnoise', x, y, [null, 1, null]], [1, ['noisename', {'value': DEFAULTNOISE}], 0, 0, [0]]];
    const QUARTEROBJ = [[0, 'rhythm2', x, y, [null, 1, 2, 5]], [1, ['number', {'value': 1}], 0, 0, [0]], [2, 'divide', 0, 0, [0, 3, 4]], [3, ['number', {'value': 1}], 0, 0, [2]], [4, ['number', {'value': 4}], 0, 0, [2]], [5, 'vspace', 0, 0, [0, null]]];
    const RESTOBJ = [[0, 'newnote', x, y, [null, 1, 4, 6]], [1, 'divide', 0, 0, [0, 2, 3]], [2, ['number', {'value': 1}], 0, 0, [1]], [3, ['number', {'value': 4}], 0, 0, [1]], [4, 'vspace', 0, 0, [0, 5]], [5, 'rest2', 0, 0, [4, null]], [6, 'hidden', 0, 0, [0, null]]];
    const RHYTHMOBJ = [[0, 'rhythm2', x, y, [null, 1, 2, 5]], [1, ['number', {'value': 3}], 0, 0, [0]], [2, 'divide', 0, 0, [0, 3, 4]], [3, ['number', {'value': 1}], 0, 0, [2]], [4, ['number', {'value': 4}], 0, 0, [2]], [5, 'vspace', 0, 0, [0, null]]];
    const RHYTHMRULER2OBJ = [[0, 'rhythmruler2', x, y, [null, 1, 17]], [1, 'setdrum', 0, 0, [0, 2, 3, 8]], [2, ['drumname', {'value': 'snare drum'}], 0, 0, [1]], [3, 'rhythm2', 0, 0, [1, 4, 5, null]], [4, ['number', {'value': 1}], 0, 0, [3]], [5, 'divide', 0, 0, [3, 6, 7]], [6, ['number', {'value': 1}], 0, 0, [5]], [7, ['number', {'value': 1}], 0, 0, [5]], [8, 'hidden', 0, 0, [1, 9]], [9, 'setdrum', 0, 0, [8, 10, 11, 16]], [10, ['drumname', {'value': 'kick drum'}], 0, 0, [9]], [11, 'rhythm2', 0, 0, [9, 12, 13, null]], [12, ['number', {'value': 1}], 0, 0, [11]], [13, 'divide', 0, 0, [11, 14, 15]], [14, ['number', {'value': 1}], 0, 0, [13]], [15, ['number', {'value': 1}], 0, 0, [13]], [16, 'hidden', 0, 0, [9, null]], [17, 'hiddennoflow', 0, 0, [0, null]]];
    const RHYTHMRULER3OBJ = [[0, 'rhythmruler2', x, y, [null, 1, 9]], [1, 'setdrum', 0, 0, [0, 2, 3, 8]], [2, ['drumname', {'value': 'snare drum'}], 0, 0, [1]], [3, 'rhythm2', 0, 0, [1, 4, 5, null]], [4, ['number', {'value': 1}], 0, 0, [3]], [5, 'divide', 0, 0, [3, 6, 7]], [6, ['number', {'value': 1}], 0, 0, [5]], [7, ['number', {'value': 1}], 0, 0, [5]], [8, 'hidden', 0, 0, [1, null]], [9, 'hiddennoflow', 0, 0, [0, null]]];
    const RIDEBELLOBJ = [[0, 'playdrum', x, y, [null, 1, null]], [1, ['drumname', {'value': 'ride bell'}], 0, 0, [0]]];
    const SAWTOOTHOBJ = [[0, 'newnote', x, y, [null, 1, 4, 7]], [1, 'divide', 0, 0, [0, 2, 3]], [2, ['number', {'value': 1}], 0, 0, [1]], [3, ['number', {'value': 4}], 0, 0, [1]], [4, 'vspace', 0, 0, [0, 5]], [5, 'sawtooth', 0, 0, [4, 6, null]], [6, ['number', {'value': 392}], 0, 0, [5]], [7, 'hidden', 0, 0, [0, null]]];
    const SECONDOBJ = [[0, 'setscalartransposition', x, y, [null, 1, 6, 8]], [1, 'plus', 0, 0, [0, 2, 3]], [2, ['number', {'value': 1}], 0, 0, [1]], [3, 'multiply', 0, 0, [1, 4, 5]], [4, ['number', {'value': 0}], 0, 0, [3]], [5, 'modelength', 0, 0, [3]], [6, 'vspace', 0, 0, [0, 7]], [7, 'vspace', 0, 0, [6, null]], [8, 'hidden', 0, 0, [0, null]]];
    const SECONDINTERVALOBJ = [[0, 'interval', x, y, [null, 1, 6, 8]], [1, 'plus', 0, 0, [0, 2, 3]], [2, ['number', {'value': 1}], 0, 0, [1]], [3, 'multiply', 0, 0, [1, 4, 5]], [4, ['number', {'value': 0}], 0, 0, [3]], [5, 'modelength', 0, 0, [3]], [6, 'vspace', 0, 0, [0, 7]], [7, 'vspace', 0, 0, [6, null]], [8, 'hidden', 0, 0, [0, null]]];
    const SEMITONEINTERVALOBJ = [[0, 'semitoneinterval', x, y, [null, 1, 6, 7]], [1, 'plus', 0, 0, [0, 2, 3]], [2, ['number', {'value': 5}], 0, 0, [1]], [3, 'multiply', 0, 0, [1, 4, 5]], [4, ['number', {'value': 0}], 0, 0, [3]], [5, ['number', {'value': 12}], 0, 0, [3]], [6, 'vspace', 0, 0, [0, null]], [7, 'hidden', 0, 0, [0, null]]];
    const SETDRUMOBJ = [[0, 'setdrum', x, y, [null, 1, 2, 7]], [1, ['drumname', {'value': DEFAULTDRUM}], 0, 0, [0]], [2, 'rhythm2', 0, 0, [0, 3, 4, null]], [3, ['number', {'value': 1}], 0, 0, [2]], [4, 'divide', 0, 0, [2, 5, 6]], [5, ['number', {'value': 1}], 0, 0, [4]], [6, ['number', {'value': 1}], 0, 0, [4]], [7, 'hidden', 0, 0, [0, null]]];
    const SETDRUMVOLUMEOBJ = [[0, 'setsynthvolume', x, y, [null, 1, 2, null]], [1, ['drumname', {'value': DEFAULTDRUM}], 0, 0, [0]], [2, ['number', {'value': 50}], 0, 0, [0, null]]];
    const SETKEYOBJ = [[0, 'setkey2', x, y, [null, 1, 2, null]],  [1, ['notename', {'value': 'C'}], 0, 0, [0]], [2, ['modename', {'value': 'major'}], 0, 0, [0]]];
    const SETSCALARTRANSPOBJ = [[0, 'setscalartransposition', x, y, [null, 1, null, 2]], [1, ['number', {'value': 1}], 0, 0, [0]], [2, 'hidden', 0, 0, [0, null]]];
    const SETSYNTHVOLUMEOBJ = [[0, 'setsynthvolume', x, y, [null, 1, 2, null]], [1, ['voicename', {'value': DEFAULTVOICE}], 0, 0, [0]], [2, ['number', {'value': 50}], 0, 0, [0, null]]];
    const SETTIMBREOBJ = [[0, 'settimbre', x, y, [null, 1, null, 2]], [1, ['voicename', {'value': DEFAULTVOICE}], 0, 0, [0]], [2, 'hidden', 0, 0, [0, null]]];
    const SETTEMPERAMENTOBJ = [[0,'settemperament',x,y,[null,1,2,3,null]],[1,['temperamentname',{'value':'equal'}],0,0,[0]],[2,['notename',{'value':'C'}],0,0,[0]],[3,['number',{'value':4}],0,0,[0]]];
    const SETTRANSPOSITIONOBJ = [[0, 'settransposition', x, y, [null, 1, 6, 7]], [1, 'plus', 0, 0, [0, 2, 3]], [2, ['number', {'value': 1}], 0, 0, [1]], [3, 'multiply', 0, 0, [1, 4, 5]], [4, ['number', {'value': 0}], 0, 0, [3]], [5, ['number', {'value': 12}], 0, 0, [3]], [6, 'vspace', 0, 0, [0, null]], [7, 'hidden', 0, 0, [0, null]]];
    const SETVOICEOBJ = [[0, 'setvoice', x, y, [null, 1, null, 2]], [1, ['voicename', {'value': 'violin'}], 0, 0, [0]], [2, 'hidden', 0, 0, [0, null]]];
    const SEVENTHOBJ = [[0, 'setscalartransposition', x, y, [null, 1, 6, 8]], [1, 'plus', 0, 0, [0, 2, 3]], [2, ['number', {'value': 6}], 0, 0, [1]], [3, 'multiply', 0, 0, [1, 4, 5]], [4, ['number', {'value': 0}], 0, 0, [3]], [5, 'modelength', 0, 0, [3]], [6, 'vspace', 0, 0, [0, 7]], [7, 'vspace', 0, 0, [6, null]], [8, 'hidden', 0, 0, [0, null]]];
    const SEVENTHINTERVALOBJ = [[0, 'interval', x, y, [null, 1, 6, 8]], [1, 'plus', 0, 0, [0, 2, 3]], [2, ['number', {'value': 6}], 0, 0, [1]], [3, 'multiply', 0, 0, [1, 4, 5]], [4, ['number', {'value': 0}], 0, 0, [3]], [5, 'modelength', 0, 0, [3]], [6, 'vspace', 0, 0, [0, 7]], [7, 'vspace', 0, 0, [6, null]], [8, 'hidden', 0, 0, [0, null]]];
    const SHARPOBJ = [[0, 'accidental', x, y, [null, 11, 1, 10]], [1, 'newnote', x, y, [0, 2, 5, 9]], [2, 'divide', 0, 0, [1, 3, 4]], [3, ['number', {'value': 1}], 0, 0, [2]], [4, ['number', {'value': 4}], 0, 0, [2]], [5, 'vspace', 0, 0, [1, 6]], [6, 'pitch', 0, 0, [5, 7, 8, null]], [7, ['solfege', {'value': 'sol'}], 0, 0, [6]], [8, ['number', {'value': 4}], 0, 0, [6]], [9, 'hidden', 0, 0, [1, null]], [10, 'hidden', 0, 0, [0, null]], [11, ['accidentalname', {value: 'sharp' + ' ♯'}], 0, 0, [0]]];
    const SINEOBJ = [[0, 'newnote', x, y, [null, 1, 4, 7]], [1, 'divide', 0, 0, [0, 2, 3]], [2, ['number', {'value': 1}], 0, 0, [1]], [3, ['number', {'value': 4}], 0, 0, [1]], [4, 'vspace', 0, 0, [0, 5]], [5, 'sine', 0, 0, [4, 6, null]], [6, ['number', {'value': 392}], 0, 0, [5]], [7, 'hidden', 0, 0, [0, null]]];
    const SIXTEENTHOBJ = [[0, 'rhythm2', x, y, [null, 1, 2, 5]], [1, ['number', {'value': 1}], 0, 0, [0]], [2, 'divide', 0, 0, [0, 3, 4]], [3, ['number', {'value': 1}], 0, 0, [2]], [4, ['number', {'value': 16}], 0, 0, [2]], [5, 'vspace', 0, 0, [0, null]]];
    const SIXTHOBJ = [[0, 'setscalartransposition', x, y, [null, 1, 6, 8]], [1, 'plus', 0, 0, [0, 2, 3]], [2, ['number', {'value': 5}], 0, 0, [1]], [3, 'multiply', 0, 0, [1, 4, 5]], [4, ['number', {'value': 0}], 0, 0, [3]], [5, 'modelength', 0, 0, [3]], [6, 'vspace', 0, 0, [0, 7]], [7, 'vspace', 0, 0, [6, null]], [8, 'hidden', 0, 0, [0, null]]];
    const SIXTHINTERVALOBJ = [[0, 'interval', x, y, [null, 1, 6, 8]], [1, 'plus', 0, 0, [0, 2, 3]], [2, ['number', {'value': 5}], 0, 0, [1]], [3, 'multiply', 0, 0, [1, 4, 5]], [4, ['number', {'value': 0}], 0, 0, [3]], [5, 'modelength', 0, 0, [3]], [6, 'vspace', 0, 0, [0, 7]], [7, 'vspace', 0, 0, [6, null]], [8, 'hidden', 0, 0, [0, null]]];
    const SIXTYFOURTHOBJ = [[0, 'rhythm2', x, y, [null, 1, 2, 5]], [1, ['number', {'value': 1}], 0, 0, [0]], [2, 'divide', 0, 0, [0, 3, 4]], [3, ['number', {'value': 1}], 0, 0, [2]], [4, ['number', {'value': 64}], 0, 0, [2]], [5, 'vspace', 0, 0, [0, null]]];
    const SKIPOBJ = [[0, 'skipnotes', x, y, [null, 1, null, 2]], [1, ['number', {'value': 2}], 0, 0, [0]], [2, 'hidden', 0, 0, [0, null]]];
    const SLAPOBJ = [[0, 'playdrum', x, y, [null, 1, null]], [1, ['effectsname', {'value': 'slap'}], 0, 0, [0]]];
    const SLUROBJ = [[0, 'slur', x, y, [null, 1, null, 2]], [1, ['number', {'value': 16}], 0, 0, [0]], [2, 'hidden', 0, 0, [0, null]]];
    const SNAREOBJ = [[0, 'playdrum', x, y, [null, 1, null]], [1, ['drumname', {'value': 'snare drum'}], 0, 0, [0]]];
    const SPLASHOBJ = [[0, 'playdrum', x, y, [null, 1, null]], [1, ['effectsname', {'value': 'splash'}], 0, 0, [0]]];
    const SQUAREOBJ = [[0, 'newnote', x, y, [null, 1, 4, 7]], [1, 'divide', 0, 0, [0, 2, 3]], [2, ['number', {'value': 1}], 0, 0, [1]], [3, ['number', {'value': 4}], 0, 0, [1]], [4, 'vspace', 0, 0, [0, 5]], [5, 'square', 0, 0, [4, 6, null]], [6, ['number', {'value': 392}], 0, 0, [5]], [7, 'hidden', 0, 0, [0, null]]];
    const STACCATOOBJ = [[0, 'staccato', x, y, [null, 1, null, 2]], [1, ['number', {'value': 32}], 0, 0, [0]], [2, 'hidden', 0, 0, [0, null]]];
    const STARTDRUMOBJ = [[0, 'start', x, y, [null, 1, null]], [1, 'setdrum', 0, 0,[0, 2, null, 3]], [2, ['drumname', {'value': 'kick drum'}], 0, 0, [1]], [3, 'hidden', 0, 0, [1, null]]];
    const STATUSOBJ = [[0, 'status', x, y, [null, 1, 12]], [1, 'hidden', 0, 0, [0,10]], [2, 'print', 0, 0, [10,3,4]], [3, 'beatvalue', 0, 0, [2]], [4, 'print', 0, 0, [2,5,6]], [5, 'measurevalue', 0, 0, [4]], [6, 'print', 0, 0, [4,7,8]], [7, 'elapsednotes', 0, 0, [6]], [8, 'print', 0, 0, [6,9,null]], [9, 'bpmfactor', 0, 0, [8]], [10, 'print', 0, 0, [1,11,2]], [11, 'pitchinhertz', 0, 0, [10]], [12, 'hiddennoflow', 0, 0, [0,null]]];
    const STOREIN1 = [[0, ['storein2', {'value': _('box1')}], x, y, [null, 1, null]], [1, ['number', {'value': 4}], x, y, [0]]];
    const STOREIN2 = [[0, ['storein2', {'value': _('box2')}], x, y, [null, 1, null]], [1, ['number', {'value': 4}], x, y, [0]]];
    const STUPLETOBJ = [[0, 'stuplet', x, y, [null, 1, 2, 5]], [1, ['number', {'value': 3}], 0, 0, [0]], [2, 'divide', 0, 0, [0, 3, 4]], [3, ['number', {'value': 1}], 0, 0, [2]], [4, ['number', {'value': 2}], 0, 0, [2]], [5, 'vspace', 0, 0, [0, null]]];
    const STUPLET3OBJ = [[0, 'stuplet', x, y, [null, 1, 2, 5]], [1, ['number', {'value': 3}], 0, 0, [0]], [2, 'divide', 0, 0, [0, 3, 4]], [3, ['number', {'value': 1}], 0, 0, [2]], [4, ['number', {'value': 2}], 0, 0, [2]], [5, 'vspace', 0, 0, [0, null]]];
    const STUPLET5OBJ = [[0, 'stuplet', x, y, [null, 1, 2, 5]], [1, ['number', {'value': 5}], 0, 0, [0]], [2, 'divide', 0, 0, [0, 3, 4]], [3, ['number', {'value': 1}], 0, 0, [2]], [4, ['number', {'value': 2}], 0, 0, [2]], [5, 'vspace', 0, 0, [0, null]]];
    const STUPLET7OBJ = [[0, 'stuplet', x, y, [null, 1, 2, 5]], [1, ['number', {'value': 7}], 0, 0, [0]], [2, 'divide', 0, 0, [0, 3, 4]], [3, ['number', {'value': 1}], 0, 0, [2]], [4, ['number', {'value': 2}], 0, 0, [2]], [5, 'vspace', 0, 0, [0, null]]];
    const SWINGOBJ = [[0, 'swing', x, y, [null, 1, null, 2]], [1, ['number', {'value': 32}], 0, 0, [0]], [2, 'hidden', 0, 0, [0, null]]];
    const SWITCHOBJ = [[0, 'switch', x, y, [null, 1, 2, 5]], [1, ['number', {'value': 1}], 0, 0, [0]], [2, 'case', 0, 0, [0, 3, null, 4]], [3, ['number', {'value': 1}], 0, 0, [2]], [4, 'defaultcase', 0, 0, [2, null, null]], [5, 'hidden', 0, 0, [0, null]]];
    const TEMPERAMENTOBJ = [[0, 'temperament', x, y, [null, 1, 2, 8]], [1, ['temperamentname', {'value': 'equal'}], 0, 0, [0]], [2,'pitch',0,0,[0,3,4,5]], [3,['notename',{'value':'C'}],0,0,[2]], [4,['number',{'value':4}],0,0,[2]], [5, 'setkey2', 0, 0, [2, 6, 7, null]], [6, ['notename', {'value': 'C'}], 0, 0, [5]], [7, ['modename', {'value': DEFAULTMODE}], 0, 0, [5]], [8, 'hiddennoflow', 0, 0, [0, null]]];
    const TEMPOOBJ = [[0, 'tempo', x, y, [null, 1, 6]], [1, 'setmasterbpm2', 0, 0, [0, 2, 3, 7]], [2, ['number', {'value': 90}], 0, 0, [1]], [3, 'divide', 0, 0, [1, 4, 5]], [4, ['number', {'value': 1}], 0, 0, [3]], [5, ['number', {'value': 4}], 0, 0, [3]], [6, 'hiddennoflow', 0, 0, [0, null]], [7, 'vspace', 0, 0, [1, null]]];
    const TEMPOOBJ2 = [[0, 'setmasterbpm2', x, y, [null, 1, 2, 5]], [1, ['number', {'value': 90}], 0, 0, [0]], [2, 'divide', 0, 0, [0, 3, 4]], [3, ['number', {'value': 1}], 0, 0, [2]], [4, ['number', {'value': 4}], 0, 0, [2]], [5, 'vspace', 0, 0, [0, null]]];
    const THIRDOBJ = [[0, 'setscalartransposition', x, y, [null, 1, 6, 8]], [1, 'plus', 0, 0, [0, 2, 3]], [2, ['number', {'value': 2}], 0, 0, [1]], [3, 'multiply', 0, 0, [1, 4, 5]], [4, ['number', {'value': 0}], 0, 0, [3]], [5, 'modelength', 0, 0, [3]], [6, 'vspace', 0, 0, [0, 7]], [7, 'vspace', 0, 0, [6, null]], [8, 'hidden', 0, 0, [0, null]]];
    const THIRDINTERVALOBJ = [[0, 'interval', x, y, [null, 1, 6, 8]], [1, 'plus', 0, 0, [0, 2, 3]], [2, ['number', {'value': 2}], 0, 0, [1]], [3, 'multiply', 0, 0, [1, 4, 5]], [4, ['number', {'value': 0}], 0, 0, [3]], [5, 'modelength', 0, 0, [3]], [6, 'vspace', 0, 0, [0, 7]], [7, 'vspace', 0, 0, [6, null]], [8, 'hidden', 0, 0, [0, null]]];
    const THIRTYSECONDOBJ = [[0, 'rhythm2', x, y, [null, 1, 2, 5]], [1, ['number', {'value': 1}], 0, 0, [0]], [2, 'divide', 0, 0, [0, 3, 4]], [3, ['number', {'value': 1}], 0, 0, [2]], [4, ['number', {'value': 32}], 0, 0, [2]], [5, 'vspace', 0, 0, [0, null]]];
    const TIEOBJ = [[0, 'tie', x, y, [null, null, 1]], [1, 'hidden', 0, 0, [0, null]]];
    const TIMBREOBJ = [[0, 'timbre', x, y, [null, 1, 3, 2]], [1, ['text', {'value': _('custom')}], 0, 0, [0]], [2, 'hiddennoflow', 0, 0, [0, null]], [3, 'newnote', 0, 0, [0, 4, 7, 11]], [4, 'divide', 0, 0, [3, 5, 6]], [5, ['number', {'value': 1}], 0, 0, [4]], [6, ['number', {'value': 4}], 0, 0, [4]], [7, 'vspace', 0, 0, [3, 8]], [8, 'pitch', 0, 0, [7, 9, 10, null]], [9, ['solfege', {'value': 'sol'}], 0, 0, [8]], [10, ['number', {'value': 4}], 0, 0, [8]], [11, 'hidden', 0, 0, [3, 12]], [12, 'newnote', 0, 0, [11, 13, 16, 20]], [13, 'divide', 0, 0, [12, 14, 15]], [14, ['number', {'value': 1}], 0, 0, [13]], [15, ['number', {'value': 4}], 0, 0, [13]], [16, 'vspace', 0, 0, [12, 17]], [17, 'pitch', 0, 0, [16, 18, 19, null]], [18, ['solfege', {'value': 'mi'}], 0, 0, [17]], [19, ['number', {'value': 4}], 0, 0, [17]], [20, 'hidden', 0, 0, [12, 21]], [21, 'newnote', 0, 0, [20, 22, 25, 29]], [22, 'divide', 0, 0, [21, 23, 24]], [23, ['number', {'value': 1}], 0, 0, [22]], [24, ['number', {'value': 2}], 0, 0, [22]], [25, 'vspace', 0, 0, [21, 26]], [26, 'pitch', 0, 0, [25, 27, 28, null]], [27, ['solfege', {'value': 'sol'}], 0, 0, [26]], [28, ['number', {'value': 4}], 0, 0, [26]], [29, 'hidden', 0, 0, [21, null]]];
    const TOMOBJ = [[0, 'playdrum', x, y, [null, 1, null]], [1, ['drumname', {'value': 'tom tom'}], 0, 0, [0]]];
    const TONEOBJ = [[0, 'drift', x, y, [null, 1, null]], [1, 'osctime', 0, 0, [0, 3, 2, null]], [2, 'vspace', 0, 0, [1, 6]], [3, 'divide', 0, 0, [1, 4, 5]], [4, ['number', {'value': 1000}], 0, 0, [3]], [5, ['number', {'value': 3}], 0, 0, [3]], [6, 'hertz', 0, 0, [2, 7, null]], [7, ['number', {'value': 392}], 0, 0, [6]]];
    const TRIANGLE1OBJ = [[0, 'playdrum', x, y, [null, 1, null]], [1, ['drumname', {'value': 'triangle bell'}], 0, 0, [0]]];
    const TRIANGLEOBJ = [[0, 'newnote', x, y, [null, 1, 4, 7]], [1, 'divide', 0, 0, [0, 2, 3]], [2, ['number', {'value': 1}], 0, 0, [1]], [3, ['number', {'value': 4}], 0, 0, [1]], [4, 'vspace', 0, 0, [0, 5]], [5, 'triangle', 0, 0, [4, 6, null]], [6, ['number', {'value': 392}], 0, 0, [5]], [7, 'hidden', 0, 0, [0, null]]];
    const TUPLETOBJ = [[0, 'tuplet3', x, y, [null, 1, 10, 9, 7]], [1, ['number', {'value': 1}], 0, 0, [0]], [2, 'rhythm2', 0, 0, [9, 3, 4, 8]], [3, ['number', {'value': 3}], 0, 0, [2]], [4, 'divide', 0, 0, [2, 5, 6]], [5, ['number', {'value': 1}], 0, 0, [4]], [6, ['number', {'value': 4}], 0, 0, [4]], [7, 'hidden', 0, 0, [0, null]], [8, 'vspace', 0, 0, [2, null]], [9, 'vspace', 0, 0, [0, 2]], [10, 'divide', 0, 0, [0, 11, 12]], [11, ['number', {'value': 1}], 0, 0, [10]], [12, ['number', {'value': 4}], 0, 0, [10]]];
    const TUPLET4OBJ = [[0, 'tuplet4', x, y, [null, 1, 4, 17]], [1, 'divide', 0, 0, [0, 2, 3]], [2, ['number', {'value': 1}], 0, 0, [1]], [3, ['number', {'value': 2}], 0, 0, [1]], [4, 'vspace', 0, 0, [0, 5]], [5, 'rhythm2', 0, 0, [4, 6, 7, 10]], [6, ['number', {'value': 6}], 0, 0, [5]], [7, 'divide', 0, 0, [5, 8, 9]], [8, ['number', {'value': 1}], 0, 0, [7]], [9, ['number', {'value': 16}], 0, 0, [7]], [10, 'vspace', 0, 0, [5, 11]], [11, 'rhythm2', 0, 0, [10, 12, 13, 16]], [12, ['number', {'value': 1}], 0, 0, [11]], [13, 'divide', 0, 0, [11, 14, 15]], [14, ['number', {'value': 1}], 0, 0, [13]], [15, ['number', {'value': 4}], 0, 0, [13]], [16, 'vspace', 0, 0, [11, null]], [17, 'hidden', 0, 0, [0, 18]], [18, 'hidden', 0, 0, [17, null]]];
    const TURTLESHELLOBJ = [[0, 'turtleshell', x, y, [null, 1, 2, 3]], [1, ['number', {'value': 55}], 0, 0, [0]], [2, 'media', 0, 0, [0]], [3, 'vspace', 0, 0, [0, null]]];
    const UNISONOBJ = [[0, 'setscalartransposition', x, y, [null, 1, 6, 8]], [1, 'plus', 0, 0, [0, 2, 3]], [2, ['number', {'value': 0}], 0, 0, [1]], [3, 'multiply', 0, 0, [1, 4, 5]], [4, ['number', {'value': 0}], 0, 0, [3]], [5, 'modelength', 0, 0, [3]], [6, 'vspace', 0, 0, [0, 7]], [7, 'vspace', 0, 0, [6, null]], [8, 'hidden', 0, 0, [0, null]]];
    const UNISONINTERVALOBJ = [[0, 'interval', x, y, [null, 1, 6, 8]], [1, 'plus', 0, 0, [0, 2, 3]], [2, ['number', {'value': 0}], 0, 0, [1]], [3, 'multiply', 0, 0, [1, 4, 5]], [4, ['number', {'value': 0}], 0, 0, [3]], [5, 'modelength', 0, 0, [3]], [6, 'vspace', 0, 0, [0, 7]], [7, 'vspace', 0, 0, [6, null]], [8, 'hidden', 0, 0, [0, null]]];
    const VIBRATOOBJ = [[0, 'vibrato', x, y, [null, 1, 3, 2, 6]], [1, ['number', {'value': 5}], 0, 0, [0]], [2, 'vspace', 0, 0, [0, null]], [3, 'divide', 0, 0, [0, 4, 5]], [4, ['number', {'value': 1}], 0, 0, [3]], [5, ['number', {'value': 16}], 0, 0, [3]], [6, 'hidden', 0, 0, [0, null]]];
    const VOLOBJ = [[0, 'setsynthvolume2', x, y, [null, 1, 2, null, 3]], [1, ['voicename', {'value': DEFAULTVOICE}], 0, 0, [0]], [2, ['number', {'value': 50}], 0, 0, [0]], [3, 'hidden', 0, 0, [0, null]]];
    const VOLOBJ10 = [[0, 'setsynthvolume2', x, y, [null, 1, 2, null, 3]], [1, ['voicename', {'value': DEFAULTVOICE}], 0, 0, [0]], [2, ['number', {'value': 10}], 0, 0, [0]], [3, 'hidden', 0, 0, [0, null]]];
    const VOLOBJ20 = [[0, 'setsynthvolume2', x, y, [null, 1, 2, null, 3]], [1, ['voicename', {'value': DEFAULTVOICE}], 0, 0, [0]], [2, ['number', {'value': 20}], 0, 0, [0]], [3, 'hidden', 0, 0, [0, null]]];
    const VOLOBJ30 = [[0, 'setsynthvolume2', x, y, [null, 1, 2, null, 3]], [1, ['voicename', {'value': DEFAULTVOICE}], 0, 0, [0]], [2, ['number', {'value': 30}], 0, 0, [0]], [3, 'hidden', 0, 0, [0, null]]];
    const VOLOBJ40 = [[0, 'setsynthvolume2', x, y, [null, 1, 2, null, 3]], [1, ['voicename', {'value': DEFAULTVOICE}], 0, 0, [0]], [2, ['number', {'value': 40}], 0, 0, [0]], [3, 'hidden', 0, 0, [0, null]]];
    const VOLOBJ50 = [[0, 'setsynthvolume2', x, y, [null, 1, 2, null, 3]], [1, ['voicename', {'value': DEFAULTVOICE}], 0, 0, [0]], [2, ['number', {'value': 50}], 0, 0, [0]], [3, 'hidden', 0, 0, [0, null]]];
    const VOLOBJ60 = [[0, 'setsynthvolume2', x, y, [null, 1, 2, null, 3]], [1, ['voicename', {'value': DEFAULTVOICE}], 0, 0, [0]], [2, ['number', {'value': 60}], 0, 0, [0]], [3, 'hidden', 0, 0, [0, null]]];
    const VOLOBJ80 = [[0, 'setsynthvolume2', x, y, [null, 1, 2, null, 3]], [1, ['voicename', {'value': DEFAULTVOICE}], 0, 0, [0]], [2, ['number', {'value': 80}], 0, 0, [0]], [3, 'hidden', 0, 0, [0, null]]];
    const VOLOBJ100 = [[0, 'setsynthvolume2', x, y, [null, 1, 2, null, 3]], [1, ['voicename', {'value': DEFAULTVOICE}], 0, 0, [0]], [2, ['number', {'value': 100}], 0, 0, [0]], [3, 'hidden', 0, 0, [0, null]]];
    const WHOLEOBJ = [[0, 'rhythm2', x, y, [null, 1, 2, 5]], [1, ['number', {'value': 1}], 0, 0, [0]], [2, 'divide', 0, 0, [0, 3, 4]], [3, ['number', {'value': 1}], 0, 0, [2]], [4, ['number', {'value': 1}], 0, 0, [2]], [5, 'vspace', 0, 0, [0, null]]];
    const BLACKOBJ = [[0, 'setshade', x, y, [null, 1, null]], [1, ['number', {'value': 0}], 0, 0, [0]]];
    const WHITEOBJ = [[0, 'setshade', x, y, [null, 1, null]], [1, ['number', {'value': 100}], 0, 0, [0]]];
    const REDOBJ = [[0, 'setcolor', x, y, [null, 1, null]], [1, ['number', {'value': 0}], 0, 0, [0]]];
    const ORANGEOBJ = [[0, 'setcolor', x, y, [null, 1, null]], [1, ['number', {'value': 10}], 0, 0, [0]]];
    const YELLOWOBJ = [[0, 'setcolor', x, y, [null, 1, null]], [1, ['number', {'value': 20}], 0, 0, [0]]];
    const GREENOBJ = [[0, 'setcolor', x, y, [null, 1, null]], [1, ['number', {'value': 40}], 0, 0, [0]]];
    const BLUEOBJ = [[0, 'setcolor', x, y, [null, 1, null]], [1, ['number', {'value': 70}], 0, 0, [0]]];
    const PURPLEOBJ = [[0, 'setcolor', x, y, [null, 1, null]], [1, ['number', {'value': 90}], 0, 0, [0]]];

    const BUILTINMACROS = {
        'accidental': ACCIDENTALOBJ,
        'action': ACTIONOBJ,
        'actionhelp': ACTIONHELP,
	'archelp': ARCHELP,
	'amsynthhelp': AMSYNTHHELP,
        'articulation': ARTICULATIONOBJ,
        'acticulationhelp': ARTICULATIONHELP,
        'augmented1': AUGMENTED1OBJ,
        'augmented2': AUGMENTED2OBJ,
        'augmented3': AUGMENTED3OBJ,
        'augmented4': AUGMENTED4OBJ,
        'augmented5': AUGMENTED5OBJ,
        'augmented6': AUGMENTED6OBJ,
        'augmented7': AUGMENTED7OBJ,
        'augmented8': AUGMENTED8OBJ,
        'backward': BACKWARDOBJ,
	'beatvaluehelp': BEATVALUEHELP,
        'bottle': BOTTLEOBJ,
	'bottomposhelp': BOTTOMPOSHELP,
        'box1': BOX1,
	'box1help': BOX1HELP,
        'box2': BOX2,
	'box2help': BOX2HELP,
	'bpmhelp': BPMHELP,
	'broadcasthelp': BROADCASTHELP,
        'bubbles': BUBBLESOBJ,
        'cat': CATOBJ,
        'chine': CHINEOBJ,
        'chordI': CHORDI,
        'chordIV': CHORDIV,
        'chordV': CHORDV,
	'chorushelp': CHORUSHELP,
        'clang': CLANGOBJ,
        'clap': CLAPOBJ,
	'clickhelp': CLICKHELP,
        'cowbell': COWBELLOBJ,
        'crash': CRASHOBJ,
        'crescendo': CRESCENDOOBJ,
        'crescendohelp': CRESCENDOHELP,
        'cricket': CRICKETOBJ,
        'cup': CUPOBJ,
        'custompitch': CUSTOMPITCHOBJ,
        'darbuka': DARBUKAOBJ,
        'decrescendo': DECRESCENDOOBJ,
        'decrescendohelp': DECRESCENDOHELP,
        'definemode': DEFINEMODEOBJ,
	'deltapitchhelp': DELTAPITCHHELP,
        'diminished2': DIMINISHED2OBJ,
        'diminished3': DIMINISHED3OBJ,
        'diminished4': DIMINISHED4OBJ,
        'diminished5': DIMINISHED5OBJ,
        'diminished6': DIMINISHED6OBJ,
        'diminished7': DIMINISHED7OBJ,
        'diminished8': DIMINISHED8OBJ,
	'dishelp': DISHELP,
	'dohelp': DOHELP,
        'dog': DOGOBJ,
	'doublyhelp': DOUBLYHELP,
        'downmajor3': DOWNMAJOR3OBJ,
        'downmajor6': DOWNMAJOR6OBJ,
        'downminor3': DOWNMINOR3OBJ,
        'downminor6': DOWNMINOR6OBJ,
        'downsixthinterval': DOWNSIXTHINTERVALOBJ,
        'downthirdinterval': DOWNTHIRDINTERVALOBJ,
        'downsixth': DOWNSIXTHOBJ,
        'downthird': DOWNTHIRDOBJ,
        'drift': DRIFTOBJ,
        'duck': DUCKOBJ,
	'duosynthhelp': DUOSYNTHHELP,
        'duplicatenotes': DUPOBJ,
        'duphelp': DUPHELP,
	'effectshelp': EFFECTSHELP,
	'eihelp': EIHELP,  // East indian solfege
        'eighthNote': EIGHTHOBJ,
	'elifhelp': ELIFHELP, // if-then-else
	'elapsedhelp': ELAPSEDHELP,
        'elapsednotes2': ELAPSEDNOTESOBJ,
        'f': VOLOBJ60,
        'ff': VOLOBJ80,
        'fff': VOLOBJ100,
        'fifth': FIFTHOBJ,
        'fifthinterval': FIFTHINTERVALOBJ,
        'fill': FILLOBJ,
        'fillhelp': FILLHELP,
        'fingercymbals': FINGERCYMBALSOBJ,
        'flat': FLATOBJ,
        'floortom': FLOORTOMOBJ,
	'fmsynthhelp': FMSYNTHHELP,
	'foreverhelp': FOREVERHELP,
	'forwardhelp': FORWARDHELP,
        'fourth': FOURTHOBJ,
        'fourthinterval': FOURTHINTERVALOBJ,
        'glide': GLIDEOBJ,
        'halfNote': HALFOBJ,
        'harmonic': HARMONICOBJ,
        'harmonic2': HARMONIC2OBJ,
	'harmonichelp': HARMONICHELP,
        'hihat': HIHATOBJ,
        'hollowline': HOLLOWOBJ,
	'ifhelp': IFHELP,
        'interval': INTERVALOBJ,
        'invert': INVERTOBJ,
        'invert1': INVERT1OBJ,
        'inverthelp': INVERTHELP,
        'kick': KICKOBJ,
	'lrhelp': LRHELP,
        'major2': MAJOR2OBJ,
        'major3': MAJOR3OBJ,
        'major6': MAJOR6OBJ,
        'major7': MAJOR7OBJ,
        'matrix': MATRIXOBJ,
        'matrixcmajor': MATRIXCMAJOBJ,
        'matrixgmajor': MATRIXGMAJOBJ,
        'meter': METEROBJ,
        'meterwidget': METERWIDGETOBJ,
        'mf': VOLOBJ50,
        'midi': MIDIOBJ,
        'minor2': MINOR2OBJ,
        'minor3': MINOR3OBJ,
        'minor6': MINOR6OBJ,
        'minor7': MINOR7OBJ,
        'modewidget': MODEWIDGETOBJ,
	'mousebuttonhelp': MOUSEBUTTONHELP,
        'movable': MOVABLEOBJ,
	'movablehelp': MOVABLEHELP,
        'mp': VOLOBJ40,
        'multiplybeatfactor': MULTBEATOBJ,
        'multiplybeathelp': MULTBEATHELP,
        'neighbor': NEIGHBOROBJ,
        'neighbor2': NEIGHBOR2OBJ,
        'neighborhelp': NEIGHBORHELP,
        'neighbor2help': NEIGHBOR2HELP,
        'newnote': NEWNOTEOBJ,
        'newslur': NEWSLUROBJ,
        'newstaccato': NEWSTACCATOOBJ,
        'newswing2': NEWSWING2OBJ,
        'newswing': NEWSWINGOBJ,
        'note1': NOTE1OBJ,  // sol 4
        'note2': NOTE2OBJ,  // G 4
        'note3': NOTE3OBJ,  // 392 hertz
        'note4': NOTE4OBJ,  // drum
        'note5': NOTE5OBJ,  // pitch number 7
        'note6': NOTE6OBJ,  // step pitch +1
        'note7': NOTE7OBJ,  // scale degree 5 4
        'note': NOTEOBJ,
        'octave': OCTAVEOBJ,
        'oneOf': ONEOFOBJ,
        'osctime': OSCTIMEOBJ,
        'perfect4': PERFECT4OBJ,
        'perfect5': PERFECT5OBJ,
        'perfect8': PERFECT8OBJ,
        'pickup': PICKUPOBJ,
        'pitch2': PITCH2OBJ,
        'pitchdrummatrix': PITCHDRUMMATRIXOBJ,
        'pitchslider': PITCHSLIDEROBJ,
        'musickeyboard2': MUSICKEYBOARDOBJ,
        'musickeyboardja': MUSICKEYBOARDJAOBJ,
        'pitchstaircase': PITCHSTAIRCASEOBJ,
        'playdrum': PLAYDRUMOBJ,
        'playeffect': PLAYEFFECTOBJ,
        'playnoise': PLAYNOISEOBJ,
        'ppp': VOLOBJ10,
        'pp': VOLOBJ20,
        'p': VOLOBJ30,
        'quarterNote': QUARTEROBJ,
        'rest2': RESTOBJ,
        'rhythm2': RHYTHMOBJ,
        'rhythmicdot': DOTOBJ,
        'rhythmicdot2': DOTOBJ2,
        'rhythmruler2': RHYTHMRULER2OBJ,
        'rhythmruler3': RHYTHMRULER3OBJ,
        'ridebell': RIDEBELLOBJ,
        'sawtooth': SAWTOOTHOBJ,
        'second': SECONDOBJ,
        'secondinterval': SECONDINTERVALOBJ,
        'semitoneinterval': SEMITONEINTERVALOBJ,
        'setbpm': BPMOBJ,
        'setbpm2': BPMOBJ2,
        'setbpm3': BPMOBJ3,
        'setdrum': SETDRUMOBJ,
        'setdrumvolume': SETDRUMVOLUMEOBJ,
        'setkey2': SETKEYOBJ,
        'setnotevolume2': VOLOBJ,
        'setsynthvolume': SETSYNTHVOLUMEOBJ,
        'setscalartransposition': SETSCALARTRANSPOBJ,
        'settransposition': SETTRANSPOSITIONOBJ,
        'settimbre': SETTIMBREOBJ,
        'settemperament':SETTEMPERAMENTOBJ,
        'setvoice': SETVOICEOBJ,
        'seventh': SEVENTHOBJ,
        'seventhinterval': SEVENTHINTERVALOBJ,
        'sharp': SHARPOBJ,
        'sine': SINEOBJ,
        'sixteenthNote': SIXTEENTHOBJ,
        'sixth': SIXTHOBJ,
        'sixthinterval': SIXTHINTERVALOBJ,
        'sixtyfourthNote': SIXTYFOURTHOBJ,
        'skipnotes': SKIPOBJ,
        'slap': SLAPOBJ,
        'slur': SLUROBJ,
        'snare': SNAREOBJ,
        'splash': SPLASHOBJ,
        'square': SQUAREOBJ,
        'staccato': STACCATOOBJ,
        'startdrum': STARTDRUMOBJ,
        'status': STATUSOBJ,
        'storebox1': STOREIN1,
        'storebox2': STOREIN2,
        'stuplet': STUPLETOBJ,
        'stuplet3': STUPLET3OBJ,
        'stuplet5': STUPLET5OBJ,
        'stuplet7': STUPLET7OBJ,
        'swing': SWINGOBJ,
        'switch': SWITCHOBJ,
	'swinghelp': SWINGHELP,
        'setmasterbpm2': TEMPOOBJ2,
        'temperament': TEMPERAMENTOBJ,
        'tempo': TEMPOOBJ,
        'third': THIRDOBJ,
        'thirdinterval': THIRDINTERVALOBJ,
        'thirtysecondNote': THIRTYSECONDOBJ,
        'tie': TIEOBJ,
        'timbre': TIMBREOBJ,
        'tom': TOMOBJ,
        'tone': TONEOBJ,
        'triangle': TRIANGLEOBJ,
        'trianglebell': TRIANGLE1OBJ,
        'tuplet3': TUPLETOBJ,
        'tuplet4': TUPLET4OBJ,
	'turtleshell': TURTLESHELLOBJ,
        'unison': UNISONOBJ,
        'unisoninterval': UNISONINTERVALOBJ,
        'vibrato': VIBRATOOBJ,
        'wholeNote': WHOLEOBJ,

        'black': BLACKOBJ,
        'white': WHITEOBJ,
        'red': REDOBJ,
        'orange': ORANGEOBJ,
        'yellow': YELLOWOBJ,
        'green': GREENOBJ,
        'blue': BLUEOBJ,
        'purple': PURPLEOBJ,
    };

    console.log(blkname);
    if (['namedbox', 'nameddo', 'namedcalc', 'namedarg', 'nameddoArg'].indexOf(blkname) === -1 && blkname in BUILTINMACROS) {
	return BUILTINMACROS[blkname];
    } else {
        return null;
    }
};
