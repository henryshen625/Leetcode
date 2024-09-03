function reverseKGroup(head, k) {
    if (!head || k === 1) return head;

    // 创建一个虚拟头节点，方便处理头节点的翻转
    let dummy = new ListNode(0);
    dummy.next = head;

    let curr = dummy, nex = dummy, pre = dummy;
    let count = 0;

    // 计算链表的长度
    while (curr.next) {
        curr = curr.next;
        count++;
    }

    // 只要剩余节点数大于等于 k 就进行翻转
    while (count >= k) {
        curr = pre.next;
        nex = curr.next;

        // 翻转 k 个节点
        for (let i = 1; i < k; i++) {
            curr.next = nex.next;
            nex.next = pre.next;
            pre.next = nex;
            nex = curr.next;
        }

        // 移动 pre 指针到翻转后的部分末尾
        pre = curr;
        count -= k;
    }

    return dummy.next;
}
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