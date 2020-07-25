import React from 'react';
import '../../../assets/scss/components/loading-dots.scss';

function LoadingDots(){
    return (
        <h1>Loading
            <span className="one">.</span>
            <span className="two">.</span>
            <span className="three">.</span>
        </h1>
    )
}
export default LoadingDots;