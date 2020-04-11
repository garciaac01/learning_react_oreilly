/*
FUNCTIONAL PROGRAMMING
*/
//old function syntax
var log = function (message) {
    console.log(message);
};

log("In JavaScript functions are variables.");

//new syntax
const log = message => console.log(message);


//adding a function to an object
const obj = {
    message: "In JavaScript functions are variables.",
    log(message) {
        console.log(message);
    }
}

obj.log(obj.message);

// adding a function to an array
const messages = [
    "They can be inserted into arrays",
    message => console.log(message),
    "like variables",
    message => console.log(message)
]

//can send to other functions like arguments
const insideFn = logger => {
    logger("They can be sent to other functions as arguments");
}

insideFn(message => console.log(message));

//can be returned from other functions like variables
var createScream = function (logger) {
    return function (message) {
        logger(message.toUpperCase() + "!!!");
    }
}

const scream = createScream(message => console.log(message));

scream('functions can be returned from other functions');
//FUNCTIONS CAN BE RETURNED FROM OTHER FUNCTIONS!!!

// last example in es6
const createScream = logger => message => logger(message.toUpperCase() + '!!!');

// functions that take or return other functions are
// called higher order functions


/*************
 * IMPERATIVE VS DECLARATIVE
 */

//Example: Making a string url friendly
// Imperative:
const string = "This is the midday show with Cheryl Waters";
let urlFriendly = "";

for (let i = 0; i < string.length; i++) {
    if (string[i] === " ") {
        urlFriendly += "-";
    } else {
        urlFriendly += string[i];
    }
}

console.log(urlFriendly);

//Declarative
const string = "This is the mid day show with Cheryl Waters";
const urlFriendly = string.replace(/ /g, "-");
console.log(urlFriendly);


/***********
 * Functional Programming Concepts
 */

/*
Immutability
*/
// functions are passed by reference in js
// this example alters the original color object
let color_lawn = {
    title: "lawn",
    color: "#00FF00",
    rating: 0
};

function rateColor(color, rating) {
    color.rating = rating;
    return color;
}

console.log(rateColor(color_lawn, 5).rating); // 5
console.log(color_lawn.rating); // 5


// Use the "copy machine" instead to copy the object
var rateColor = function (color, rating) {
    return Object.assign({}, color, { rating: rating })
};

console.log(rateColor(color_lawn, 5).rating); // 5
console.log(color_lawn.rating); // 0

// same function using es6/es7
// this is es6 syntax using the spread operator
// to copy the object, then add rating: rating field to it
const rateColor = (color, rating) => {
    ({
        ...color,
        rating
    })
}

//es6 can do a similar task with copy and adding a new element to arrays
//array.concat is not es6--this is how we would normally create an array copy
//and add an element. But the {title} is es6.
let list = [
    { title: "Red" },
    { title: "Green" }
]

const addColor = (title, array) => array.concat({ title })

/*
pure vs impure functions
pure functions return a value and do not cause side effects,
such as setting global vars or changing anything about the app state
*/

//impure
const selfEducate = (person) => {
    person.canRead = true;
    person.canWrite = true;
    return person
}

//pure (returns an altered copy of the arg object)
const selfEducate = person =>
    ({
        ...person,
        canRead: true,
        canWrite: true
    })

/*************
 * DATA TRANSFORMATIONS
 * Core functions: Array.map and Array.reduce
 */
const schools = [
    "Yorktown",
    "Washington & Lee",
    "Wakefield"
]

// Array function: join - returns a string
console.log(schools.join(", ")); // Yorktown, Washington & Lee, Wakefield

// Array function: filter - creates a new array
const wSchools = schools.filter(school => school[0] === "W"); // ["Washington & Lee", "Wakefield"]

// Array function: map - takes a function as its arg, returns a new array
const highSchools = schools.map(school => `${school} High School`);

console.log(highSchools.join("\n"));
// Yorktown High School
// Washington & Lee High School
// Wakefield High School

//returning an array of objects instead of strings
const highSchools = schools.map(school => ({ name: school }));

console.log(highSchools);
// [
// { name: "Yorktown" },
// { name: "Washington & Lee" },
// { name: "Wakefield"}
// ]

/*
reduce and reduce right
*/
//finding the maximum number in an array
const ages = [21, 18, 42, 40, 64, 63, 34];

const maxAge = ages.reduce((max, age) => {
    console.log(`${age} > ${max} = ${age > max}`);
    if (age > max) {
        return age;
    } else {
        return max;
    }
}, 0);

console.log('maxAge', maxAge);

//find max of an array--even shorter
const max = ages.reduce(
    (max, value) => (value > max) ? value : max,
    0
);

// remove dupes from array
const colors = ["red", "red", "green", "blue", "green"];

const distinctColors = colors.reduce(
    (distinct, color) =>
        (distinct.indexOf(color) !== -1) ?
            distinct :
            [...distinct, color],
    []
);

console.log(distinctColors); // ["red", "green", "blue"]

/*****
 * Higher-Order Functions
 */
const invokeIf = (condition, fnTrue, fnFalse) =>
    (condition) ? fnTrue() : fnFalse();

const showWelcome = () => console.log("Welcome!!!");

const showUnauthorized = () => console.log("Unauthorized!!!");

invokeIf(true, showWelcome, showUnauthorized); // "Welcome!!!"
invokeIf(false, showWelcome, showUnauthorized); // "Unauthorized!!!"


// currying -- holding on to some info until the rest of the needed info can be supplied

// this function is not the important part
const getFakeMembers = count => new Promise((resolves, rejects) => {
    const api = `https://api.randomuser.me/?nat=US&results=${count}`;
    const request = new XMLHttpRequest();
    request.open("GET", api);
    request.onload = () =>
        (request.status === 200) ?
            resolves(JSON.parse(request.response).results) :
            rejects(Error(request.statusText))
    request.onerror = (err) => rejects(err)
    request.send()
});

// from here on down is the important part of currying
const userLogs = userName => message => console.log(`${userName} -> ${message}`);

const log = userLogs("grandpa23"); // turns log into a function that takes "message" and logs the statement returned from userLogs

log("attempted to load 20 fake members");
getFakeMembers(20).then(
    members => log(`successfully loaded ${members.length} members`),
    error => log("encountered an error loading members")
);


/*************
 * Recursion
 */

//countdown from 10
const countdown = (value, fn) => {
    fn(value);
    return (value > 0) ? countdown(value - 1, fn) : value;
}

countdown(10, value => console.log(value));