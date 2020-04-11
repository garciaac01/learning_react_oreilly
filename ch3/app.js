//Tips:
//1. Keep data immutable
//2. Keep functions pure -- accept at least 1 arg,
//  return data or another function
//3. User recursion over looping when possible

// Build a ticking clock. Needs to display hours,
// minutes, seconds, and time of day. Display leading zeros.
// Display should change every second

/**********
 * Imperative solution first:
 * */

// Log clock time every second
/*
setInterval(logClockTime, 1000); // built in js function that calls param function every xx ms


function logClockTime() {
    // Get time string as civilian time
    const time = getClockTime();

    //Clear the console and log the time
    console.clear();
    console.log(time);
}

function getClockTime() {
    // Get the current time
    const date = new Date();

    // Serialize the time
    let time = {
        hours: date.getHours(),
        minutes: date.getMinutes(),
        seconds: date.getSeconds(),
        ampm: "AM"
    };

    // Convert to civilian time
    if (time.hours === 12) {
        time.ampm = "PM";
    } else if (time.hours > 12) {
        time.ampm = "PM";
        time.hours -= 12;
    }

    // Prepend a 0 on the hours to make double digits
    if (time.hours < 10) {
        time.hours = "0" + time.hours;
    }

    // Prepend a 0 on the minutes to make double digits
    if (time.minutes < 10) {
        time.minutes = "0" + time.minutes;
    }

    // Prepend a 0 to the seconds to make double digits
    if (time.seconds < 10) {
        time.seconds = "0" + time.seconds;
    }

    // Format the clock time as a string "hh:mm:ss"
    return `${time.hours}:${time.minutes}:${time.seconds} ${time.ampm}`;
}
*/

/******
 * functional solution
 *
 */
const oneSecond = () => 1000;
const getCurrentTime = () => new Date();
const clear = () => console.clear();
const log = message => console.log(message);

const serializeClockTime = date => ({
    hours: date.getHours(),
    minutes: date.getMinutes(),
    seconds: date.getSeconds(),
});

const civilianHours = clockTime => ({
    ...clockTime,
    hours: (clockTime.hours > 12) ?
        clockTime.hours - 12 : clocktime.hours
});

const appendAMPM = clockTime => ({
    ...clockTime,
    ampm: (clockTime.hours >= 12) ? "PM" : "AM"
});

const display = target => time => target(time);

const formatClock = format => time =>
    format.replace("hh", time.hours)
        .replace("mm", time.minutes)
        .replace("ss", time.seconds)
        .replace("tt", time.ampm);

const prependZero = key => clockTime => ({
    ...clockTime,
    [key]: (clockTime[key] < 10) ? "0" + clockTime[key] : clockTime[key]
});

const convertToCivilianTime = clockTime =>
    compose(
        appendAMPM,
        civilianHours
    )(clockTime);

const compose = (...fns) =>
    (arg) =>
        fns.reduce(
            (composed, f) => f(composed),
            arg
        );

const doubleDigits = civilianTime =>
    compose(
        prependZero("hours"),
        prependZero("minutes"),
        prependZero("seconds")
    )(civilianTime);

const startTicking = () =>
    setInterval(
        compose(
            clear,
            getCurrentTime,
            serializeClockTime,
            convertToCivilianTime,
            doubleDigits,
            formatClock("hh:mm:ss tt"),
            display(log)
        ),
        oneSecond()
    );

startTicking();