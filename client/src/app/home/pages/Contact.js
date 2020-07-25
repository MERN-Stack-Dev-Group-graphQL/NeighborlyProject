import React, {Fragment, useContext, useQuery, useState, useEffect } from 'react';
import { ToolContext } from "../../../context/tool";
// import gql from 'graphql-tag';
import Block from './Block';


function Contact(){
    const {tool, tools} = useContext(ToolContext);
    console.log(tools, ` From Contact components`);

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
    )
}

export default Contact;