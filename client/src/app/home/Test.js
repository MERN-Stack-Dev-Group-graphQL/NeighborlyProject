import React, { useState, useEffect } from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

function Test({data}){
    let toolRender;
    if(data){
        toolRender = data.searchTools.map(data=><li key={data.model}>{data.title}</li>) 
    }
    return (
    <ul>
        {toolRender}
    </ul>
    )
}

export default Test;