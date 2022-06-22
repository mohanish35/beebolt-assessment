const { printIteration } = require('../utils')
const { getRandomPackages, getHardCodedPackages } = require('../__tests__')
const { assignClusterToPackages, updateCentroids, parsePackages, formatAndPrintOutput } = require('./utils')

function assignPackages (packages, drivers) {
  let parsedPackages = parsePackages(packages)
  let centroids = {
    coordinates: parsedPackages.map(({ src, dest }) => {
      return [src, dest]
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