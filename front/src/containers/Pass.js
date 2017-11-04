import { connect } from 'react-redux'
import PassList from '../components/PassList'

const getCurrentPasses = (passes, nextRegion) => {
  return passes;
}

const mapStateToProps = (state) => ({
  passes: getCurrentPasses(state.passes, state.nextRegion)
})

const mapDispatchToProps = {
}

const Pass = connect(
  mapStateToProps,
  mapDispatchToProps
)(PassList)

export default Pass
