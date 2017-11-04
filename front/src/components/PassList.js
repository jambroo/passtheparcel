import React from 'react'
import PropTypes from 'prop-types'

const PassList = ({ passes }) => (
  <ul>
  {passes.map(pass => {
    return <li key={pass.node+"."+pass.time}>{pass.node} {pass.time}</li>
  })}
  </ul>
)

PassList.propTypes = {
  passes: PropTypes.arrayOf(PropTypes.shape({
    node: PropTypes.string.isRequired,
    time: PropTypes.number.isRequired
  }).isRequired).isRequired
}

export default PassList
