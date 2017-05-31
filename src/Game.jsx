import React from 'react';
import Button from './Button'
import InfoBox from './InfoBox'
import {FullMaze,EndMaze,InMaze} from './Maze';

var Game = React.createClass({
  getInitialState: function() {
    return {pos: 1,
      viewStart: 1,
      endGame: 0,
      win: 0,
    };
  },

  start: function() {
    this.setState({
      viewStart: 0
    });
  },

  end: function()
  {
    this.setState({
      endGame: 1
    });
  },

  win: function(currentPos)
  {
    if(currentPos==this.props.endPos){
      this.setState({
        win: 1,
        endGame: 0
      });
    }
  },

  restart: function()
  {
    this.setState({
      viewStart: 1,
      win: 0
    });
  },

  render: function () {
  if(this.state.win==1){
    return (
      <div>
        <h2>You Win</h2>
        <Button handleClick={this.restart} text={"Play again"}/>
      </div>
      )
  }
  else if(this.state.viewStart==1){
    return (
      <div id="game">
        <div id="maze">
          <h2>Play Maze</h2>
          <FullMaze nRows={this.props.numberOfRows}/>
        </div>
        <div id="info">
          <InfoBox start={this.start}/>
        </div>
      </div>
    );
  }
  else if(this.state.endGame==1){
    return (
      <div id="game">
        <h2>Choose</h2>
        <EndMaze nRows={this.props.numberOfRows} endPos={this.props.endPos} win={this.win}/>
      </div>
    );
  }
  else {
    return (
      <div id="game">
        <h2>Play Maze</h2>
        <InMaze nRows={this.props.numberOfRows} localPos={this.state.pos} end={this.end} endPos={this.props.endPos}/>
      </div>
    );
  }
  }
})

export default Game;
