# Log Sorting

## Plan

1. Get first log from all sources
2. Store it in an array in a sorted manner using binary search and splice
4. Print the first value of the object and replace it with new log of the same source again using the binary insert algo.
5. Keep doing it until all log sources are exhausted

## Implementations

### JS Sort
Using the default sorting algorithm in JavaScript.
This is pretty efficient since the current implementation of sort is based on the TimSort algorithm, which has best complexity of n and since our array is always sorted apart from one element (the element we want to insert), the realistic time complexity of this algorithm would be n.

### Loop Sort
Sine we want to insert an element in an array, it's certain that we have to do m operations where m are the number of elements in the array larger than the element we want to insert. So, we can just loop from the end of the array pushing each element to the next index if they're bigger than the element we want to insert. The worst time complexity is n and the realistic time complexity is less than n, which is definitely better than JS sort and is the best algorithm we can implement with an array data structure.

### Binary insert
But a JS array is not the theoretical array, it's actually an object (JSON) under the hood and hence inserting an element doesn't realistically take m operations. Keeping this in mind, we can use the binary search algorithm to find the index in which we want to insert the element and use splice to insert the element in that index. The binary search has a log n worst case time complexity and the insertion using splice is a constant (yes, since under the hood array is an object and splice being a native method uses pointers to insert the element effeciently, without having to move the other elements). Thus this method is the fastest method out of the three.