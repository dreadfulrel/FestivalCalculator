import React from 'react';
import PropTypes from 'prop-types';

const SelectButton = ({text, handleClick, selected}) => {
    return (
      <button
        className={"selectButton " + (selected ? "selectedBackground" : "unselectedBackground")}
        onClick={() => handleClick(text)}
      >
      {text}
    </button>
    );

}

export default SelectButton;
