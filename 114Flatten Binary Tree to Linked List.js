/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {void} Do not return anything, modify root in-place instead.
 */
function flatten(root) {
    if (root === null) {
        return;
    }
    //将根节点的左子树变成链表
    flatten(root.left);
    //将根节点的右子树变成链表
    flatten(root.right);
    const temp = root.right;
    //把树的右边换成左边的链表
    root.right = root.left;
    //记得要将左边置空
    root.left = null;
    //找到树的最右边的节点
    let curr = root;
    while (curr.right) {
        curr = curr.right;
    }
    //把右边的链表接到刚才树的最右边的节点
    curr.right = temp;
    return;
}

// O(1) space:
function flatten(root) {
    let curr = root;
    while (curr !== null) {
        if (curr.left !== null) {
            // 找到左子树的最右节点
            let prev = curr.left;
            while (prev.right !== null) {
                prev = prev.right;
            }
            // 将最右节点的右子树指向当前节点的右子树
            prev.right = curr.right;
            // 将当前节点的右子树设为左子树
            curr.right = curr.left;
            // 左子树置空
            curr.left = null;
        }
        // 继续处理右子树
        curr = curr.right;
    }
}
// https://leetcode.cn/problems/flatten-binary-tree-to-linked-list/solutions/356853/er-cha-shu-zhan-kai-wei-lian-biao-by-leetcode-solu/