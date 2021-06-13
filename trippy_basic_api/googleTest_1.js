var array = [1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 1];
var count = 0;
var result = [];
var result1 = [];

console.log("Array length:-", array.length)

const test1 = () => {

    for (let i = 0; i <= array.length - 1; i++) {
        if (array[i] == 0) {

            // console.log(array[i]);

            count++;
            result.unshift(array[i]);

        } else {
            result1.unshift(array[i]);
        }
    }
    // console.log(count);
}

test1();

console.log("Number of zeros", count);

// console.log(array.length);
// console.table(array.length);
console.log(result);
console.log(result1);


let array2 = [];
var array_a = [0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0];

console.log("Array length:-", array_a.length)

const test2 = () => {

    for (let i = 0; i <= array_a.length - 1; i++) {

        if (array_a[i] !== 0) {
            array2 = [];
        }
        // console.log(array2)

        if (array_a[i] == 0) {

            array2.unshift(array_a[i]);

            console.log(array2);

        }
        // console.log(array2);
    }
}

test2();