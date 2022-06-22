const { findEuclideanDistance } = require('../utils')

const parsePackages = (packages) => {
  return packages.map(({ name, src, dest }) => {
    return {
      name,
      x1: src[0],
      x2: src[1],
      y1: dest[0],
      y2: dest[1],
      cluster: 0
    }
  })
}

const assignClusterToPackages = (centroids, resolvedPackages) => {
  for (let p_itr = 0; p_itr < resolvedPackages.length; p_itr++) {
    let minimumDistanceFromCluster = Infinity

    for (let c_itr = 0; c_itr < centroids.length; c_itr++) {
      const { x1, x2, y1, y2 } = resolvedPackages[p_itr]
      const distance = findEuclideanDistance([x1, x2, y1, y2], centroids[c_itr])

      if (distance < minimumDistanceFromCluster) {
        minimumDistanceFromCluster = distance
        resolvedPackages[p_itr].cluster = c_itr
      }
    }
  }

  return resolvedPackages
}

const updateCentroids = (centroids, packages) => {
  const oldClusterConfiguration = packages.map(package => package.cluster)

  for (let c_itr = 0; c_itr < centroids.coordinates.length; c_itr++) {
    let x1_coordinate = 0
    let x2_coordinate = 0
    let y1_coordinate = 0
    let y2_coordinate = 0
    let packagesInCluster = 0

    for (let p_itr = 0; p_itr < packages.length; p_itr++) {
      if (packages[p_itr].cluster === c_itr) {
        x1_coordinate += packages[p_itr].x1
        x2_coordinate += packages[p_itr].x1
        y1_coordinate += packages[p_itr].y1
        y2_coordinate += packages[p_itr].y2

        packagesInCluster++
      }
    }

    x1_coordinate /= packagesInCluster
    x2_coordinate /= packagesInCluster
    y1_coordinate /= packagesInCluster
    y2_coordinate /= packagesInCluster

    centroids.coordinates[c_itr][0] = x1_coordinate
    centroids.coordinates[c_itr][1] = x2_coordinate
    centroids.coordinates[c_itr][2] = y1_coordinate
    centroids.coordinates[c_itr][3] = y2_coordinate
  }

  packages = assignClusterToPackages(centroids.coordinates, packages)

  const newClusterConfiguration = packages.map(package => package.cluster)
  
  centroids.foundOptimalCentroids = oldClusterConfiguration.every((value, index) => value === newClusterConfiguration[index])

  return centroids
}

const formatAndPrintOutput = (package, coordinates) => {
  package = package.map(package => {
    package['cluster (x1)'] = coordinates[package.cluster][0]
    package['cluster (x2)'] = coordinates[package.cluster][1]
    package['cluster (y1)'] = coordinates[package.cluster][2]
    package['cluster (y2)'] = coordinates[package.cluster][3]

    return package
  })

  console.table(package)
}

module.exports = {
  parsePackages,
  assignClusterToPackages,
  updateCentroids,
  formatAndPrintOutput
}