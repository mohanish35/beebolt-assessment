import inquirer from 'inquirer'

import { getRandomPackages, getHardCodedPackages } from './__tests__/index.js'
import { assignPackages as runAlgorithmOne } from './algorithm_1/index.js'
import { assignPackages as runAlgorithmTwo } from './algorithm_2/index.js'
import { prompts } from './constants.js'

inquirer
  .prompt([
    {
      type: 'list',
      name: 'algorithmType',
      message: 'Choose an algorithm',
      choices: [
        prompts.algorithms.one,
        prompts.algorithms.two
      ],
    }, {
      type: 'list',
      name: 'testType',
      message: 'Choose a test input',
      choices: [
        prompts.tests.random,
        prompts.tests.hardcoded
      ],
    }, {
      type: 'number',
      name: 'drivers',
      message: 'Enter the number of drivers (>1)',
      default: 5
    }
  ])
  .then((answers) => {
    const { algorithmType, testType } = answers
    const drivers = 5
    let packages

    switch (testType) {
      case prompts.tests.random:
        packages = getRandomPackages
        break
      case prompts.tests.hardcoded:
        packages = getHardCodedPackages
    }

    switch (algorithmType) {
      case prompts.algorithms.one:
        runAlgorithmOne(packages, drivers)
        break
      case prompts.algorithms.two:
        runAlgorithmTwo(packages, drivers)
    }
  })
  .catch((error) => {
    if (error.isTtyError) {
      console.error("Prompt couldn't be rendered in the current environment")
    } else {
      console.error("Something went wrong", error)
    }
  });