require("!style!css!../css/main.css");

import React from 'react';

import Game from './game.js';
import Application from './component.jsx';


main();

function main() {
    var boardContent = Game.createBoard();

    React.render(<Application game={Game} boardContent={boardContent}></Application>, document.getElementById('app'));
}
