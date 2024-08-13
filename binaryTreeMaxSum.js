function binaryTreeMaxPath(root) {
    let result = 0;
    function dfs(root, sum) {
        sum += root.val;
        if (root.left === null && root. right === null) {
            result = Math.max(result, sum);
            return;
        }
        if (root.left) {
            dfs(root.left, sum);
        }
        if (root.right) {
            dfs(root.right, sum);
        }
    }
    dfs(root, 0);
    return result;
}