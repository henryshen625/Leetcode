var reverseKGroup = function(head, k) {
    if (!head || k === 1) return head;

    // 计算链表总长度
    let length = 0;
    let node = head;
    while (node) {
        length++;
        node = node.next;
    }

    // 定义虚拟头节点
    const dummy = new ListNode(0);
    dummy.next = head;

    let prevGroupEnd = dummy;

    // 每次处理 k 个节点
    while (length >= k) {
        let groupStart = prevGroupEnd.next;
        let groupEnd = prevGroupEnd;

        // 移动到当前组的末尾节点
        for (let i = 0; i < k; i++) {
            groupEnd = groupEnd.next;
        }

        const nextGroupStart = groupEnd.next;

        // 反转当前组
        let prev = null;
        let curr = groupStart;
        while (curr !== nextGroupStart) {
            let next = curr.next;
            curr.next = prev;
            prev = curr;
            curr = next;
        }

        // 连接反转后的部分
        prevGroupEnd.next = groupEnd;  // 连接前一部分到当前组的反转后部分
        groupStart.next = nextGroupStart;  // 连接当前组的尾部到下一部分

        // 更新 prevGroupEnd，指向当前组的末尾
        prevGroupEnd = groupStart;

        // 更新链表的剩余长度
        length -= k;
    }

    return dummy.next;
};

/**
 * 虚拟头节点：

我们创建了一个虚拟头节点 dummy，这样可以方便地处理头部翻转时的指针操作。
计算链表长度：

我们遍历整个链表，计算出链表的节点总数 count。
逐段翻转：

每次检查剩余节点数是否大于等于 k，如果满足条件，进行翻转操作。
翻转过程中使用三个指针 curr、nex 和 pre：
curr 指向当前处理段的第一个节点。
nex 指向 curr 的下一个节点。
pre 指向当前段的前一个节点。
翻转过程：

对于每一段 k 个节点，通过调整指针来实现翻转。每次将 nex 指向的节点移到 pre 和 curr 之间，直至 k 个节点翻转完毕。
更新指针：

翻转完当前段后，将 pre 移动到当前段的最后一个节点位置，为下一次翻转做准备。
返回结果：

最终返回 dummy.next，即翻转后的链表头节点。

 */