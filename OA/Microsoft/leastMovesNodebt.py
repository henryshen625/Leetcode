'''
题目：
给定一个整数数组 A，其中正数表示收入，负数表示支出。要求通过将某些支出移到数组末尾，确保从头开始累加时，
任何时候都不会出现负值。我们需要返回将多少次这样的移动操作，以确保公司永不陷入债务。
输入限制：
N 的范围是 [1, 100,000]
数组中的每个元素的值的范围是 [-1,000,000,000, 1,000,000,000]
数组元素的总和是非负的

示例：
A = [10, -10, -1, 1, 10] -> 需要移动1次（将 -10 移到末尾）
A = [1, -1, -1, 1, 1, 1, 1] -> 需要移动3次（将前3个负数移到末尾）
A = [5, -2, -3, 1] -> 需要移动0次（因为任何时刻总和都不会为负数）

解题思路：
从头遍历数组，维护当前累计和 current_sum，并检测在遍历过程中是否有可能出现负值。
如果出现负值，我们就需要将之前的某个负数移动到数组的末尾。我们将需要移动的负数存储在一个最大堆（优先队列）中，这样我们可以每次选择最大的负数来移动，这样对当前累计和的影响最小。
遍历结束时，返回移动的次数。
O(log n)
'''

import heapq

def solution(A):
    prefix_sum = 0
    move_count = 0
    max_heap = []

    for num in A:
        prefix_sum += num

        if num < 0:
            # 将负数插入最大堆，注意 heapq 是最小堆，因此我们存储负的 num
            heapq.heappush(max_heap, num)

        # 如果前缀和小于 0，我们需要调整
        if prefix_sum < 0:
            move_count += 1
            # 弹出最大堆中的最大负数（用负号模拟最大堆）
            largest_negative = heapq.heappop(max_heap)
            prefix_sum -= largest_negative  # 调整前缀和

    return move_count
