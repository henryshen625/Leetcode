/**
 * @param {number[][]} intervals
 * @return {number}
 */
function minMeetingRooms(intervals) {
    if (intervals.length === 0) return 0; // 如果没有会议，直接返回 0

    // 创建两个数组分别存储会议的开始时间和结束时间
    const startTimes = intervals.map(interval => interval[0]).sort((a, b) => a - b);
    const endTimes = intervals.map(interval => interval[1]).sort((a, b) => a - b);

    let startPointer = 0; // 指向开始时间数组的指针
    let endPointer = 0;   // 指向结束时间数组的指针
    let usedRooms = 0;    // 当前使用的会议室数量
    // 遍历所有的会议
    while (startPointer < intervals.length) {
        // 如果下一个会议的开始时间大于或等于最早结束的会议时间
        if (startTimes[startPointer] >= endTimes[endPointer]) {
            usedRooms--;   // 释放一个会议室
            endPointer++;  // 移动结束时间指针到下一个结束时间
        }
        usedRooms++;      // 安排一个新的会议室
        startPointer++;   // 移动开始时间指针到下一个开始时间
    }

    return usedRooms; // 返回使用的最大会议室数量
}
