import _ from 'lodash'

/**
 * Calculates possible turn
 * @param {Array<Array<Number>>} field Array or rows
 * @return {{row: Number, col: Number}|null} Object that holds row and col of possible turn
 */
export const calculateTurn = field => {
  const index = _.flatten(field).indexOf(0)

  return ~index ? { row: Math.floor(index / 3), col: index % 3 } : null
}
