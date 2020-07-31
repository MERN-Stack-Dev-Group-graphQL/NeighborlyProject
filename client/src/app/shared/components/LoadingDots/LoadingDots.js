import React from 'react';
import {One, Two, Three} from './styles';

function LoadingDots(){
    return (
        <h1>Loading
            <One className="one">.</One>
            <Two className="two">.</Two>
            <Three className="three">.</Three>
        </h1>
    )
}
export default LoadingDots;