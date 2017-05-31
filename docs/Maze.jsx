import React from 'react';
import {MazeTile,UnclickableTile,StartingTile} from './MazeTile';
import getMaze from './GenerateBoard';

var FullMaze = React.createClass({
  render: function() {
    var tiles = [];
    tiles.push (<MazeTile rows={this.props.nRows} theClass={"starting"} num={1} key={1}/>)
    for (var i=1; i<this.props.nRows*this.props.nRows;i++) {
      tiles.push (
        <MazeTile rows={this.props.nRows} theClass={"unclickable"} num={i+1} key={i+1}/>
      );
    }
    return (
      <div id="tile-frame">
          {tiles}
      </div>
    );
  }
});

class EndMaze extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      traveled: -1
    };
    this.handleClick=this.handleClick.bind(this);
  }
  handleClick(currentPos) {
    this.setState({
      traveled: currentPos
    });
    this.props.win(currentPos);
  }
  render() {
    var tiles = [];
    tiles.push (<MazeTile rows={this.props.nRows} theClass={"starting"} num={1} key={1}/>)
    for (var i=1; i<this.props.nRows*this.props.nRows;i++) {
      if(i+1==this.state.traveled){
        tiles.push(
          <MazeTile rows={this.props.nRows} num={i+1} theClass="traveled" key={i+1} handleClick={this.handleClick}/>
        )
      }
      else {
        tiles.push (
        <MazeTile rows={this.props.nRows} num={i+1} key={i+1} handleClick={this.handleClick}/>
      );
    }
    }
    return (
      <div id="tile-frame">
          {tiles}
      </div>
    );
  }
}

class InMaze extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      pos: props.localPos || 1,
      traveled: 1
    };
    this.handleClick=this.handleClick.bind(this);
  }

  handleClick (currentPos) {
    this.setState({
      pos: currentPos,
      traveled: currentPos
    });
    if(currentPos==this.props.endPos)
    {
      this.props.end();
    }
  }

  render() {
    var adjacentTiles = getAdjacent(this.props.nRows,this.state.pos);
    var inTiles = [];
    for (var i=0; i<adjacentTiles.length;i++) {
        if(!isClickable(adjacentTiles[i]-1,this.props.nRows)){
          inTiles.push(<UnclickableTile rows={3} key={i}/>);
        }
        else if(adjacentTiles[i]==1){
          inTiles.push (
            <MazeTile rows={3} num={adjacentTiles[i]} theClass={"starting"} handleClick={this.handleClick} key={i}/>
            );
        }
        else if(adjacentTiles[i]==this.props.endPos){
          inTiles.push (
            <MazeTile rows={3} num={adjacentTiles[i]} theClass={"winning"} handleClick={this.handleClick} key={i}/>
            );
        }
        else if(adjacentTiles[i]==this.state.traveled){
          inTiles.push (
            <MazeTile rows={3} num={adjacentTiles[i]} theClass="traveled" handleClick={this.handleClick} key={i}/>
            );
        }
        else{
          inTiles.push (
            <MazeTile rows={3} num={adjacentTiles[i]} handleClick={this.handleClick} key={i}/>
            );
        }
    }
    return (
      <div>
      <div id="tile-frame">
          {inTiles}
      </div>
      </div>
    );
  }
}

function bottomEdge(n,pos){
  return n*(n-1)<pos;
}
function topEdge(n,pos)
{
  return pos<=n;
}
function leftEdge(n,pos)
{
  return pos%n==1;
}
function rightEdge(n,pos)
{
  return pos%n==0;
}

function getAdjacent(n, pos){
  var adjacent = [
    topEdge(n,pos)||leftEdge(n,pos)?-1:pos-n-1,
    topEdge(n,pos)?-1:pos-n,
    topEdge(n,pos)||rightEdge(n,pos)?-1:pos-n+1,
    leftEdge(n,pos)?-1:pos-1,
    pos,
    rightEdge(n,pos)?-1:pos+1,
    bottomEdge(n,pos)||leftEdge(n,pos)?-1:pos+n-1,
    bottomEdge(n,pos)?-1:pos+n,
    bottomEdge(n,pos)||rightEdge(n,pos)?-1:pos+n+1];
  return adjacent;
}

function isClickable(pos, numberOfRows)
{
  if(pos < 0){
    return 0;
  }
  var open = getMaze(numberOfRows);
  return open[pos];
}

export {
  FullMaze,
  EndMaze,
  InMaze
}
