/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
var rotateRight = function(head, k) {
    if (!head || k === 0) return head;
    let length = 1;
    let curr = head;
    while (curr.next !== null) {
        curr = curr.next;
        length++;
    }
    k = k % length;
    curr.next = head;

    const step = length - k;
    let newTail = head;
    for (let i = 1; i < step; i++) {
        newTail = newTail.next;
    }
    const newHead = newTail.next;
    newTail.next = null;
    
    return newHead;
};