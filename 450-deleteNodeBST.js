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
 * @param {number} key
 * @return {TreeNode}
 */
 var deleteNode = function(root, key) {
    if (root === null) {
        return null;
    }
    if (root.val === key) {
        if (root.left === null && root.right === null) {
            return null;
        } else if (root.left !== null && root.right === null) {
            return root.left;
        } else if (root.right !== null && root.left === null) {
            return root.right;
        } else {
            let current = root.right;
            while (current.left !== null) {
                current = current.left;
            }
            current.left = root.left;
            return root.right;
        }
    }
    if (key < root.val) {
        root.left = deleteNode(root.left, key);
    }
    if (key > root.val) {
        root.right = deleteNode(root.right, key);
    } 
    return root;
};