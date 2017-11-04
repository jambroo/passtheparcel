const passes = (state = [], action) => {
  switch (action.type) {
    case 'RECEIVE_NODE_STATE':
      return [
        ...state,
        {
          node: action.node,
          time: action.time
        }
      ]
    case 'REQUEST_NODE_STATE':
      console.log("Requesting", action.node)
      return state;
    default:
      return state
  }
}

export default passes
