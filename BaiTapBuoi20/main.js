// Find the second largest number in an array
const numbers = [9, 8, 3, 5, 6, 2, 7, 9];
// Expected result: 8

function findSecondLargest(nums) {
    let max1 = nums[0];
    let max2 = nums[1];
    
    if(max2 > max1) {
        let temp = max1; 
        max1 = max2; 
        max2 = temp; 
    }

    for(let i = 2; i < nums.length; i++) {
        if(nums[i] > max1) {
            max2 = max1;
            max1 = nums[i];
        } else if (nums[i] > max2 && nums[i] !== max1) {
            max2 = nums[i];
        }
    }
    return max2;
}

console.log(`The second largest is: ${findSecondLargest(numbers)}`);

// Bài 2: Merge arrays, remove duplicates, and sort the result

const classA = [15, 2, 8, 10];
const classB = [8, 11, 2, 5, 9];

const mergedClass = [...classA, ...classB];

function removeDuplicates(arr) {
    const seen = {};
    const result = [];

    for(let i = 0; i < arr.length; i++) {
        if(seen[arr[i]] === undefined) {
            seen[arr[i]] = true;
            result.push(arr[i]);
        }
    }

    return result;
}

const uniqueIds = removeDuplicates(mergedClass);

function quickSort(arr) {

    if(arr.length <= 1) {
        return arr;
    }

    const mid = Math.floor(arr.length / 2);
    const pivot = arr[mid];

    const leftArr = [];
    const rightArr = [];

    for(let i = 0; i < arr.length; i++) {
        if(mid !== i) {
            if(arr[i] < pivot) {
                leftArr.push(arr[i]);
            } else {
                rightArr.push(arr[i]);
            }
        }
    }
    return [...quickSort(leftArr), pivot, ...quickSort(rightArr)];    
}

console.log(uniqueIds);
console.log(quickSort(uniqueIds)); // result


