function findMissingNumbers(nums) {
    const numbersAtFault = []
    for (let i = 1; i < Math.max(...nums); i++) {
      if (!nums.includes(i)) numbersAtFault.push(i)
    }
    return numbersAtFault
  }