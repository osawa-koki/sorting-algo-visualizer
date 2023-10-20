function bubbleSort (array: number[]): number[] {
  const arrayLength = array.length
  // Loop through the array.
  for (let i = 0; i < arrayLength; i++) {
    // Loop through the array again.
    for (let j = 0; j < arrayLength - i - 1; j++) {
      // Swap if the element found is greater than the next element.
      if (array[j] > array[j + 1]) {
        const tempVal = array[j]
        array[j] = array[j + 1]
        array[j + 1] = tempVal
      }
    }
  }
  return array
}

const array = [2, 5, 8, 1, 4, 3, 7, 6]
const sortedArray = bubbleSort(array)
console.log(sortedArray)
