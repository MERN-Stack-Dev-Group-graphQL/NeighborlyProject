import React, { Fragment, useContext } from 'react';
import { ToolContext } from '../../../context/tool';
import Block from './Block';

function Contact() {
  const { tool, tools } = useContext(ToolContext);
  console.log(tools);

  return (
    <Fragment>
      <div className='container'>
        <div className='row'>
          <div className='col-md-12'>
            <h1>Contact Page</h1>
            <Block />
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Contact;
