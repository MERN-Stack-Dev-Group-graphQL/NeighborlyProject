import React, { useState } from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

function ControlledTabs() {
  const [key, setKey] = useState('specifications');

  return (
    <Tabs id='controlled-tab-example' activeKey={key} onSelect={(k) => setKey(k)}>
      <Tab eventKey='specifications' title='Specifications'>
        <h5>Details</h5>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid, nulla harum. Recusandae omnis veniam libero, temporibus ipsam
          minima. Nemo quia explicabo, suscipit eveniet ullam aliquam earum praesentium hic odio adipisci!
        </p>
      </Tab>
      <Tab eventKey='includes' title='Includes'>
        <h5>Operator Manual</h5>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid, nulla harum. Recusandae omnis veniam libero, temporibus ipsam
          minima. Nemo quia explicabo, suscipit eveniet ullam aliquam earum praesentium hic odio adipisci!
        </p>
      </Tab>
      <Tab eventKey='reviews' title='Reviews'>
        <p>Thank you for your purchase! Let us know what you think by posting a review. We always appreciate the feedback.</p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid, nulla harum. Recusandae omnis veniam libero, temporibus ipsam
          minima. Nemo quia explicabo, suscipit eveniet ullam aliquam earum praesentium hic odio adipisci!
        </p>
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
