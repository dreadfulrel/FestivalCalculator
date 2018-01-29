import React, {Component} from 'react';
import {render} from 'react-dom';
import festivals from './Festivals';
import ArtistTile from './ArtistTile'
import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';

const getArtists = () => {
  const artistsUnsorted = [];
  let artistsSorted = [];
  festivals.forEach(festival => {
    for (let i = 0; i < festival.artists.length; i++){
      artistsUnsorted.push([festival.artists[i],((i+1)/festival.artists.length)*((i+1)/festival.artists.length)]);
    }
  });
  artistsUnsorted.sort((a,b) => a[1]-b[1]);
  artistsSorted.push(artistsUnsorted[0][0]);
  for (let j = 0; j < artistsUnsorted.length; j++){
    if (!artistsSorted.includes(artistsUnsorted[j][0])) {
      artistsSorted.push(artistsUnsorted[j][0]);
    }
  }
  return artistsSorted;
}
const SortableItem = SortableElement(({value, handleRemoveItem}) => <ArtistTile text={value} handleRemoveItem={handleRemoveItem}/>);

const SortableList = SortableContainer(({items, handleRemoveItem}) => {
  return (
    <div className="list stylizedList">
      {items.map((value, index) => (
        <SortableItem key={value} index={index} value={value} handleRemoveItem={() => handleRemoveItem(index)}/>
      ))}
    </div>
  );
});

export default class TileBoard extends Component {
  state = {
    items: getArtists(),
    bestMatch: ''
  };
  onSortEnd = ({oldIndex, newIndex}) => {
    this.setState({
      items: arrayMove(this.state.items, oldIndex, newIndex),
    });
  };
  handleRemoveItem = (index) => {
    console.log(index);
    this.setState(prevState => {
      const newItems = prevState.items;
      newItems.splice(index,1)
      return {
        items: newItems
      }
    })
  }
  calculateBestFestival = () => {
    const festivalScores = {};
    festivals.forEach(festival => {
      festivalScores[festival.name] = 0;
      for (let i = 0; i < this.state.items.length; i++) {
        if(festival.artists.includes(this.state.items[i])) {
          festivalScores[festival.name] += (this.state.items.length - i);
        }
      }
    })
    let bestMatch =  Object.keys(festivalScores)[0];
    for (var key in festivalScores) {
      if (festivalScores[key] > festivalScores[bestMatch]) {
        bestMatch = key;
      }
    }
    this.setState({bestMatch});
  }
  render() {
    return <div className="myFrame">
      <SortableList
        items={this.state.items}
        onSortEnd={this.onSortEnd}
        handleRemoveItem={this.handleRemoveItem}
        />
      <p className="well" onClick={this.calculateBestFestival}>Calculate</p>
      <p>{this.state.bestMatch}</p>
    </div>;
  }
}
