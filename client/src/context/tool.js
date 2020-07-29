import React, { createContext, useReducer } from 'react';

const initialState = {
  tool: null,
  tools: null,
};

const ToolContext = createContext({
  updateSingleTool: (toolData) => {},
  updateTools: (toolsData) => {},
  tool: null,
  tools: null,
});

function toolReducer(state, action) {
  switch (action.type) {
    case 'TOOLS':
      return {
        ...state,
        tools: action.payload,
      };
    case 'TOOL':
      return {
        ...state,
        tool: action.payload,
      };
    default:
      return state;
  }
}

function ToolProvider(props) {
  const [state, dispatch] = useReducer(toolReducer, initialState);
  let { tool, tools } = state;

  function updateSingleTool(tool) {
    dispatch({
      type: 'TOOL',
      payload: tool,
    });
  }

  function updateTools(tools) {
    dispatch({
      type: 'TOOLS',
      payload: tools,
    });
  }

  return <ToolContext.Provider value={{ tool, tools, updateSingleTool, updateTools }} {...props} />;
}

export { ToolContext, ToolProvider };
