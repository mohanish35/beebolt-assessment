const { getRandomPackages, getHardCodedPackages } = require('../__tests__')
const { assignClusterToPackages, updateCentroids, parsePackages, formatAndPrintOutput } = require('./utils')
const { printIteration } = require('../utils')

function assignPackages (packages, drivers) {
  let parsedPackages = parsePackages(packages)
  let centroids = {
    coordinates: parsedPackages.map(({ x1, x2, y1, y2 }) => {
      return [x1, x2, y1, y2]
    }).slice(0, drivers),
    foundOptimalCentroids: false
  }
  
  parsedPackages = assignClusterToPackages(centroids.coordinates, parsedPackages)
  
  let iterations = 0
  printIteration(centroids.coordinates, iterations++)

  while (!centroids.foundOptimalCentroids) {
    centroids = updateCentroids(centroids, parsedPackages)
    printIteration(centroids.coordinates, iterations++)
  }

  formatAndPrintOutput(parsedPackages, centroids.coordinates)
}

const packages = getRandomPackages
// const packages = getHardCodedPackages

const drivers = 5

assignPackages(packages, drivers)