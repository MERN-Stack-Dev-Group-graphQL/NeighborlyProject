import React, {Fragment, useContext, useState, useEffect} from 'react'
import { useQuery } from '@apollo/react-hooks'
import {ToolContext} from '../../../context/tool';
import gql from 'graphql-tag'

const GET_TOOLS = gql`
    query {
        getTools {
        edges {
            _id
            title
            make
            model
            color
            dimensions
            weight
            description
            electricalRatings
            createdAt
            }
        }
    }
`;


const Block = (props) =>{
    // const [toolData, setToolData] = useState{tools}
    const {tool, tools, updateSingleTool, updateTools } = useContext(ToolContext);
    
    const { loading, data } = useQuery(GET_TOOLS);
    // const newData = data.getTools.edges;
    console.log(data, ` Console from Block.js Component`);

    const handleClick = () => {
        updateTools(data);
    }

    return (
        <div>
            <button onClick={handleClick}>Click</button>
        </div>
    )
};

export default Block;