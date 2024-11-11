// Input - ("mon 10:00 am", mon 11:00 am)
// Output - [11005, 11010, 11015...11100]
// Output starts with 1 if the day is monday, 2 if tuesday and so on till 7 for sunday
// Append 5 min interval times to that till the end time
// So here it is 10:05 as first case, so its written as 11005 2nd is 10:10 so its written as 11010

// the numeric code for time should be in 24hour format "mon 10:05 pm" --> 12205
// when incrementing, you need to round the input time to the nearest 5th min. For eg. if start = 10:03, then output should start from 10:05
class Time {
    constructor(day, hour, min) {
        this.day = day;
        this.hour = hour;
        this.min = min;
    }

    // 增加分钟数，并确保时间在 24 小时制内
    add(mins) {
        this.min += mins;

        // 处理分钟进位
        if (this.min >= 60) {
            this.hour += Math.floor(this.min / 60);
            this.min = this.min % 60;
        }

        // 处理小时制超过 24 的情况
        if (this.hour >= 24) {
            this.hour = this.hour % 24;
            this.day = (this.day % 7) + 1; // 转换到下一天，且循环到周一
        }
    }

    equal(t1) {
        return this.day === t1.day && this.hour === t1.hour && this.min === t1.min;
    }

    // 获取 24 小时制的数值格式
    getNumeric() {
        return (((this.day * 100) + this.hour) * 100) + this.min;
    }
}

class TimeIntervals {
    constructor(mins) {
        this.mapDays = new Map();
        this.intervals = [];
        this.mins = mins;
    }

    getTimeIntervals(start, end) {
        this.intervals = []; // 清空之前的间隔
        let startTime = this.getTime(start);
        let endTime = this.getTime(end);

        // 处理开始时间四舍五入到最近的 5 分钟
        if (startTime.min % 5 !== 0) {
            startTime.min = Math.ceil(startTime.min / 5) * 5;
            if (startTime.min === 60) {
                startTime.min = 0;
                startTime.hour += 1;
            }
        }

        while (!startTime.equal(endTime)) {
            this.intervals.push(startTime.getNumeric());
            startTime.add(this.mins);
        }

        console.log('time intervals:', this.intervals);
    }

    getTime(t1) {
        const [day, time, period] = t1.split(' ');
        const [hour, min] = time.split(':').map(Number);
        let hour24 = hour;

        // 将 AM/PM 转换为 24 小时制
        if (period.toLowerCase() === 'pm' && hour !== 12) {
            hour24 += 12;
        }
        if (period.toLowerCase() === 'am' && hour === 12) {
            hour24 = 0;
        }

        return new Time(this.mapDays.get(day.toLowerCase()), hour24, min, period.toLowerCase() === 'am');
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
ti.getTimeIntervals("monday 10:03 pm", "monday 1:00 pm"); 
