// --------------------------------------------------------------------------
// -- arrayTransformations.js
// -- initial author: Renick Bell (renick@gmail.com)
// -- initial creation date: Wed Jun 28 10:08:48 AM CST 2023
// -- contributors: Yiler Huang (yiler7777@gmail.com); Steve Wang (stevesg168@gmail.com)
// -- license: GPL 3.0
// --------------------------------------------------------------------------

const R = require('ramda');
//requiring it locally:
const buildArray = require('./dataToArray.js').buildArray;

//Takes the length the array should be changed into as argument. If array longer, will shorten array. If array shorter will loop the array until desiredLength:
//Generated with Chatgpt:
function adjustArrayLength(number, array) {
    let arrayLength = array.length;
    if (arrayLength === number) {
        return array;
    } else if (arrayLength < number) {
        let numCopies = Math.ceil(number / arrayLength);
        return array.concat(...Array(numCopies).fill(array)).slice(0, number);
    } else {
        return array.slice(0, number);
    }
}

//Set a size of the array and the array will be expanded or shrunk to fix that size. To expand it will just loop the array:
function resizeArray(number, array) {
    let arrayLength = array.length;
    if (arrayLength >= number) {
        return array.slice(0, number);
    }
    let repetitions = Math.ceil(number / arrayLength);
    let expandedArray = new Array(repetitions).fill(array).flat();
    return expandedArray.slice(0, number);
}

function safeSplice(inputArray, amountToRemove, indexToRemove, replaceWith) {
    let array1 = inputArray.slice(0, indexToRemove);
    if (replaceWith != undefined) {
        array1.push(replaceWith);
    }
    let array2 = inputArray.slice(indexToRemove + amountToRemove, inputArray.length);
    return array1.concat(array2);
}

function removeAllInstance(arr, item) {
    return arr.filter((f) => f !== item);
}

function removeFirstInstance(arr, item){
    const index = arr.indexOf(item);
    if (index > -1){
         arr.splice(index, 1)
    }
    return arr
}

function removeAtIndex(arr, item, index){
    if (arr[index] == item){
        arr.splice(index, 1)
    }
    return arr
}

function removeMultipleItems(arr, itemsToRemove) {
    return arr.filter((x) => !itemsToRemove.includes(x));
}

function scaleToRange(inputArray, inputMin, inputMax, outputMin, outputMax) {
    // add a check to make sure that inputMin and inputMax are not exceeded by values in inputArray?
    let scale = (outputMax - outputMin) / (inputMax - inputMin);
    return inputArray.map((x) => (x - inputMin) * scale + outputMin);
}

function sum(array) {
    return array.reduce((x, acc) => x + acc, 0);
}

function scaleToSum(span, vals) {
    const inputSum = sum(vals);
    return vals.map((x) => (x * span) / inputSum);
}

function pick(inputArray) {
    return inputArray[Math.round((inputArray.length - 1) * Math.random())];
}

function pickN(n, inputArray) {
    return buildArray(n, (i) => pick(inputArray));
}

function low2HighSort(inputArray) {
    return inputArray.sort((a, b) => a - b);
}

function high2LowSort(inputArray) {
    return inputArray.sort((a, b) => b - a);
}

function takeN(inputArray, n) {
    return Array.from({ length: n }, (_, index) => inputArray[index % inputArray.length]);
}

function takeTo(targetLength, inputArray) {
  let outputSum = 0;
  const output = inputArray.reduce((acc, nextVal) => {
    if (outputSum < targetLength) {
      acc.push(nextVal);
      outputSum += nextVal;
    }
    return acc;
  }, []);
  if (outputSum > targetLength) {
    const difference = outputSum - targetLength;
    output[output.length - 1] -= difference;
  }
  return output;
}

function loopTo(targetLength, inputArray) {
    const inputSum = sum(inputArray);
    const loopN = Math.ceil(targetLength / inputSum);
    const pre = R.flatten(buildArray(loopN, (x) => inputArray));
    return takeTo(targetLength, pre);
}

//Non ramda version:
// function zip (a,b) {return a.map((x, i) => { return [x, b[i]]; })}

//randa version:
//generated by chatgpt:
function zip(a, b) {
    return R.zip(a, b);
}

// a is an array of arrays; this function concats b onto each of the arrays in a. b could be either an item or an array.
// arr1 = [[1,1,1],[2,2,2],[3,3,3]]
// arr2 = [[4,4,4],[5,5,5],[6,6,6]]
// buildZip(arr1,arr2)
// non ramda version:
// function buildZip (a,b) {return a.map((x,i) => x.concat(b[i]))}
//ramda version:
//generated by chatgpt:
function buildZip(a, b) {
    return R.zipWith(R.concat, a, b);
}

function shuffle(array) {
    return array.reduceRight(
        (acc, _, currentIndex) => {
            const randomIndex = Math.floor(Math.random() * (currentIndex + 1));
            [acc[currentIndex], acc[randomIndex]] = [acc[randomIndex], acc[currentIndex]];
            return acc;
        },
        [...array]
    );
}

function gatherBySubstring(inputArray, substringArray) {
    return inputArray.filter((x) => substringArray.some((y) => x.includes(y)));
}

function flipBooleans(arr) {
    return arr.map((a) => !a);
}

module.exports = {
    adjustArrayLength,
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
