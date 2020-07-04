import React from 'react';
import { MdStar } from 'react-icons/md';

const Star = ({ selected = false, onClick = (f) => f }) => {
  return <MdStar className={selected ? 'star selected' : 'star'} onClick={onClick} />;
};

export default Star;
