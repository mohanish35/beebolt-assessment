const getRandomCoordinate = () => {
  return (Math.random() * 90) + (-1 * ((Math.random() * 90)))
}

const getRandomPackages = Array.from({length: 100}, (_, idx) => {
  return {
    name: `package_${idx}`,
    src: [getRandomCoordinate(), getRandomCoordinate()],
    dest: [getRandomCoordinate(), getRandomCoordinate()]
  }
});

const getHardCodedPackages = [{
  name: "package_1",
  src: [12, 32],
  dest: [54, 12]
}, {
  name: "package_2",
  src: [23, 62],
  dest: [63, 14]
}, {
  name: "package_3",
  src: [61, 87],
  dest: [23, 16]
}, {
  name: "package_4",
  src: [9, 1],
  dest: [2, 42]
}, {
  name: "package_5",
  src: [23, 62],
  dest: [32, 73]
}, {
  name: "package_6",
  src: [90, 21],
  dest: [91, 52]
}, {
  name: "package_7",
  src: [34, 51],
  dest: [45, 12]
}, {
  name: "package_8",
  src: [34, 51],
  dest: [45, 13]
}, {
  name: "package_9",
  src: [34, 51],
  dest: [45, 12]
}, {
  name: "package_10",
  src: [34, 51],
  dest: [45, 15]
}]

module.exports = {
  getRandomPackages,
  getHardCodedPackages
}