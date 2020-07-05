import React, {useState, useEffect} from 'react';
import './LandingPage/src/App.css';
import brandLogo from '../../../assets/img/brand/brand-logo.svg';

// import logo from './LandingPage/src/Neighborly.png';
// import background from './LandingPage/src/lawnmower.jpg';
// import background from './';
import background from './LandingPage/src/miterSaw.jpg';
import Featured from './LandingPage/src/Featured.js';
import DiyA from './LandingPage/src/DiyA.js';
import DiyB from './LandingPage/src/DiyB.js';
// import { FaSearch, FaBars, FaUser, FaShoppingCart, FaBell, FaBellSlash, FaRegCopyright, FaRegArrowAltCircleUp, FaRegArrowAltCircleRight} from "react-icons/fa";
import gql from "graphql-tag";
import {useQuery} from "@apollo/react-hooks";
import Test from "./Test";

const QueryTest = gql`
    query SearchFunction($search: String!) {
      searchTools(search: $search) {
        title
        make
        model
        dimensions
        description
      }
    }
  `

function Home() {
    const [searchTerm, setSearchTerm] = React.useState("");
    console.log(searchTerm, "search term")
    const [count, setCount] = useState(0);
    const handleChange = event => {
      setSearchTerm(event.target.value);
  };
  const {loading, error, data} = useQuery(QueryTest, {
    variables: {
      search: searchTerm
    },
  });

  console.log(data, "Test data");

  return (
    <>
    <div className="App">
      {/* <Navbar></Navbar> */}
      <header className="App-landing">
        <div className="App-first-section">
          <div className="App-Body"
            style={{
              backgroundImage: 'url('+background+')',
              backgroundSize: "cover",
              // backgroundAttachment: "fixed",
              backgroundPosition: "center", 
              height: "100vh",
              width: "100vw", 
              color: "#f5f5f5"
            }}        
          >
          <div className App-first-section-contents>
            <img src={brandLogo} className="App-logo" alt="logo" />
            <p className="App-headline">Save time, money, and space when you rent from <b>your local community</b>.</p>
            <div>
              <input
                type="text"
                placeholder="Search Neighborly"
                value={searchTerm}
                onChange={handleChange}
                />
              <Test data={data} />
            </div>

            <div className="App-search-buttons">
              <button onClick={() => setCount(count + 1)}>
                Apply Filters
              </button>
              <button onClick={() => setCount(count + 1)}>
                Post a Tool
              </button>
            </div>
          </div>
        </div>

      </div>
      </header>
      <section></section>
    </div>
    <Featured></Featured>
    <DiyA></DiyA>
    <DiyB></DiyB>
    </>
  );
}

export default Home;


// function Home() {
//   return (
//     <div>
//       <div className='container'>
//         <div className='row'>
//           <div className='col-md-12'>
//             <h1>Home Page</h1>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Home;
