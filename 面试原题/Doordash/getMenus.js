// https://leetcode.com/discuss/interview-question/1367130/Doordash-Phone-Interview

class Node {
    constructor(key, value, isActive) {
        this.key = key;
        this.value = value;
        this.isActive = isActive;
        this.children = [];
    }

    equal(node) {
        if (node === null) {
            return false;
        }
        return this.key === node.key && this.value === node.value && this.isActive === node.isActive;
    }
}

function getModifiedItems(oldMenus, newMenus) {
    if (oldMenus === null && newMenus === null) {
        return 0;
    }
    let count = 0;
    if (oldMenus === null || newMenus === null || !oldMenus.equal(newMenus)) {
        count++;
    }
    const children1 = getChildNodes(newMenus);
    const children2 = getChildNodes(oldMenus);

    for (const key in children1) {
        count += getModifiedItems(children1[key], children2[key] || null);
    }

    for (const key in children2) {
        if (!children1[key]) {
            count += getModifiedItems(null, children2[key]);
        }
    }

    return count;
}

function getChildNodes(menus) {
    const map = {};
    if (menus === null) {
        return map;
    }
    for (const node of menus.children) {
        map[node.key] = node;
    }
    return map;
}


const oldMenu = new Node("root", 1, true);
const newMenu = new Node("root", 1, true);

// 添加一些子节点
const oldChild1 = new Node("child1", 2, true);
const oldChild2 = new Node("child2", 3, false);
oldMenu.children.push(oldChild1);
oldMenu.children.push(oldChild2);

const newChild1 = new Node("child1", 2, false);  // 状态被修改
const newChild3 = new Node("child3", 3, true);   // 新增节点
newMenu.children.push(newChild1);
newMenu.children.push(newChild3);

console.log("Modified items count:", getModifiedItems(oldMenu, newMenu));
// const oldMenu = new Node("a", 1, true);
// const bNode = new Node("b", 2, true);
// const cNode = new Node("c", 3, true);
// const dNode = new Node("d", 4, true);
// const eNode = new Node("e", 5, true);
// const fNode = new Node("f", 6, true);

// // 构建现有树
// oldMenu.children.push(bNode);
// oldMenu.children.push(cNode);
// bNode.children.push(dNode);
// bNode.children.push(eNode);
// cNode.children.push(fNode);

// // 构建新树
// const newMenu = new Node("a", 1, true);
// const newCNode = new Node("c", 3, false);
// const newFNode = new Node("f", 66, true);

// newMenu.children.push(newCNode);
// newCNode.children.push(newFNode);

// // 调用 getModifiedItems 计算修改的节点数量
// console.log("Modified items count:", getModifiedItems(oldMenu, newMenu));
