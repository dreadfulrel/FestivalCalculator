import React from 'react';
import PropTypes from 'prop-types';

export default class ArtistTile extends React.Component{

  render () {
    return(
      <div
        className={"item stylizedItem"+ (this.props.selected ? " selected" : "")}
        onClick={this.props.handleSelect}
      >
        <p className="artistName">{this.props.text}</p>
        <img
          src="http://clipart.info/images/ccovers/1496175227emoji-android-thumbs-up-sign.png"
          className="removeButton"
          onClick={this.props.handleSelect}
          height={18}
          width={18}
        />
        <p className="removeButton" onClick={this.props.handleRemoveItem}>x</p>
      </div>
    );
  }
}

ArtistTile.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  text: PropTypes.string.isRequired
}

ArtistTile.defaultProps = {
  width: 100,
  height: 40
}
