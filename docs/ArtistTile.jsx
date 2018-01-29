import React from 'react';
import PropTypes from 'prop-types';

export default class ArtistTile extends React.Component{

  render () {
    return(
      <div
        className="item stylizedItem"
      >
        <p className="artistName">{this.props.text}</p>
        <p className="cancelButton" onClick={this.props.handleRemoveItem}>x</p>
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
