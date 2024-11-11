function findAvalibleTime(meetingList, startTime, endTime, minDuration) {
    if (meetingList.length === 0) return [];
    const result = [];
    meetingList.sort((a, b) => a[0] - b[0]);
    let currStart = startTime;
    for (const slot of meetingList) {
        const [meetingStart, meetingEnd] = slot;
        if (meetingStart >= currStart) {
            if (meetingStart - currStart >= minDuration) {
                result.push([currStart, meetingStart]);
            }
            currStart = meetingEnd;;
        } else if (currStart >= endTime) {
            break;
        }
    }
    if (currStart < endTime || endTime - currStart >= minDuration) {
        result.push([currStart, endTime]);
    }
    return result;
}

function findAvalibleTime1(meetingList, startTime, endTime, minDuration) {
    const result = [];
    if (meetingList.length === 0) {
        return result;
    }
    
    meetingList.sort((a, b) => a[0] - b[0]);
    let currentTime = startTime;

    for (const slot of meetingList) {
        const [meetingStart, meetingEnd] = slot;
        if (meetingStart >= currentTime) {
            if (meetingStart - currentTime >= minDuration) {
                result.push([currentTime, meetingStart]);
            }
            currentTime = meetingEnd;
        } else if (meetingEnd >= endTime) {
            break;
        }
    }

    if (endTime - currentTime >= minDuration) {
        result.push([currentTime, endTime]);
    }
    return result;
}



console.log(findAvalibleTime([[-2, 0], [0,2], [3, 20], [16, 17], [19, 23], [27, 33], [30, 40]], -5, 27, 2));
console.log(findAvalibleTime1([[-2, 0], [0,2], [3, 20], [16, 17], [19, 23], [27, 33], [30, 40]], -5, 27, 2));

console.log(findAvalibleTime([[1, 5], [10, 15], [20, 25]], 0, 30, 3));
console.log(findAvalibleTime1([[1, 5], [10, 15], [20, 25]], 0, 30, 3));