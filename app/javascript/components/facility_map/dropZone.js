import React from 'react'
import PropTypes from 'prop-types'
import { ItemTypes } from './constants'
import { DropTarget } from 'react-dnd'
import Unit from './unit'

const dropZoneTarget = {
  drop (props, monitor, component) {
    const unit = monitor.getItem()
    const unitOffset = monitor.getSourceClientOffset()
    component.handleUnitDrop(unit, unitOffset)
  }
}

function collect (connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  }
}

class DropZone extends React.Component {
  handleUnitDrop (unit, unitOffset) {
    const dropZoneOffset = this.node.getBoundingClientRect()
    const unitX = unitOffset.x - (unit.width / 2)
    const unitY = unitOffset.y - (unit.height / 2)
    const newLocation = {
      x: (unitX - dropZoneOffset.x),
      y: (unitY - dropZoneOffset.y)
    }
    this.props.onUnitDrop(unit.id, newLocation)
  }

  render () {
    const { connectDropTarget, isOver, statusColors, units } = this.props
    const styles = {
      position: 'relative',
      borderWidth: 2,
      borderColor: (isOver ? 'green' : 'purple'),
      borderStyle: 'solid',
      height: '500px'
    }

    return connectDropTarget(
      <div className='cell small-9' ref={node => this.node = node} style={styles}>
        {units.map(unit => <Unit {...unit} key={unit.id} color={statusColors[unit.status]} />)}
      </div>
    )
  }
}

DropZone.propTypes = {
  connectDropTarget: PropTypes.func.isRequired,
  isOver: PropTypes.bool.isRequired,
  statusColors: PropTypes.object.isRequired,
  units: PropTypes.array,
}

export default DropTarget(ItemTypes.UNIT, dropZoneTarget, collect)(DropZone)
