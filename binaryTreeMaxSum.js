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
