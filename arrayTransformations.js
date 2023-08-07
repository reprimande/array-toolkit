// --------------------------------------------------------------------------
// -- arrayTransformations.js
// -- initial author: Renick Bell (renick@gmail.com)
// -- initial creation date: Wed Jun 28 10:08:48 AM CST 2023
// -- contributors: Yiler Huang (yiler7777@gmail.com); Steve Wang (stevesg168@gmail.com)
// -- license: GPL 3.0
// --------------------------------------------------------------------------

//requiring it locally:
// let buildArray = require('./dataToArray.js').buildArray;

/**
  * Set a size of the array and the array will be expanded or shrunk to fix that size. To expand it will just loop the array:
  * Does the same thing as adjustArrayLength but does it differently
  * @param {number} the desired length of adjusted array
  * @param {array} the array to modify
  * @example console.log(resizeArray(5, [0,1,2])) // [0, 1, 2, 0, 1]
*/
function resizeArray(number, array) {
    let arrayLength = array.length;
    if (arrayLength >= number) {
        return array.slice(0, number);
    }
    let repetitions = Math.ceil(number / arrayLength);
    let expandedArray = new Array(repetitions).fill(array).flat();
    return expandedArray.slice(0, number);
}

/**
  * Similar to the built-in slice function but with additional arguments that decide how many items to remove in a array and what they will be replaced with.
  * @param {inputArray} the array to modify
  * @param {amountToRemove} the amount of items to remove in inputArray
  * @param {indexToRemove} which index to remove from
  * @param {replaceWith} what to replace the removed items with (optional)
*/
function safeSplice(inputArray, amountToRemove, indexToRemove, replaceWith) {
    let array1 = inputArray.slice(0, indexToRemove);
    if (replaceWith != undefined) {
        array1.push(replaceWith);
    }
    let array2 = inputArray.slice(indexToRemove + amountToRemove, inputArray.length);
    return array1.concat(array2);
}

//Remove all instances of an item in an array.
function removeAllInstance(arr, item) {
    return arr.filter((f) => f !== item);
}

//Removes an item the first time it appears.
function removeFirstInstance(arr, item){
    let index = arr.indexOf(item);
    if (index > -1){
        return this.safeSplice(arr, 1, index)
    }
    return arr
}

//Remove the item at a specific index of an array.
function removeAtIndex(arr, item, index){
    if (arr[index] == item){
         return this.safeSplice(arr, 1, index)
    }
    return arr
}

//Takes two arrays as arguments. The second array is the items to remove from the first array.
function removeMultipleItems(arr, itemsToRemove) {
    return arr.filter((x) => !itemsToRemove.includes(x));
}

//Takes an input array and scales its values from a given input range to a specified output range.
function scaleToRange(inputArray, inputMin, inputMax, outputMin, outputMax) {
    // add a check to make sure that inputMin and inputMax are not exceeded by values in inputArray?
    let scale = (outputMax - outputMin) / (inputMax - inputMin);
    return inputArray.map((x) => (x - inputMin) * scale + outputMin);
}

//Adds up all of the numbers in the array.
function sum(array) {
    return array.reduce((x, acc) => x + acc, 0);
}

//scales the elements in the "vals" array proportionally based on the desired "span".
function scaleToSum(span, vals) {
    let inputSum = this.sum(vals);
    return vals.map((x) => (x * span) / inputSum);
}

//Picks an item randomly in an array.
function pick(inputArray) {
    return inputArray[Math.round((inputArray.length - 1) * Math.random())];
}

//Picks multiple items randomly in an array.
function pickN(n, inputArray) {
    return this.buildArray(n, (i) => pick(inputArray));
}

//Sort the numbers in an array from small to big.
function low2HighSort(inputArray) {
    return inputArray.sort((a, b) => a - b);
}

//Sort the numbers in an array from big to small.
function high2LowSort(inputArray) {
    return inputArray.sort((a, b) => b - a);
}

//Takes a specific amount of items in an array. If the desired amount of items is longer than the length of the array, repeats it.
function takeN(inputArray, n) {
    return Array.from({ length: n }, (_, index) => inputArray[index % inputArray.length]);
}

//Constructs an output array by repeatedly taking elements from the inputArray until the length of the output reaches the targetLength.
function takeTo(targetLength, inputArray) {
  if (targetLength === 0){
      return [0]
  }
  let outputSum = 0;
  let output = inputArray.reduce((acc, nextVal) => {
    if (outputSum < targetLength) {
      acc.push(nextVal);
      outputSum += nextVal;
    }
    return acc;
  }, []);
  if (outputSum > targetLength) {
    let difference = outputSum - targetLength;
    output[output.length - 1] -= difference;
  }
  return output;
}

//Loops an array until its length meets the target length.
function loopTo(targetLength, inputArray) {
    let inputSum = this.sum(inputArray);
    let loopN = Math.ceil(targetLength / inputSum);
    let pre = R.flatten(buildArray(loopN, (x) => inputArray));
    return this.takeTo(targetLength, pre);
}

//Non ramda version:
// function zip (a,b) {return a.map((x, i) => { return [x, b[i]]; })}

//randa version:
//generated by chatgpt:
//Takes 2 arrays as arguments and will combine them. Will turn each index of the arrays into sub arrays and will put those of the same index into the same sub array. Will return an array with many sub arrays in it.
//Example:
    //Input: zip([0, 1, 2, 3], [6, 5, 4, 3])
    //output: [ [ 0, 6 ], [ 1, 5 ], [ 2, 4 ], [ 3, 3 ] ]
function zip(a, b) {
    return R.zip(a, b);
}

// a is an array of arrays; this function concats b onto each of the arrays in a. b could be either an item or an array.
// arr1 = [[1,1,1],[2,2,2],[3,3,3]]
// arr2 = [[4,4,4],[5,5,5],[6,6,6]]
// buildZip(arr1,arr2)
// output: [ [ 1, 1, 1, 4, 4, 4 ], [ 2, 2, 2, 5, 5, 5 ], [ 3, 3, 3, 6, 6, 6 ] ]
// non ramda version:
// function buildZip (a,b) {return a.map((x,i) => x.concat(b[i]))}
//ramda version:
//generated by chatgpt:
//Takes 2 arrays as arguments. Each item in the array has to be another array. The function will then return one array which is a combination of the two. The function combines them by combining the sub arays that have the same index.
function buildZip(a, b) {
    return R.zipWith(R.concat, a, b);
}

//Shuffle the order of items in an array.
function shuffle(array) {
    return array.reduceRight(
        (acc, _, currentIndex) => {
            let randomIndex = Math.floor(Math.random() * (currentIndex + 1));
            [acc[currentIndex], acc[randomIndex]] = [acc[randomIndex], acc[currentIndex]];
            return acc;
        },
        [...array]
    );
}

//Filters the inputArray based on whether any of the substrings in substringArray are found in each element.
function gatherBySubstring(inputArray, substringArray) {
    return inputArray.filter((x) => substringArray.some((y) => x.includes(y)));
}

//Flips a bolean. If input is true, returns false. If inputs is false, return true.
function flipBooleans(arr) {
    return arr.map((a) => !a);
}

module.exports = {
    resizeArray,
    safeSplice,
    removeAllInstance,
    removeMultipleItems,
    scaleToRange,
    scaleToSum,
    pick,
    pickN,
    low2HighSort,
    high2LowSort,
    takeN,
    takeTo,
    loopTo,
    zip,
    buildZip,
    shuffle,
    gatherBySubstring,
    flipBooleans,
    sum,
    removeFirstInstance,
    removeAtIndex
};
