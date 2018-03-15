import React from 'react'
import _ from 'lodash'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import Unit from './unit'
import DropZone from './dropZone'

class Index extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      units: [
        { id: 1337, name: 'A1', height: 5, width: 5, status: 'available' },
        { id: 1338, name: 'A2', height: 5, width: 5, status: 'available' },
        { id: 1339, name: 'A3', height: 5, width: 5, status: 'rented' },
        { id: 1340, name: 'A4', height: 5, width: 5, status: 'available' },
        { id: 1341, name: 'A5', height: 5, width: 5, status: 'movingOut' },
        { id: 1342, name: 'B1', height: 10, width: 5, status: 'available' },
        { id: 1343, name: 'B2', height: 10, width: 5, status: 'available' },
        { id: 1344, name: 'B3', height: 10, width: 5, status: 'rented' }
      ],
      statusColors: {
        available: '#139771',
        rented: '#4A6197',
        movingOut: '#97524F'
      }
    }
    this.handleUnitDrop = this.handleUnitDrop.bind(this)
  }

  handleUnitDrop (unitId, newLocation) {
    let units = _.cloneDeep(this.state.units)
    let unit = _.find(units, { id: unitId })
    unit.top = newLocation.y
    unit.left = newLocation.x
    this.setState({units})
  }

  render () {
    const { units, statusColors } = this.state
    const invisibleUnits = _.reject(units, 'top')
    const visibleUnits = _.filter(units, 'top')

    return (
      <div className='grid-x grid-margin-x grid-padding-x'>
        <div className='cell small-3' style={{ background: 'pink', minHeight: '500px' }}>
          {invisibleUnits.map(unit => <Unit {...unit} key={unit.id} color={statusColors[unit.status]} />)}
        </div>
        <DropZone onUnitDrop={this.handleUnitDrop} statusColors={statusColors} units={visibleUnits} />
      </div>
    )
  }
}

export default DragDropContext(HTML5Backend)(Index)
