import React from "react";
import gql from "graphql-tag";
import {useQuery} from "@apollo/react-hooks";

function Test({data}) {
    let toolRender;
    if (data) {
        toolRender = data.searchTools.map(data => <li key={data.model}>{data.title}</li>)
    }
        return (
            <div>
                <ul>
                    {toolRender}
                </ul>
            </div>
        );
}

export default Test;