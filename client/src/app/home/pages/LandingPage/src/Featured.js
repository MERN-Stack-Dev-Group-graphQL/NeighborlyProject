import React from 'react';
import { Slide } from 'react-slideshow-image';
import canoe from './canoe.jpg';
import glasses from './AR1.jpg';
import carpetcleaner from './carpetcleaner.jpg';
import carpenter from './carpenter.jpg';

const slideImages = [
];

function Featured() {
    return(
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
                {/* music, sports, kitchen, modern tech,  */}
                <img src={canoe} className="App-canoe" alt="canoe"></img>
                <img src={glasses} className="App-glasses" alt="glasses" />
                <img src={carpetcleaner} className="App-carpetcleaner" alt="carpetcleaner" />
                <img src={carpenter} className="App-carpenter" alt="carpenter" />

                <div className="Featured-list" style={{display: "inline-block"}}>
                <h5>Filter Results</h5>
                    <form action="/action_page.php">
                        <input type="checkbox" id="filter1" name="filter1" value="Bike"></input>
                        <label for="filter1"> Owner</label><br></br>
                        <input type="checkbox" id="filter2" name="filter2" value="Bike"></input>
                        <label for="filter2"> Geographic Location</label><br></br>
                        <input type="checkbox" id="filter3" name="filter3" value="Bike"></input>
                        <label for="filter3"> Distance or radius</label><br></br>
                        <input type="checkbox" id="filter4" name="filter4" value="Bike"></input>
                        <label for="filter4"> Customer Ratings</label><br></br>
                        <input type="checkbox" id="filter5" name="filter5" value="Bike"></input>
                        <label for="filter5"> Brand</label><br></br>
                        <input type="checkbox" id="filter6" name="filter6" value="Bike"></input>
                        <label for="filter6"> Category</label><br></br>
                    </form>
                <div>
                    <ul>
                        {/* <h1>Filter Here</h1>
                        <li>Owner</li>
                        <li>Geographic Location</li>
                        <li>Distance or radius</li>
                        <li>Customer Ratings</li>
                        <li>Brand</li>
                        <li>Category</li> */}
                    </ul>
                </div>
            </div>
        </div>
        </div>
    )
}

export default Featured