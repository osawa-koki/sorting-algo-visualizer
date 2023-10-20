import Data.List (partition)

main :: IO ()
main = do
  let unsorted = [2, 5, 8, 1, 4, 3, 7, 6]
  putStrLn $ show $ quicksort unsorted

quicksort :: Ord a => [a] -> [a]
quicksort []     = []
quicksort (x:xs) = let (lesser, greater) = partition (<= x) xs
                   in quicksort lesser ++ [x] ++ quicksort greater
