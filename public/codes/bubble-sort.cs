using System;

public static class SortingAlgo
{
    public static int[] BubbleSort(int[] array)
    {
        int arrayLength = array.Length;
        // Loop through the array.
        for (int i = 0; i < arrayLength; i++)
        {
            // Loop through the array again.
            for (int j = 0; j < arrayLength - i - 1; j++)
            {
                // If the current value is greater than the next value, swap them.
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
}

public class Program
{
    public static void Main()
    {
        int[] array = { 2, 5, 8, 1, 4, 3, 7, 6 };
        int[] sortedArray = SortingAlgo.BubbleSort(array);
        foreach (int val in sortedArray)
        {
            Console.WriteLine(val);
        }
    }
}
