const findEuclideanDistance = (startCoordinates, endCoordinates) => {
  const sumOfSquares = startCoordinates.reduce((prev, _, idx) => {
    return prev + Math.pow(startCoordinates[idx] - endCoordinates[idx], 2)
  }, 0)

  return Math.sqrt(sumOfSquares)
}

const printIteration = (coordinates, iteration) => {
  console.log(`Iteration: #${iteration}`)
  console.table(coordinates)
}

module.exports = {
  findEuclideanDistance,
  printIteration
}