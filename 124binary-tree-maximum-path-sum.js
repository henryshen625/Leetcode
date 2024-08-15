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
 * @return {number}
 */
var maxPathSum = function(root) {
    let max = -Infinity;
    function dfs(root) {
        if (root === null) return 0;
        const left = dfs(root.left);
        const right = dfs(root.right);

        const innerMAX = left + root.val + right;
        max = Math.max(innerMAX, max);

        const outputMax = root.val + Math.max(0, left, right);
        return outputMax < 0 ? 0 : outputMax;
    }
    dfs(root);
    return max;
};