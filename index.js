import { getRandomPackages, getHardCodedPackages } from './__tests__/index.js'
import { assignPackages as runAlgorithmOne } from './algorithm_1/index.js'
// import { assignPackages as runAlgorithmTwo } from './algorithm_2/index.js'

const packages = getRandomPackages
// const packages = getHardCodedPackages

const drivers = 5
runAlgorithmOne(getRandomPackages, drivers)
// runAlgorithmTwo(getRandomPackages, drivers)