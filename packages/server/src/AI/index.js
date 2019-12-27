import _ from 'lodash'

export const calculateTurn = field => {
  const index = _.flatten(field).indexOf(0)

  return ~index ? { row: Math.floor(index / 3), col: index % 3 } : null
}
