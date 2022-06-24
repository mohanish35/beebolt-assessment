import { assignClusterToPackages, updateCentroids, parsePackages, formatAndPrintOutput } from './utils.js'
import { printIteration } from '../utils.js'

export const assignPackages = (packages, drivers) => {
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
