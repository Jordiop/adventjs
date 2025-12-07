function fixPackages(packages) {
  while (packages.includes('(')) {
    let start = packages.lastIndexOf('(')
    let end = packages.indexOf(')', start)
    let reversed = packages.slice(start + 1, end).split('').reverse().join('')
    packages = packages.slice(0, start) + reversed + packages.slice(end + 1)
  }
  return packages
}

fixPackages('AB(CD(EF)GH)IJ')
