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
 * @param {number} distance
 * @return {number}
 */
 var countPairs = function(root, distance) {
    let result = 0;
    function dfs(node) {
        if (!node) {
            return [];
        }
        if (!node.left && !node.right) {
            return [1];
        }
        const leftCount = dfs(node.left);
        const rightCount = dfs(node.right);

        for(let l of leftCount) {
            for(let r of rightCount) {
                if (l + r <= distance) {
                    result ++;
                }
            }
        }

        const newCount = [];
        for (let count of leftCount.concat(rightCount)) {
            if (count + 1 <= distance) {
                newCount.push(count + 1);
            }
        }
        return newCount;
    }
    dfs(root);
    return result;
};