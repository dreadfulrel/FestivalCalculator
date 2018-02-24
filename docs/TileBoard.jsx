import React, {Component} from 'react';
import {render} from 'react-dom';
import festivals from './Festivals';
import ArtistTile from './ArtistTile';
import SelectButton from './SelectButton'
import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';

const FestivalOptions = ({options, selected, handleClick}) => {
  return (
    <div style={{display:"inline-block", margin:"2em 0 2em 0" }}>
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

const SortableItem = SortableElement(({rank,value, handleRemoveItem, selected, handleSelect, allowRanking}) =>
  <ArtistTile
    text={value}
    rank={rank}
    handleRemoveItem={handleRemoveItem}
    handleSelect={handleSelect}
    selected={selected}
    allowRanking={allowRanking}
  />
);

const SortableList = SortableContainer(({items, handleRemoveItem, selectedItems, handleSelect, allowRanking}) => {
  return (
    <div className="list stylizedList">
      {items.map((value, index) => (
        <SortableItem
          key={value}
          index={index}
          value={value}
          rank={index + 1}
          handleRemoveItem={() => handleRemoveItem(index)}
          handleSelect={() => handleSelect(index)}
          selected={selectedItems.includes(value)}
          allowRanking={allowRanking}
        />
      ))}
    </div>
  );
});

export default class TileBoard extends Component {
  state = {
    items: getArtists(festivals.map(festival => festival.name)),
    bestMatch: '',
    festivalScores: [],
    selectedItems: [],
    selectedFestivals: festivals.map(festival => festival.name),
    festivalOptions: festivals.map(festival => festival.name),
    filtered: false,
    showFestivals: false
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
      return {items: prevState.selectedItems, filtered: true, selectedItems: []}
    })
  }

  handleFilterBands = (e) => {
    this.setState({items: getArtists(festivals.map(festival => festival.name)).filter(item => item.includes(e.target.value))});
  }


  render() {
    return (
      <div className="myFrame">
        {this.state.showFestivals && <FestivalOptions
          options={this.state.festivalOptions}
          selected={this.state.selectedFestivals}
          handleClick={this.handleFestivalCheck}
        />}
        <input className="effect-16" type="text" placeholder="Like and rank bands" contentEditable={false}/>
        <div className="columns">
          <div className="artistList">
            <button onClick={this.onlySelected}>Show liked</button>
            <button onClick={this.calculateBestFestival} disabled={!this.state.filtered}>Find my festival</button>
            <div className="col-3 input-effect">
              <input className="effect-16" type="text" placeholder="" onChange={this.handleFilterBands}/>
              <label>Search for a band..</label>
              <span className="focus-border"/>
            </div>
          <SortableList
            items={this.state.items}
            selectedItems={this.state.selectedItems}
            onSortEnd={this.onSortEnd}
            handleRemoveItem={this.handleRemoveItem}
            handleSelect={this.handleSelect}
            allowRanking={this.state.filtered}
            />
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
