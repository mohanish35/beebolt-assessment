import { findEuclideanDistance } from '../utils.js'
import constants from '../constants.js'

export const assignClusterToPackages = (centroids, packages) => {
  for (let p_itr = 0; p_itr < packages.length; p_itr++) {
    let minimumDistanceFromCluster = Infinity

    for (let c_itr = 0; c_itr < centroids.length; c_itr++) {
      const distance = findEuclideanDistance([packages[p_itr].src, packages[p_itr].dest], centroids[c_itr])

      if (distance < minimumDistanceFromCluster) {
        minimumDistanceFromCluster = distance
        packages[p_itr].cluster = c_itr
      }
    }
  }

  return packages
}

export const updateCentroids = (centroids, packages) => {
  const oldClusterConfiguration = packages.map(pkg => pkg.cluster)

  for (let c_itr = 0; c_itr < centroids.coordinates.length; c_itr++) {
    let x_coordinate = 0
    let y_coordinate = 0
    let packagesInCluster = 0

    for (let p_itr = 0; p_itr < packages.length; p_itr++) {
      if (packages[p_itr].cluster === c_itr) {
        x_coordinate += packages[p_itr].src
        y_coordinate += packages[p_itr].dest

        packagesInCluster++
      }
    }

    x_coordinate /= packagesInCluster
    y_coordinate /= packagesInCluster

    centroids.coordinates[c_itr][0] = x_coordinate
    centroids.coordinates[c_itr][1] = y_coordinate
  }

  packages = assignClusterToPackages(centroids.coordinates, packages)

  const newClusterConfiguration = packages.map(pkg => pkg.cluster)
  
  centroids.foundOptimalCentroids = oldClusterConfiguration.every((value, index) => value === newClusterConfiguration[index])

  return centroids
}

export const formatAndPrintOutput = (pkg, coordinates) => {
  pkg = pkg.map(pkg => {
    pkg['cluster (x)'] = coordinates[pkg.cluster][0]
    pkg['cluster (y)'] = coordinates[pkg.cluster][1]

    return pkg
  })

  console.table(pkg)
}

export const parsePackages = (pkg) => {
  return pkg.map(({ name, src, dest }) => {
    return {
      name,
      src: findEuclideanDistance(constants.origin, src),
      dest: findEuclideanDistance(src, dest),
      cluster: 0
    }
  })
}