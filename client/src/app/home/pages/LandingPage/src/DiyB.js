import React, {useState} from 'react'
// import {Home} from './Home'
import blender from './blender.jpg';
import drone from './drone.jpg';
import camera from './camera.jpg';
import printer from './3DPrinter.jpg';
import arduino from './arduino.jpg';
import wheelchair from './wheelchair.jpg';
import birdfeeder from './birdfeeder.jpg';
import bicycle from './bicycle.jpg';
import treehouse from './treehouse.jpg';
import pumpkin from './pumpkin.jpg';

function DiyB() {

    const [email, setEmail] = React.useState("");
    console.log(email, "input email")
    const [count, setCount] = useState(0);
    const handleChange = event => {
       setEmail(event.target.value);
    };

    // <img src={drone} className="App-drone" alt="drone" />
    // <img src={arduino} className="App-arduino" alt="arduino" />
    // <img src={wheelchair} className="App-wheelchair" alt="wheelchair" />

    return(
        <div className="DiyB">
            <div className="DiyB-imagesA">
                <div>            
                    <img src={printer} className="App-printer" alt="printer" />
                </div>
                <div className="DiyB-summary">
                    <h4>Ad sunt do ea cillum eu Lorem.</h4>
                    <p>Cupidatat nulla incididunt aliquip occaecat. Enim cillum tempor aliqua duis qui cupidatat veniam cupidatat velit nisi. Culpa voluptate occaecat consectetur sunt ipsum incididunt culpa. Lorem do aliquip dolore ut veniam. Ut anim consectetur anim veniam velit culpa culpa dolor minim consequat laboris nulla. Cupidatat deserunt ad duis magna consectetur et.</p>
                    <p className="DiyB-buttons"><b>More details</b><button>{'>'}</button></p>
                </div>
                <div className="DiyB-images-right">            
                    <img src={blender} className="App-blender" alt="blender" />
                    <img src={camera} className="App-camera" alt="camera" />
                </div>
            </div>
            <div className="DiyB-slideshow-buttons">
                <input type="radio" />
                <input type="radio" />
                <input type="radio" />
                <input type="radio" />
                <input type="radio" />
                <input type="radio" />
            </div>
            <div>
                <h1>DIY Videos</h1>
            </div>
            <div className="DiyB-imagesB">
                <img src={bicycle} className="bicycle" alt="bicycle" />
                <img src={birdfeeder} className="birdfeeder" alt="birdfeeder" />
                <img src={treehouse} className="treehouse" alt="birdfeeder" />
                <img src={pumpkin} className="pumpkin" alt="pumpkin" />
            </div>
            <div className="DiyB-mailing-list">
                <h5><b>Join our mailing list to get the latest updates.</b></h5>
                <div>
                    <input
                        type="text"
                        placeholder="Email"
                        value={email}
                        onChange={handleChange}
                    />
                        <button onClick={() => setCount(count + 1)}>
                            Submit
                        </button>
                </div>
            </div>
        </div>
    )
}

export default DiyB