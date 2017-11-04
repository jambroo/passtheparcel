import React from 'react'
import { connect } from 'react-redux'
import { requestNodeState } from '../actions'

let Start = ({ dispatch }) => {
  let input

  return (
    <div>
      <form onSubmit={e => {
        e.preventDefault()
        if (!input.value.trim()) {
          return
        }
        dispatch(requestNodeState(input.value))
        input.value = ''
      }}>
        <input ref={node => {
          input = node
        }} />
        <button type="submit">
          Start!
        </button>
      </form>
    </div>
  )
}
Start = connect()(Start)

export default Start
