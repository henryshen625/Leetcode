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
 var countNodes = function(root) {
    const count = function(node) {
        if (node === null) {
            return 0;
        }
        let left = node.left;
        let right = node.right;
        let leftDepth = 0;
        let rightDepth = 0;
        while (left) {
            left = left.left;
            leftDepth ++;
        }
        while (right) {
            right = right.right;
            rightDepth++;
        }
        if (leftDepth === rightDepth) {
            return (2 ** (leftDepth + 1)) - 1;
        }
        const leftCount = count(node.left);
        const rightCount = count(node.right);
        return leftCount + rightCount + 1;
    }
    return count(root);
};
// 完全二叉树性质 寻找满二叉树