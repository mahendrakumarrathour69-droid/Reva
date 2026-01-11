console.log('aman jainanannanx');
var x = 'aman jain ';
var A = 19;
console.log('aaaa', typeof A);
z = 'noo';
console.log('x', x);
console.log('override', z);
console.log('A', A);
var j = {jain: 'aman', jaiiin: 'jain'};
console.log('typeof j', typeof j);
console.log('j', j);
var a = 10 + '5'; // bug
console.log('a', a);
var c = 'aman' + 'jain';
console.log('c', c);
var d = 99997;
console.log('d', typeof d);
var e = true + true;
console.log('e', e);
var i = null;
console.log('i', i);
console.log('i', typeof i);
// 2nd bug object
var js;
console.log('js', js);
var k = 'amamam999999';
console.log('k', isNaN(k));
console.log(9 + 10);
var qq = 5;
var kk = 5;
console.log('comapre', qq == kk);
console.log(`comapre: ${qq == kk}`);
var jjk = 6;
var kkl = --jjk;
console.log('jjk', jjk);
console.log('kkl', kkl);
var qq = 10;
var ww = 10;
console.log('compariosn', qq == ww && qq === ww);
var ll = ' Anman    ';
var kkd = 'amjjd';
console.log('string ', ll + '  ' + kkd);
var aaa = 10;
var bbb = 20;
// swap  value using third varibale
// var ccc = bbb; // ccc==20
// var bbb = aaa;

// var aaa = ccc;
// console.log('aaa,bbb', aaa, bbb);
// swap using wothout third varible
aaa = aaa + bbb; //10+20 =30
bbb = aaa - bbb; //30-20 =10
aaa = aaa - bbb; //30-10=20
console.log('aaa,bbb', aaa, bbb);
var num1 = 1;
var num2 = '1';
console.log('==', num1 == num2); // value are same  => true
console.log('===', num1 === num2); // value are same  => false
var year = 2021;
if (year % 4 == 0) {
  console.log('leap year');
} else {
  console.log(' not leap year');
}
var area = 'jainkjnk';
switch (area) {
  case 'aman':
    console.log('amanamanan');
    break;
  case 'jain':
    console.log('jain');
    break;

  default:
    console.log('default');
    break;
}
var number = 2;
while (number < 10) {
  console.log('num', number);
  number++;
}
do {
  console.log('num000', number);
  number++;
} while (number <= 20);
for (var number = 0; number < 30; number++) {
  console.log('for', number);
}

for (var number = 1; number <= 10; number++) {
  var tableOf = 8;
  //template literals
  console.log(`${tableOf} * ${number} = ${tableOf * number}`);
  console.log(tableOf + ' * ' + number + ' = ' + tableOf * number);
}

function sum() {
  var a = 19;
  var b = 30;
  var sum = a + b;
  console.log('sum', sum);
}
sum();
//function parameter
function totalSum(a, b) {
  var sum = a + b;
  console.log('sum', sum);
}
// function agruments
totalSum(3, 8);

// function totalSum(a, b) {
//   return (sum = a + b);
// }

var funExpr = totalSum(11, 11);
console.log('funExpr', funExpr);

var funExpr = function (a, b) {
  return (sum = a + b);
};

console.log('funExpr', funExpr(10, 100));

// default arguments
function mult(a, b = 5) {
  return a * b;
}
console.log('mult(5,3)', mult(5));
var arr = ['aman', 'deepack', 'sumit', 'aaa', 'kkk'];
console.log('arr', arr[2]);
// Traversal of an array
console.log('arr', arr[arr.length - 1]);

// for loop
for (var i = 0; i < arr.length; i++) {
  console.log('==>', arr[i]);
}

// for in loop
// only index are show
for (let elements in arr) {
  console.log('element index', elements);
}
// for of loop
// only value are show
for (let elements of arr) {
  console.log('elements  value', elements);
}

//for each

arr.forEach((v, i) => {
  console.log('v', v);
});
// search and filter
var searcArray = [
  'deepack',
  'sumit',
  'aman',
  'aaa',
  'kkk',
  'aman',
  'jain',
  'aman',
  'kaipil',
];
const prize = [100, 200, 300, 400, 500];
console.log('search', searcArray.lastIndexOf('aman9'));
console.log('aaaa', searcArray.includes('amass'));
const ages = [3, 10, 18, 20];
const checkAge = age => {
  return age > 58;
};

function myFunction() {
  console.log('find', ages.find(checkAge));
}

const animals = ['pigs', 'dogs', 'cow'];
// array ebd
const count = animals.push('bull');
const unShiftCount = animals.unshift('lion');

console.log('animals', animals);
console.log('count', count);

const dd = [1, 2, 3, 4, 6, 7];
dd.unshift(5, 0);
console.log('dd1', dd);
dd.pop();
console.log('dd2', dd);
dd.shift();
console.log('dd3', dd);
const months = ['jan', 'feb', 'march', 'aprail', 'june', 'july'];

//splice

const newMonths = months.splice(months.length, 0, 'Dec');
console.log('months====>', months);
console.log('newMonths====>', newMonths);

const indexOfMonth = months.indexOf('march');
console.log('indexOfMonth', indexOfMonth);
if (indexOfMonth != -1) {
  const updateMonth = months.splice(indexOfMonth, 1, 'March');
  console.log('months', months);
} else {
  console.log('no data found');
}
teMonth = months.splice(2, 2, 'March');

console.log('updateMonth====>', months);

let arrr = [2, 3, 4, 6, 8];
let newArr = [];
arrr.forEach((v, i) => {
  // let newArr=[]
  let multiple = 2 * v;
  if (multiple < 10) {
    console.log('no data');
  } else {
    newArr.push(multiple);
  }

  console.log('multiple', multiple);
});

console.log('newArr', newArr);

function findDuplicates(arr, len) {
  // initialize ifPresent as false
  let ifPresent = false;

  // ArrayList to store the output
  let al = new Array();

  for (let i = 0; i < len - 1; i++) {
    for (let j = i + 1; j < len; j++) {
      if (arr[i] == arr[j]) {
        console.log('arr[i]', arr[i]);
        console.log('arr[j]', arr[j]);
        // checking if element is
        // present in the ArrayList
        // or not if present then break
        if (al.includes(arr[i])) {
          //break;
        }

        // if element is not present in the
        // ArrayList then add it to ArrayList
        // and make ifPresent at true
        else {
          al.push(arr[i]);
          ifPresent = true;
        }
      }
    }
  }

  // if duplicates is present
  // then print ArrayList
  if (ifPresent == true) {
    console.log('al', al);
  } else {
    console.log('no duplicate value');
  }
}

// Driver Code

let avc = [12, 11, 40, 12, 5, 6, 5, 12, 11];
let n = avc.length;

findDuplicates(avc, n);
const pricess = [200, 300, 400, , 500, 600];
//  Q1 pricess>400

// const findElement = pricess.find((v, i) => {
//   return v < 300;
// });
// console.log('findElement', findElement);

const findElent = pricess.filter((v, i) => {
  return v > 300;
});
console.log('findElent', findElent);

// how to sort an array
const monthsx = ['March', 'Jan', 'Dec', 'Nov', 'July'];
const array1 = [1, 20, 102, 90, 76];
console.log('array1.sort()', array1.sort());
console.log('monthsx.sort()', monthsx.sort());

const array2 = [1, 4, 9, 16, 25];
//num > 9

let newMapArray = array2.map((v, i) => {
  return v > 9;
});
console.log('newMapArray', newMapArray);

let arg = [25, 36, 49, 64, 81];
let arrReq = arg.map((v, i) => {
  return Math.sqrt(v);
});
console.log('arrReq', arrReq);
// chaning method
let hh = [2, 3, 4, 6, 8];
// mult * 2 and return value>10
let hh2 = hh
  .map((v, i) => {
    return v * 2;
  })
  .filter((vs, ii) => {
    return vs > 10;
  });
console.log('hh2', hh2);
// reduce method

let ggg = [5, 6, , 2];
let sudm = ggg.reduce((acum, v, i) => {
  return (acum += v);
}, 20);
console.log('sudm', sudm);
let kxx = [
  ['ss', 'ff'],
  ['ss', 'ff', ['aa', 'dcjcdjb']],
];
let flatrr = kxx.reduce((acc, vvv, ii) => {
  return acc.concat(vvv);
});
console.log('flatrr', flatrr);

let afs = 'aman jain';
console.log('afs.length', afs.length);
// Escape character
let jja = 'my name is "Aman" jain';
let s = 'my name is "Aman" jain';
console.log('jja', jja);
// finding a string  ina a string
const mu = 'i am the amna gupta';
// console.log('muBIodat.indexOf', muBIodat.indexOf('z', 3));
// return -1
let resMu = mu.search('the');
console.log('resMu', resMu);
//return -1
// Extracting string parts
//slice method
var str = 'apple,banana,kiwi, manfo';
let restr = str.slice(6, -2);
console.log('restr', restr);
let aaas = 'i am a virat kholi . I love cricket';
let myActual = aaas.slice(0, 9);
console.log('myActual', myActual);
let ssss = aaas.substring(8, -3);
console.log('ssss', ssss);
let kkdk = aaas.substr(0, 4);
console.log('kkdk', kkdk);
// replace string
// EXtracting string character
//charAt(position)
//charCodeAt(position)
let sstr = 'aman jain';
let resSStr = sstr.charAt(0);
let resSStrd = sstr.charCodeAt(0);
console.log('resSStr', resSStr);
console.log('resSStrd', resSStrd);
let lastChar = sstr.length - 1;
console.log('lastChar', sstr.charCodeAt(lastChar));
console.log('sstr', sstr[0]);
let bioDataa = {
  name: {
    firstName: 'amam',
    lastName: 'jain',
  },
  age: 34,
  getData: function () {
    console.log('first', bioDataa.name);
  },
};
console.log('bioDataa', bioDataa.name.firstName);

// spread operator
let arr2s = ['red ', 'blue'];
let arr3s = ['red ', 'black', 'green'];
let myFav = [...arr3s, 'blue'];
console.log('myFav', myFav);
