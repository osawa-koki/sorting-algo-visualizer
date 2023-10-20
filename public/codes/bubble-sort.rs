fn bubble_sort(array: &mut [i32]) {
    let array_length = array.len();
    // Loop through the array.
    for i in 0..array_length {
        // Loop through the array again.
        for j in 0..array_length - i - 1 {
            // If the current value is greater than the next value, swap them.
            if array[j] > array[j + 1] {
                let temp_val = array[j];
                array[j] = array[j + 1];
                array[j + 1] = temp_val;
            }
        }
    }
}

fn main() {
    let mut array = [2, 5, 8, 1, 4, 3, 7, 6];
    bubble_sort(&mut array);
    println!("{:?}", array);
}
