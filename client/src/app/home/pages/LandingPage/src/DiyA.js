import React from 'react';
import bench from './images/bench.jpg';
import bench1 from './images/bench1.jpg';
import bench2 from './images/bench2.jpg';
import bench3 from './images/bench3.jpg';
import bench4 from './images/bench4.jpg';
import drill from './images/drill.jpg';
import glasses from './images/glasses.jpg';
import carpenterSquare from './images/carpentersSquare.jpg';
import carpenter from './images/carpenter.jpg';

function DiyA() {
    return (
        <div className="DiyA"
            style={{
                backgroundImage: 'url(' + bench4 + ')',
                backgroundSize: "cover",
                backgroundPosition: "center",
                // backgroundAttachment: "fixed",
                height: "100vh",
                width: "100vw",
                color: "#f5f5f5"
            }}
        >
            <div className="DiyA-headline">
                <p>DIY Garden Bench</p>
                <button><h2>LEARN HOW</h2></button>
            </div>
            <div className="DiyA-images-container">
                <p><b>TOOLS USED IN THIS PROJECT</b></p>
                <div className="DiyA-images">
                    <img src={glasses} className="App-glasses" alt="glasses" />
                    <img src={drill} className="App-drill" alt="drill" />
                    <img src={carpenterSquare} className="App-carpenterSquare" alt="carpenterSquare" />
                    <img src={carpenter} className="App-carpenter" alt="carpenter" />
                </div>
            </div>
        </div>
    )
}


export default DiyA