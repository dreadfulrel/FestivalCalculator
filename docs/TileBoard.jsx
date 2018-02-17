import React, {Component} from 'react';
import {render} from 'react-dom';
import festivals from './Festivals';
import ArtistTile from './ArtistTile';
import SelectButton from './SelectButton'
import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';

const itemList = (items) => items.map(item => <li>item</li>);

const FestivalOptions = ({options, selected, handleClick}) => {
  return (
    <div style={{display:"inline-block"}}>
      {options.map(option =>
        <SelectButton
          text={option}
          handleClick={handleClick}
          selected={selected.includes(option)}
          />)}
    </div>
  )
}

const getArtists = (options) => {
  const artistsUnsorted = [];
  let artistsSorted = [];
  festivals.forEach(festival => {
    if (!options.includes(festival.name)) {
      return;
    }
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
const SortableItem = SortableElement(({value, handleRemoveItem, selected, handleSelect}) =>
  <ArtistTile
    text={value}
    handleRemoveItem={handleRemoveItem}
    handleSelect={handleSelect}
    selected={selected}
  />
);

const SortableList = SortableContainer(({items, handleRemoveItem, selectedItems, handleSelect}) => {
  return (
    <div className="list stylizedList">
      {items.map((value, index) => (
        <SortableItem
          key={value}
          index={index}
          value={value}
          handleRemoveItem={() => handleRemoveItem(index)}
          handleSelect={() => handleSelect(index)}
          selected={selectedItems.includes(value)}
        />
      ))}
    </div>
  );
});

export default class TileBoard extends Component {
  state = {
    items: getArtists(festivals.map(festival => festival.name)).slice(0,10),
    bestMatch: '',
    festivalScores: [],
    selectedItems: [],
    selectedFestivals: festivals.map(festival => festival.name),
    festivalOptions: festivals.map(festival => festival.name)
  };

  allArtists = getArtists(festivals.map(festival => festival.name));

  onSortEnd = ({oldIndex, newIndex}) => {
    this.setState({
      items: arrayMove(this.state.items, oldIndex, newIndex),
    });
  };
  handleRemoveItem = (index) => {
    this.setState(prevState => {
      const newItems = prevState.items;
      newItems.splice(index,1)
      return {
        items: newItems
      }
    })
  };

  handleSelect = (index) => {
    this.setState(prevState => {
      if(!prevState.selectedItems.includes(prevState.items[index])) {
        prevState.selectedItems.push(prevState.items[index]);
      }
      return {
        selectedItems: prevState.selectedItems
      }
    })
  };

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
    const scoresArray = Object.keys(festivalScores).map(a => [a + " - ", festivalScores[a]]);
    scoresArray.sort((a,b) => b[1] - a[1]);
    this.setState({bestMatch, festivalScores: scoresArray});
  };

  handleFestivalCheck = (value) => {
    this.setState(prevState => {
      if (prevState.selectedFestivals.includes(value)) {
        prevState.selectedFestivals.splice(prevState.selectedFestivals.indexOf(value),1);
      }
      else {
        prevState.selectedFestivals.push(value);
      }
      return {items: getArtists(prevState.selectedFestivals)}
    })
  }

  onlySelected = () => {
    this.setState(prevState => {
      return {items: prevState.selectedItems}
    })
  }

  render() {
    return (
      <div className="myFrame">
        <FestivalOptions
          options={this.state.festivalOptions}
          selected={this.state.selectedFestivals}
          handleClick={this.handleFestivalCheck}
        />
        <div className="columns">
          <div className="artistList">
          <SortableList
            items={this.state.items}
            selectedItems={this.state.selectedItems}
            onSortEnd={this.onSortEnd}
            handleRemoveItem={this.handleRemoveItem}
            handleSelect={this.handleSelect}
            />
          <p className="well" onClick={this.calculateBestFestival}>Calculate</p>
          <p className="well" onClick={this.onlySelected}>Filter Selected</p>
          <br/>
          </div>
          <div className="festivalResults">
            <p>Your best festival is {this.state.bestMatch}</p>
            <br/>
            <ul>{this.state.festivalScores.map(item => <li>{item}</li>)}</ul>
          </div>
        </div>
      </div>);
  }
}
