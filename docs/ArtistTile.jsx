import React from 'react';
import PropTypes from 'prop-types';
import {SortableHandle} from 'react-sortable-hoc';

const DragHandle = SortableHandle(() => <div className="handle" />);

export default class ArtistTile extends React.Component{
  render () {
    return(
      <div
        className={"item stylizedItem"+ (this.props.selected ? " selected" : "")}
      >
        <DragHandle />
        <p className="artistRank">{this.props.rank}</p>
        <p className="artistName">{this.props.text}</p>
        <img
          src="https://cdn.expansion.mx/dims4/default/067ba8e/2147483647/crop/1719x967%2B0%2B197/resize/800x450%5E/quality/75/?url=https%3A%2F%2Fcdn.expansion.mx%2F1e%2F69%2Fd55b5ba34ea9bee2d8bf27d5878d%2Fistock-669948704.jpg"
          className="likeButton buttons"
          onClick={this.props.handleSelect}
          height="10%"
          width="10%"
        />
        <p className="removeButton buttons" onClick={this.props.handleRemoveItem}>x</p>
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
