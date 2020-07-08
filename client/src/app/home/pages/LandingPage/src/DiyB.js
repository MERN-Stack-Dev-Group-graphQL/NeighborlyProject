import React, {useState} from 'react'
// import {Home} from './Home'
import drone from './drone.jpg';
import printer from './3DPrinter.jpg';
import camera from './camera.jpg';
import coffee2 from './coffee2.jpg';
import coffee6 from './coffee6.jpg';
// import microphone from './microphone.png';
import wheelchair from './wheelchair.jpg';
import mochaPot from './mochaPot.jpg';
import grinder from './grinder.jpg';
import birdfeeder from './birdfeeder.jpg';
import bicycle from './bicycle.jpg';
import treehouse from './treehouse.jpg';
import pumpkin from './pumpkin.jpg';
// import background from './LandingPage/src/miterSaw.jpg';
import microphone from './microphone.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleRight, faStar, faWeight } from '@fortawesome/free-solid-svg-icons';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
// import { far faStar } from '@fortawesome/free-solid-svg-icons';
// import { fas faStar } from '@fortawesome/free-solid-svg-icons';


function DiyB() {

    const [email, setEmail] = React.useState("");
    console.log(email, "input email")
    const [count, setCount] = useState(0);
    const handleChange = event => {
       setEmail(event.target.value);
    };

    
    return(
        <div className="DiyB">
            <div className="DiyB-imagesA">
                <div>            
                    <img src={printer} className="App-printer" alt="printer" />
                </div>
                <div className="DiyB-summary">
                    <h4>Ad sunt do ea cillum eu Lorem.</h4>
                    <p>Cupidatat nulla incididunt aliquip occaecat. Enim cillum tempor aliqua duis qui cupidatat veniam cupidatat velit nisi. Culpa voluptate occaecat consectetur sunt ipsum incididunt culpa. Lorem do aliquip dolore ut veniam. Ut anim consectetur anim veniam velit culpa culpa dolor minim consequat laboris nulla. Cupidatat deserunt ad duis magna consectetur et.</p>
                    <p className="DiyB-buttons"><b>More details</b><FontAwesomeIcon icon={faArrowCircleRight} /></p>
                </div>
                <div className="DiyB-images-right">            
                    <img src={camera} className="App-camera" alt="camera" />
                    <img src={coffee2} className="App-coffee" alt="coffee" />
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
            <div className="DiyB-imagesC">
                {/* <div className="imagesC-1-background"></div> */}
                    <div className="DiyB-imagesC-1-background"
                        style={{
                            backgroundImage: 'url('+microphone+')',
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            height: "500px",
                            width: "400px", 
                            color: "white",
                            // opacity: "0.8",
                            textShadow: "0.4px 0.4px black, 0.4px 0.4px black"
                        }}>
                            <FontAwesomeIcon icon={faUserCircle} className="userCircle"/>
                            <FontAwesomeIcon icon={faThumbsUp} className="thumbsUp"/>
                        <div className="DiyB-imagesC-1">
                            <h1>$35.00</h1>
                            <h5><b>per day</b></h5>
                            <div className="stars">
                                <FontAwesomeIcon icon={faStar}/>
                                <FontAwesomeIcon icon={faStar}/>
                                <FontAwesomeIcon icon={faStar}/>
                                <FontAwesomeIcon icon={faStar}/>
                                <FontAwesomeIcon icon={faStar}/>
                            </div>
                                <button><h2>RENT NOW</h2></button>
                        </div>
                    </div>
                {/* <div className="imagesC-2-background"></div> */}
                    <div className="DiyB-imagesC-2-background"
                        style={{
                            backgroundImage: 'url('+grinder+')',
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            height: "500px",
                            width: "400px", 
                            color: "white",
                            textShadow: "2px 2px black, 2px 2px black"
                        }}>
                            <FontAwesomeIcon icon={faUserCircle} className="userCircle"/>
                            <FontAwesomeIcon icon={faThumbsUp} className="thumbsUp"/>
                        <div className="DiyB-imagesC-2">
                            <h1>$35.00</h1>
                            <h5><b>per day</b></h5>
                            <div className="stars">
                                <FontAwesomeIcon icon={faStar}/>
                                <FontAwesomeIcon icon={faStar}/>
                                <FontAwesomeIcon icon={faStar}/>
                                <FontAwesomeIcon icon={faStar}/>
                                <FontAwesomeIcon icon={faStar}/>
                            </div>
                            <button><h2>RENT NOW</h2></button>
                        </div>
                </div>   

                {/* <img src={wheelchair} className="App-wheelchair" alt="wheelchair" /> */}

            </div>
            <div>
                <h1>DIY Videos</h1>
            </div>
            <div className="DiyB-imagesB">
                <iframe width="315" height="225" src="https://www.youtube.com/embed/YtnArAl617k" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                {/* <iframe width="315" height="225" src="https://www.youtube.com/embed/9dWzupkBcNU" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> */}
                <iframe width="315" height="225" src="https://www.youtube.com/embed/jSPgAV-gbfg" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                {/* <iframe width="315" height="225" src="https://www.youtube.com/embed/-enbDTnYv_E" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> */}
                <iframe width="315" height="225" src="https://www.youtube.com/embed/VDxGukSd56E" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                <iframe width="315" height="225" src="https://www.youtube.com/embed/PQ0J7MoLQW0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                {/* <img src={bicycle} className="bicycle" alt="bicycle" /> */}
                {/* <img src={birdfeeder} className="birdfeeder" alt="birdfeeder" />
                <img src={treehouse} className="treehouse" alt="birdfeeder" />
                <img src={pumpkin} className="pumpkin" alt="pumpkin" /> */}
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

