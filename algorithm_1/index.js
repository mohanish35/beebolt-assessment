import { printIteration } from '../utils.js'
import { assignClusterToPackages, updateCentroids, parsePackages, formatAndPrintOutput } from './utils.js'

export const assignPackages = (packages, drivers) => {
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

// assignPackages(packages, drivers)