import fetch from 'isomorphic-fetch'

export const REQUEST_NODE_STATE = 'REQUEST_NODE_STATE'

export const requestNodeState = (node) => {
  return {
    type: REQUEST_NODE_STATE,
    node
  }
}

export const RECEIVE_NODE_STATE = 'RECEIVE_NODE_STATE'
export const receiveNodeState = (node, state) => {
  return {
    type: RECEIVE_NODE_STATE,
    node,
    time: parseInt(state.status, 0)
  }
}

let places;

try {
  places = require('./places.json');
} catch (e) {
  console.log("ERROR: No places.json provided.");
}

const nodes = places.map((a) => {
  return a.address;
});

const nodes_friendly = places.map((a) => {
  return a.name;
});

export const fetchNodeState = (node) => {
  return function (dispatch) {
    dispatch(requestNodeState(node))
    return fetch(
      `https://${nodes[nodes_friendly.indexOf(node)]}.amazonaws.com/prod/passTheParcel?get=1`)
      .then(
        response => response.json(),
        error => console.log('An error occured.', error)
      )
      .then(json =>
        dispatch(receiveNodeState(node, json))
      )
  }
}
