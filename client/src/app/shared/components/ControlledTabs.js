import React, { useState } from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import WriteReview from './reviews/WriteReview';
import StampedReviews from './reviews/StampedReviews';

function ControlledTabs(props) {
  const [key, setKey] = useState('specifications');

  return (
    <Tabs id='controlled-tab-example' activeKey={key} onSelect={(k) => setKey(k)}>
      <Tab eventKey='specifications' title='Specifications'>
        <h5>Tool Highlights</h5>
        <ul className='other-details'>
          <li className='make'>
            <span>Make: </span>
            {props.make}
          </li>
          <li className='model'>
            <span>Model: </span>
            {props.model}
          </li>
          <li className='color'>
            <span>Color: </span>
            {props.color}
          </li>
          <li className='dimensions'>
            <span>Dimensions: </span>
            {props.dimensions}
          </li>
          <li className='weight'>
            <span>Weight: </span>
            {props.weight}
          </li>
          <li className='weight'>
            <span>Electrical Ratings: </span>
            {props.electricalRatings}
          </li>
        </ul>
      </Tab>
      <Tab eventKey='includes' title='Includes'>
        <h5>Operator Manual</h5>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid, nulla harum. Recusandae omnis veniam libero, temporibus ipsam
          minima. Nemo quia explicabo, suscipit eveniet ullam aliquam earum praesentium hic odio adipisci!
        </p>
      </Tab>
      <Tab eventKey='reviews' title='Reviews'>
        <h5>Customer reviews & ratings</h5>
        <WriteReview />
        <hr />
        <StampedReviews />
      </Tab>
      <Tab eventKey='support' title='Support'>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid, nulla harum. Recusandae omnis veniam libero, temporibus ipsam
          minima. Nemo quia explicabo, suscipit eveniet ullam aliquam earum praesentium hic odio adipisci!
        </p>
      </Tab>
    </Tabs>
  );
}

export default ControlledTabs;
