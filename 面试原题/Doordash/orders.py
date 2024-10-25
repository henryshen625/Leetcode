# Initial OrderIds = [3,1,5,4,2]
import heapq

def process_orders(orders):
    if not orders:
        return []

    n = len(orders)
    left_map = {i: i - 1 for i in range(n)}  # 记录每个元素的左邻居索引
    right_map = {i: i + 1 for i in range(n)}  # 记录每个元素的右邻居索引
    right_map[n - 1] = None  # 最后一个元素没有右邻居
    left_map[0] = None  # 第一个元素没有左邻居

    min_heap = []

    # 辅助函数：判断一个订单是否是符合条件的
    def is_eligible(i):
        left = left_map[i]
        right = right_map[i]
        if left is None and right is None:
            return True  # 唯一的元素
        if left is None:  # 第一个元素
            return orders[i] > orders[right]
        if right is None:  # 最后一个元素
            return orders[i] > orders[left]
        return orders[i] > orders[left] and orders[i] > orders[right]  # 中间的元素

    # 初始化时，找出所有符合条件的订单，并加入堆
    for i in range(n):
        if is_eligible(i):
            heapq.heappush(min_heap, (orders[i], i))  # 堆存储 (订单ID, 订单索引)

    processed_sequence = []

    while min_heap:
        # 从堆中取出最小的符合条件的订单
        _, idx = heapq.heappop(min_heap)
        processed_sequence.append(orders[idx])  # 记录处理的订单ID

        # 更新左右邻居
        left = left_map[idx]
        right = right_map[idx]

        if left is not None:  # 更新左邻居的右边关系
            right_map[left] = right
            if is_eligible(left):
                heapq.heappush(min_heap, (orders[left], left))

        if right is not None:  # 更新右邻居的左边关系
            left_map[right] = left
            if is_eligible(right):
                heapq.heappush(min_heap, (orders[right], right))

    return processed_sequence

# 示例测试
orders = [30,10,50,40,20,70,15,16]
result = process_orders(orders)
print(result)  # 输出: [3, 5, 4, 2, 1]





    
