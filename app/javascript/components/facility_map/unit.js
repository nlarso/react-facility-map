import React from 'react'
import PropTypes from 'prop-types'
import { ItemTypes } from './constants'
import { DragSource } from 'react-dnd'
import _ from 'lodash'

const unitSource = {
  beginDrag (props) {
    return { id: props.id, height: props.height, width: props.width }
  }
}

function collect (connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}

class Unit extends React.Component {
  render () {
    const { color, connectDragSource, height, isDragging, left, name, top, width } = this.props
    let styles = {
      alignItems: 'center',
      background: color,
      display: 'flex',
      height: height * 5,
      justifyContent: 'center',
      margin: 5,
      opacity: isDragging ? 0.3 : 1,
      width: width * 5
    }
    if (_.isNumber(top) && _.isNumber(left)) {
      styles.left = left
      styles.margin = 0
      styles.position = 'absolute'
      styles.top = top
    }

    return connectDragSource(
      <div style={styles}>{name}</div>
    )
  }
}

Unit.propTypes = {
  color: PropTypes.string.isRequired,
  connectDragSource: PropTypes.func.isRequired,
  height: PropTypes.number.isRequired,
  isDragging: PropTypes.bool.isRequired,
  left: PropTypes.number,
  name: PropTypes.string.isRequired,
  top: PropTypes.number,
  width: PropTypes.number.isRequired
}

export default DragSource(ItemTypes.UNIT, unitSource, collect)(Unit)
