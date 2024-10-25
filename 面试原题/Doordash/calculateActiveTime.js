function timeToMintes(timeStr) {
    let modifier = timeStr.slice(-2);
    let time = timeStr.slice(0, -2);
    let [hours, minutes] = time.split(':').map(Number);
    if (modifier === 'pm' && hours !== 12) {
        hours += 12;
    }
    if (modifier === 'am' && hours === 12) {
        hours = 0;
    }

    return hours * 60 + minutes;
}

function calculateActiveTime(inputArray) {
    let idleTime = 0;
    let totalTime = 0;
    let lastDropTime = null;
    let startTime = null;

    inputArray.forEach((item, index) => {
        const [time, action] = item.split('|').map(str => str.trim());
        const timeInMin = timeToMintes(time);
        if (index === 0) {
            startTime = timeInMin;
        }

        if (action === 'dropoff') {
            lastDropTime = timeInMin;
        }
        if (action === 'pickup' && lastDropTime !== null) {
            idleTime += timeInMin - lastDropTime;
            lastDropTime = null;
        }
        if (index === inputArray.length - 1) {
            totalTime = timeInMin - startTime;
        }
    })
    console.log(idleTime);
    return totalTime - idleTime;
}

const inputArray = [
    '8:30am | pickup',
    '9:10am | dropoff',
    '10:20am| pickup',
    '12:15pm| pickup',
    '12:45pm| dropoff',
    '2:25pm | dropoff'
];

// Calculate active time directly while parsing the input
const activeTime = calculateActiveTime(inputArray);
console.log(`Active time: ${activeTime} minutes`);
console.log(timeToMintes('12:45pm') - timeToMintes('12:15pm'))
console.log(timeToMintes('2:25pm') - timeToMintes('10:20am'))

// if its pick up, push time to stack
// if its drop off, pop from stack. if stack is empty, subtract the dropoff from the currently popped off time(pick up) and add it to res