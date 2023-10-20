fn bubble_sort(mut array: [i32; 8]) -> [i32; 8] {
    let mut swapped = true;
    while swapped {
        swapped = false;
        for i in 0..array.len() - 1 {
            if array[i] > array[i + 1] {
                array.swap(i, i + 1);
                swapped = true;
            }
        }
    }
    array
}

fn main() {
    let array = [2, 5, 8, 1, 4, 3, 7, 6];
    let sorted_array = bubble_sort(array);
    println!("{:?}", sorted_array);
}
