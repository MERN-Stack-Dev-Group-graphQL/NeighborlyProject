import React from 'react';
import { Slide } from 'react-slideshow-image';
import canoe from './canoe.jpg';
import ARGlasses from './AR1.jpg';
import carpetcleaner from './carpetcleaner.jpg';

const slideImages = [
];

function Featured() {
    return (
        <div className="Featured-categories">
            <h1>Featured Categories</h1>
            <div className="Featured-categories-list">
                <a>All</a>
                <a>Sports</a>
                <a>Electronic</a>
                <a>Safety Gears</a>
                <a>Kitchen</a>
                <a>Household</a>
                <a>Electrical</a>
            </div>
            <div className="Featured-content" style={{margin: 0, padding: 0}}>
                    <div>
                        <img src={canoe} className="App-canoe" alt="canoe"></img>
                        <h3 className="Featured-content-1">SPORTS</h3>
                    </div>
                    <div>
                        <img src={ARGlasses} className="App-AR1" alt="AR1" />
                        <h3 className="Featured-content-2">TECHNOLOGY</h3>
                    </div>
                    <div>
                        <img src={carpetcleaner} className="App-carpetcleaner" alt="carpetcleaner" />
                        <h3 className="Featured-content-3">HOUSEHOLD</h3>
                    </div>

                    <div className="Featured-list" style={{display: "inline-block"}}>
                        <h5>Filter Results</h5>
                            <form action="/action_page">
                                <input type="radio" id="filter1" name="filter1" value="Bike"></input>
                                <label for="filter1"> Owner</label><br></br>
                                <input type="radio" id="filter2" name="filter2" value="Bike"></input>
                                <label for="filter2"> Geographic Location</label><br></br>
                                <input type="radio" id="filter3" name="filter3" value="Bike"></input>
                                <label for="filter3"> Distance or radius</label><br></br>
                                <input type="radio" id="filter4" name="filter4" value="Bike"></input>
                                <label for="filter4"> Customer Ratings</label><br></br>
                                <input type="radio" id="filter5" name="filter5" value="Bike"></input>
                                <label for="filter5"> Brand</label><br></br>
                                <input type="radio" id="filter6" name="filter6" value="Bike"></input>
                                <label for="filter6"> Category</label><br></br>
                            </form>
                    <div>
                    </div>
                </div>
            </div>
                    <div className = "Featured-radioButtons">
                        <input type="radio" />
                        <input type="radio" />
                        <input type="radio" />
                        <input type="radio" /> 
                    </div>
        </div>
    )
}

export default Featured