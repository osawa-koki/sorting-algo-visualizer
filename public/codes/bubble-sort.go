package main

import "fmt"

func bubbleSort(array []int) []int {
	arrayLength := len(array)
	// Loop through the array.
	for i := 0; i < arrayLength; i++ {
		// Loop through the array again.
		for j := 0; j < arrayLength-i-1; j++ {
			// If the current value is greater than the next value, swap them.
			if array[j] > array[j+1] {
				tempVal := array[j]
				array[j] = array[j+1]
				array[j+1] = tempVal
			}
		}
	}
	return array
}

func main() {
	array := []int{2, 5, 8, 1, 4, 3, 7, 6}
	sortedArray := bubbleSort(array)
	fmt.Println(sortedArray)
}
