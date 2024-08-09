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
var flatten = function(root) {
    if (root === null) return;

    flatten(root.left);
    flatten(root.right);

    const rightSub = root.right;

    root.right = root.left;
    root.left = null;
    let current = root;
    while (current.right !== null) {
        current = current.right;
    }
    current.right = rightSub;
    return;
};

console.log(1);