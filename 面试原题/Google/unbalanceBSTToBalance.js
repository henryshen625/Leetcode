//二叉树 height  上到下 4 3 2 1 depth 从下到上 4 3 2 1

//1. 110 balanced-binary-tree

function isBalanced(root) {
    const balanced = root => {
        if (root === null) {
            return 0;
        }
        const left = balanced(root.left);
        if (left === -1) return -1;
        const right = balanced(root.right);
        if (right === -1) return -1;
        if (Math.abs(left - right) > 1) {
            return -1;
        } else {
            //高度是按最长的子树计算
            return 1 + Math.max(left, right);
        }
    }
    if (root === null) {
        return true;
    }
    if (balanced(root) === -1) {
        return false;
    }
    return true;
}

// 2. 108 convert-sorted-array-to-binary-search-tree
function sortedArrayToBST(nums) {
    const buildBST = (left, right) => {
        if (left > right) {
            return null;
        }
        const mid = left + Math.floor((right - left) / 2);
        const root = new TreeNode(nums[mid]);
        root.left = buildBST(left, mid - 1);
        root.right = buildBST(mid + 1, right);
        return root;
    }

    return buildBST(0, nums.length - 1);
}

//3. unbalance BST t0 Balance BST
function inorderTraversal(root) {
    const result = [];
    function inorder(node) {
        if (!node) return;
        inorder(node.left);
        result.push(node.val);
        inorder(node.right);
    }
    inorder(root);
    return result;
}

// 步骤2：通过有序数组构建平衡的 AVL 树
function sortedArrayToAVL(nums) {
    if (nums.length === 0) return null;

    function buildAVL(low, high) {
        if (low > high) return null;

        // 选择中间元素作为根节点
        const mid = Math.floor((low + high) / 2);
        const node = new TreeNode(nums[mid]);

        // 递归构建左右子树
        node.left = buildAVL(low, mid - 1);
        node.right = buildAVL(mid + 1, high);

        return node;
    }

    return buildAVL(0, nums.length - 1);
}

// 步骤3：将不平衡的 BST 转换为平衡的 AVL 树
function balanceBST(root) {
    const sortedNums = inorderTraversal(root); // 中序遍历获取有序数组
    return sortedArrayToAVL(sortedNums);       // 从有序数组构建 AVL 树
}



// 进阶 O(1) 空间复杂度： Morris 遍历
// 获得节点的高度
function getHeight(node) {
    return node ? node.height : 0;
}

// 更新节点的高度
function updateHeight(node) {
    node.height = 1 + Math.max(getHeight(node.left), getHeight(node.right));
}

// 计算节点的平衡因子
function getBalance(node) {
    return node ? getHeight(node.left) - getHeight(node.right) : 0;
}

// 左旋操作
function leftRotate(z) {
    const y = z.right;
    const T2 = y.left;

    // 进行左旋转
    y.left = z;
    z.right = T2;

    // 更新高度
    updateHeight(z);
    updateHeight(y);

    return y;
}

// 右旋操作
function rightRotate(z) {
    const y = z.left;
    const T3 = y.right;

    // 进行右旋转
    y.right = z;
    z.left = T3;

    // 更新高度
    updateHeight(z);
    updateHeight(y);

    return y;
}

// AVL树插入
function insertAVL(node, val) {
    if (!node) {
        return new TreeNode(val);
    }

    if (val < node.val) {
        node.left = insertAVL(node.left, val);
    } else if (val > node.val) {
        node.right = insertAVL(node.right, val);
    } else {
        // 不允许重复节点
        return node;
    }

    // 更新高度
    updateHeight(node);

    // 获取平衡因子
    const balance = getBalance(node);

    // 如果失去平衡，进行四种旋转情况
    if (balance > 1 && val < node.left.val) {
        return rightRotate(node);
    }

    if (balance < -1 && val > node.right.val) {
        return leftRotate(node);
    }

    if (balance > 1 && val > node.left.val) {
        node.left = leftRotate(node.left);
        return rightRotate(node);
    }

    if (balance < -1 && val < node.right.val) {
        node.right = rightRotate(node.right);
        return leftRotate(node);
    }

    return node;
}

