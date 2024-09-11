// 定义链表节点的构造函数
function ListNode(val, next) {
    this.val = (val === undefined ? 0 : val);
    this.next = (next === undefined ? null : next);
}

// 主函数：归并排序
var sortList = function(head) {
    // 如果链表为空或只有一个节点，直接返回
    if (!head || !head.next) return head;

    // 1. 使用快慢指针找到链表的中点
    let slow = head;
    let fast = head;
    let prev = null;  // 用于断开链表

    while (fast && fast.next) {
        prev = slow;
        slow = slow.next;
        fast = fast.next.next;
    }

    // 断开链表
    prev.next = null;

    // 2. 递归排序两个部分
    let left = sortList(head);
    let right = sortList(slow);

    // 3. 合并两个排序后的链表
    return merge(left, right);
};

// 合并两个有序链表
function merge(l1, l2) {
    let dummy = new ListNode(0);
    let curr = dummy;

    // 当两个链表都有元素时，取较小的元素加入结果链表
    while (l1 && l2) {
        if (l1.val < l2.val) {
            curr.next = l1;
            l1 = l1.next;
        } else {
            curr.next = l2;
            l2 = l2.next;
        }
        curr = curr.next;
    }

    // 将剩余的部分拼接到结果链表
    if (l1) {
        curr.next = l1;
    } else {
        curr.next = l2;
    }

    return dummy.next;
}
