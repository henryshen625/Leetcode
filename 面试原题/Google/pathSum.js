// 1.  二叉树的从根节点到叶子结点最大路径
function binaryTreeMaxPath(root) {
    let result = -Infinity;
    
    const dfs = (node, sum) => {
        if (node === null) {
            return;
        }

        sum += node.val;

        // 如果当前节点是叶子节点，更新最大路径和
        if (node.left === null && node.right === null) {
            result = Math.max(result, sum);
            return;
        }

        // 继续递归遍历左右子树，同时传递累积的路径和
        dfs(node.left, sum);
        dfs(node.right, sum);
    }
    
    dfs(root, 0);
    return result;
}

//2. leetcode 124

function maxPathSum(root) {
    let maxSum = -Infinity;
    const findMax = (root) => {
        if (root === null) {
            return 0;
        }
        const left = findMax(root.left);
        const right = findMax(root.right);
        
        const innerMAX = root.val + left + right;
        maxSum = Math.max(maxSum, innerMAX);

        const outMax = root.val + Math.max(left, right, 0);

        return outMax < 0 ? 0 : outMax;
    }
    findMax(root);
    return maxSum;
}