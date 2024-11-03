import heapq;

def getOrder(tasks):
        n = len(tasks)
        indices = list(range(n))
        indices.sort(key=lambda x: tasks[x][0])
        
        result = []
        q = []
        time = 0
        pointer = 0

        for i in range(n):
            if not q:
                time = max(time, tasks[indices[pointer]][0])
            while pointer < n and tasks[indices[pointer]][0] <= time:
                heapq.heappush(q, (tasks[indices[pointer]][1], indices[pointer]))
                pointer += 1
            process, index = heapq.heappop(q)
            time += process
            result.append(index)
        return result
