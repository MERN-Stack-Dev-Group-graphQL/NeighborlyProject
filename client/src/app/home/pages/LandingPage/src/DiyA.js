import React from 'react';
import bench from './bench.jpg';
import bench2 from './bench2.jpg';
// import miterSaw from './miterSaw.jpg';
import drill from './drill.jpg';
import glasses from './glasses.jpg';
import carpenterSquare from './carpentersSquare.jpg';
import carpenter from './carpenter.jpg';


{/* <div className="Body"
style={{
  backgroundImage: 'url('+background+')',
  backgroundSize: "cover",
  // backgroundAttachment: "fixed",
  backgroundPosition: "center", 
  height: "100vh",
  width: "100vw", 
  color: "#f5f5f5"
}}        
> */}

function DiyA() {
    return(
        <div className="DiyA"
            style={{
                backgroundImage: 'url('+bench+')',
                backgroundSize: "cover",
                // backgroundAttachment: "fixed",
                backgroundPosition: "center", 
                height: "100vh",
                width: "100vw", 
                color: "#f5f5f5"
            }}
            >
        {/* background image */}
            {/* // <img src={bench} className="bench" alt="bench"/>
            <img src={bench2} className="bench2" alt="bench"/> */}
            <div className="DiyA-headline">
                <h1>DIY Garden Bench</h1>
                <button><h2>LEARN HOW</h2></button>
            </div>
            <div className="DiyA-images">
                <p><b>TOOLS USED IN THIS PROJECT</b></p>
                <img src={glasses} className="App-glasses" alt="glasses" />
                <img src={drill} className="App-drill" alt="drill" />
                <img src={carpenterSquare} className="App-carpenterSquare" alt="carpenterSquare" />
                <img src={carpenter} className="App-carpenter" alt="carpenter" />

                {/* <a href="https://placeholder.com"><img src="https://via.placeholder.com/140x140" className="App-videoA" alt="videoA" ></img></a> */}

            </div>
        </div>
    )
}


export default DiyA