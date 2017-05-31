import React from 'react';

const Button = (props) => {
  /*const start = (event) => {
    {props.start();}
  }*/
  return(<button type="button" className="btn-lg" onClick={props.handleClick}/*{start*/>{props.text}</button>);
}

/*class Button extends React.Component {
  render() {
    return(<button onClick={() => {this.props.start(); }}>Start Game</button>);
  }
}*/

export default Button;
