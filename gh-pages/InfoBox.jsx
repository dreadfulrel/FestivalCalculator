import React from 'react';
import Button from './Button';

export default class InfoBox extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      pVis: false
    };
    this.handleClick=this.handleClick.bind(this);
  }

  handleClick () {
    this.setState({ pVis : (this.state.pVis ? false : true)});
  }

  render() {
    var helpText = "Navigate through the maze. Once you find the treasure, you'll have to let your partners know where you are so they can drill in and get you out of there."
    return (
      <div id="infoButtons">
        <Button handleClick={this.props.start} text={"Start Game"} />
        <Button handleClick={this.handleClick} text={"Instructions"} />
        <p style={{visibility: this.state.pVis ? "visible":"hidden"}}>a</p>
      </div>
    )
  }
}
