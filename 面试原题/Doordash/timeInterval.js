// Input - ("mon 10:00 am", mon 11:00 am)
// Output - [11005, 11010, 11015...11100]
// Output starts with 1 if the day is monday, 2 if tuesday and so on till 7 for sunday
// Append 5 min interval times to that till the end time
// So here it is 10:05 as first case, so its written as 11005 2nd is 10:10 so its written as 11010

// the numeric code for time should be in 24hour format "mon 10:05 pm" --> 12205
// when incrementing, you need to round the input time to the nearest 5th min. For eg. if start = 10:03, then output should start from 10:05

class Time {
    constructor(day, hour, min, am) {
        this.day = day;
        this.hour = hour;
        this.min = min;
        this.am = am;
    }

    add(mins) {
        this.hour += (Math.floor((this.min + mins) / 60)) % 24;
        this.min = (this.min + mins) % 60;
        if (this.hour === 12 && this.min === 0) {
            this.am = !this.am;
            if (this.am) {
                this.day += 1;
            }
        } else if (this.hour >= 13) {
            this.hour = this.hour % 12;
        }
    }

    equal(t1) {
        return this.day === t1.day && this.hour === t1.hour && this.min === t1.min && this.am === t1.am;
    }

    getNumeric() {
        return(((this.day * 100) + this.hour) * 100) + this.min;
    }
}

class TimeIntervals {
    constructor(mins) {
        this.mapDays = new Map();
        this.intervals = [];
        this.mins = mins;
    }

    getTimeIntervals(start, end) {
        let startTime = this.getTime(start);
        console.log(startTime);
        let endTime = this.getTime(end);
        while (!startTime.equal(endTime)) {
            startTime.add(this.mins);
            this.intervals.push(startTime.getNumeric());
        }
        console.log('time intervals:', this.intervals);
    }

    getTime(t1) {
        const split = t1.split(' ');
        const hrMin = split[1].split(':');
        return new Time(this.mapDays.get(split[0]), parseInt(hrMin[0]), parseInt(hrMin[1]), 'am' === split[2]);
    }

    getMapDays() {
        this.mapDays.set("monday", 1);
        this.mapDays.set("tuesday", 2);
        this.mapDays.set("wednesday", 3);
        this.mapDays.set("thursday", 4);
        this.mapDays.set("friday", 5);
        this.mapDays.set("saturday", 6);
        this.mapDays.set("sunday", 7);
    }
}

const ti = new TimeIntervals(5); 
ti.getMapDays();
ti.getTimeIntervals("monday 11:00 am", "monday 1:00 pm");