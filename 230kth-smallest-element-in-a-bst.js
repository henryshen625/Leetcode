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
 * @param {number} k
 * @return {number}
 */
var kthSmallest = function(root, k) {
    let result = null;
    function traversal(root) {
        if (root === null) return;
        traversal(root.left)
        k--;
        if (k === 0) {
            result = root.val;
            return;
        }
        traversal(root.right);
    }
    traversal(root);
    return result;
};