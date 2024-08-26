/*** 
问题描述
这个问题是关于一个合规爬虫程序（compliance crawler）的文件夹导航问题。程序需要从当前文件夹回到根目录（根目录是 "/").

每次移动操作记录在一个数组 loggedMoves 中，这个数组中的每个元素代表爬虫的操作。爬虫可以进行以下三种操作：

"../": 移动到当前文件夹的父文件夹。
"./": 停留在当前文件夹，不移动。
"x/": 移动到子文件夹 x。 
loggedMoves = ["x/", "y/", "../", "z/", "../"]
2
loggedMoves = ["o/", "w/", "e/", "../", "../", "../"]
3
* * */

function minimumSteps(loggedMoves) {
    const stack = [];

    for (let move of loggedMoves) {
        if (move === "../") {
            if (stack.length > 0) {
                stack.pop();
            }
        } else if (move !== "./") {
            stack.push(move);
        }
    }

    return stack.length;
}
