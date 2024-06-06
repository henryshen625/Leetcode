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
 * @return {number[][]}
 */
 var levelOrder = function(root) {
    const result = [];
    const nodeQueue = [];
    nodeQueue.push(root);
    if (root === null) {
        return result;
    }
    while (nodeQueue.length !== 0) {
        const length = nodeQueue.length;
        const levelResult = [];
        for(let i = 0; i < length; i++) {
            const node = nodeQueue.shift();
            levelResult.push(node.val);
            if (node.left) {
                nodeQueue.push(node.left);
            }
            if (node.right) {
                nodeQueue.push(node.right);
            }
        }
        result.push(levelResult);
    }
    return result;
};