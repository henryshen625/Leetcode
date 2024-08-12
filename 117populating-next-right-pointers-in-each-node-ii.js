//  // 层序
// var connect = function(root) {
//     if (root === null) return null;
//     const queue = [root];

//     while (queue.length !== 0) {
//         const n = queue.length;
//         for (let i = 0; i < n; i++) {
//             const node = queue.shift();
//             if (i !== n - 1) {
//                 node.next = queue[0];
//             }
//             if (node.left) queue.push(node.left);
//             if (node.right) queue.push(node.right);
//         }
//     }
//     return root;
// };

// 递归

function connect(root) {
    const pre = [];
    function dfs(node, depth) {
        if (node === null) return;
        if (depth === pre.length) {
            pre.push(node);
        } else {
            pre[depth].next = node;
            pre[depth] = node;
        }
        dfs(node.left, depth + 1);
        dfs(node.right, depth + 1);
    }
    dfs(root, 0);
    return root;
}


// bfs + 链表
var connect = function (root) {
    const dummy = new Node();
    let cur = root;
    while (cur) {
        dummy.next = null;
        let nxt = dummy; // 下一层的链表
        while (cur) { // 遍历当前层的链表
            if (cur.left) {
                nxt.next = cur.left; // 下一层的相邻节点连起来
                nxt = cur.left;
            }
            if (cur.right) {
                nxt.next = cur.right; // 下一层的相邻节点连起来
                nxt = cur.right;
            }
            cur = cur.next; // 当前层链表的下一个节点
        }
        cur = dummy.next; // 下一层链表的头节点
    }
    return root;
};
