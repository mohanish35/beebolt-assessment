import { findEuclideanDistance } from '../utils.js'

export const parsePackages = (packages) => {
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

export const assignClusterToPackages = (centroids, resolvedPackages) => {
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

export const updateCentroids = (centroids, packages) => {
  const oldClusterConfiguration = packages.map(pkg => pkg.cluster)

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

  const newClusterConfiguration = packages.map(pkg => pkg.cluster)
  
  centroids.foundOptimalCentroids = oldClusterConfiguration.every((value, index) => value === newClusterConfiguration[index])

  return centroids
}

export const formatAndPrintOutput = (packages, coordinates) => {
  packages = packages.map(pkg => {
    pkg['cluster (x1)'] = coordinates[pkg.cluster][0]
    pkg['cluster (x2)'] = coordinates[pkg.cluster][1]
    pkg['cluster (y1)'] = coordinates[pkg.cluster][2]
    pkg['cluster (y2)'] = coordinates[pkg.cluster][3]

    return pkg
  })

  console.table(packages)
}