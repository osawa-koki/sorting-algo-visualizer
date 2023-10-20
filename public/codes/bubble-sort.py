from typing import List

def bubbleSort(array: List[int]) -> List[int]:
    arrayLength: int = len(array)
    # Loop through the array.
    for i in range(arrayLength):
        # Loop through the array again.
        for j in range(arrayLength - i - 1):
            # Swap if the element found is greater than the next element.
            if array[j] > array[j + 1]:
                tempVal = array[j]
                array[j] = array[j + 1]
                array[j + 1] = tempVal
    return array
