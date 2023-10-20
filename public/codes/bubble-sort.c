#include <stdio.h>
#include <stdlib.h>

int *bubbleSort(int *array, int arrayLength)
{
  // Loop through the array.
  for (int i = 0; i < arrayLength; i++)
  {
    // Loop through the array again.
    for (int j = 0; j < arrayLength - i - 1; j++)
    {
      // Swap if the element found is greater than the next element.
      if (array[j] > array[j + 1])
      {
        int tempVal = array[j];
        array[j] = array[j + 1];
        array[j + 1] = tempVal;
      }
    }
  }
  return array;
}

int main()
{
  int array[] = {2, 5, 8, 1, 4, 3, 7, 6};
  int arrayLength = sizeof(array) / sizeof(array[0]);
  int *sortedArray = bubbleSort(array, arrayLength);
  for (int i = 0; i < arrayLength; i++)
  {
    printf("%d ", sortedArray[i]);
  }
  return 0;
}
