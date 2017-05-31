import React from 'react';

class MazeTile extends React.Component{
  constructor(props){
    super(props);
  }

  render () {
    return(
      <div className = {"well " + this.props.theClass}  style={{width: 100/this.props.rows + "%", paddingBottom: getPadding(this.props.rows) + "%", maxWidth: 600/this.props.rows}} onClick={() => {this.props.handleClick(this.props.num); }}>
          <span className = "glyphicon"></span>
      </div>
    );
  }
}

function getPadding(rows){
  return -4.5*rows+41.5
}
function getNothing(rows){
  return rows;
}

const UnclickableTile = (props) => {
  return (
    <MazeTile rows={props.rows} handleClick={getNothing} theClass="unclickable"/>
    )
}

const StartingTile = (props) => {
  return (
    <MazeTile rows={props.rows} handleClick={getNothing} theClass="starting"/>
    )
}

export{
  UnclickableTile,
  StartingTile,
  MazeTile
}
