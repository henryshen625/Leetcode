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
function deleteNode (root, key) {
    if (root === null) { 
        return null;
    }
    if (root.val < key) {
        root.right = deleteNode(root.right, key);
    } else if (root.val > key) {
        root.left = deleteNode(root.left, key);
    } else {
        // if (root.left === null && root.right === null) {
        //     return null;
        // }
        if (root.left === null) {
            return root.right;
        } else if (root.right === null) {
            return root.left;
        } else {
            // let current = root.right;
            // while (current.left) {
            //     current = current.left;
            // }
            // current.left = root.left;
            // return root.right;
            root.val = findMin(root.right);
            root.right = deleteNode(root.right, root.val);
        }
    }
    return root;
}

function findMin(node) {
    while (node.left) {
        node = node.left;
    }
    return node.val;
}