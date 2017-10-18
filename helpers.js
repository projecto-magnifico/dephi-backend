const nullArray = n => {
  let res = [];
  for (let i = 0; i < n; i++) {
    res.push(0);
  }
  return res;
}

const arrSieve = (array, indexArray) => {

  var arr = [];

  for (var i = 0; i < array.length; i++) {
    if (indexArray[i] === 1) arr.push(array[i]);

  }
  return arr;
}

const decimalToBinary = n => {

  var result = [];

  if (n > 0) {

    while (n !== 0) {
      var digit = n % 2;
      result.unshift(digit);
      n = Math.floor(n / 2);
    }
  } else return [0];

  return result;
}


const getSets = arr => {

  let finalResult = [];
  let n = arr.length;

  let maxLength = Math.pow(2, n) - 1;

  let count = 0;

  while (count !== maxLength + 1) {

    let currentIndexArray = decimalToBinary(count);
    let filledArray = zeroFiller(currentIndexArray, arr);
    let currentItem = arrSieve(arr, filledArray);
    finalResult.push(currentItem);
    count++;
  }
  return finalResult;
}

const zeroFiller = (arr1, arr2) => {

  let m = arr1.length;
  let n = arr2.length;
  let zeroArray = [];

  if (m < n) zeroArray = nullArray(n - m);
  else zeroArray = [];

  return zeroArray.concat(arr1);
}


module.exports = {
  arrSieve,
  decimalToBinary,
  getSets,
  zeroFiller,
  nullArray
}