import React from 'react';
import ReactDOM from 'react-dom';
import getMaze from './GenerateBoard';
import Game from './Game'

const gameRows = 7;
function generateEnd(rows){
  var end = Math.floor(Math.random() * rows *rows );
  var theMaze = getMaze(rows);
  return theMaze[end] ? end : generateEnd(rows);
}

ReactDOM.render(
  <Game endPos={generateEnd(gameRows)+1} numberOfRows={gameRows}/>,
  document.getElementById("container")
);
