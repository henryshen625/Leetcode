var mergeKLists = function(lists) {
    const n = lists.length;
    if (n === 0) {
     return null;
    }
    const mergeTwoLinkLists = function(list1, list2) {
     if (list2 === null) return list1;
     if (list1 === null) return list2;
     if (list1.val < list2.val) {
         list1.next = mergeTwoLinkLists(list1.next, list2);
         return list1;
     } else {
         list2.next = mergeTwoLinkLists(list1, list2.next);
         return list2;
     }
    }
    const merge = function(left, right) {
     if (left === right) {
         return lists[left];
     }
     const mid = (left + right) >> 1;
     const l1 = merge(left, mid);
     const l2 = merge(mid + 1, right);
     return mergeTwoLinkLists(l1, l2);
    }
    
    return merge(0, n - 1);
 };