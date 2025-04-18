/*
Given an incoming stream of characters containing values like $300 and £400, write a function that takes symbol and data stream and returns array of values.
Example getValues("$", "abc $300 £400 $30 abvv cvc") returns [300, 30]
getValues("£", "abc $300 £400 $30 abvv cvc") returns [400]
*/

function getValues(symbol, stream) {
    const result = [];
    let i = 0;
    while (i < stream.length) {
        if (stream[i] === symbol) {
            i++;
            let temp = '';
            while (i < stream.length && stream[i] >= '0' && stream[i] <= '9') {
                temp += stream[i];
                i++;
            }
            if (temp) {
                result.push(temp);
            }
        } else {
            i++;
        }
    }
    return result;
}
console.log(getValues("$", "abc $300 £400 $30 abvv cvc"));
console.log(getValues("£", "abc $300 £400 $30 abvv cvc"));

/*
Follow up : How will you handle tokens like $$300 and $200$300. Incoming data is a stream and you have no ability to peek next value.
*/
// flag control:

function getValues(symbol, stream) {
    const result = [];
    let inToken = false;
    let currentNumber = '';
    for (let i = 0; i < stream.length; i++) {
        const char = stream[i];
        if (char === symbol) {
            if (inToken) {
                if (currentNumber !== '') {
                    result.push(Number(currentNumber));
                }
                currentNumber = '';
            }
            inToken = true;
        } else if (inToken && char >= '0' && char <= '9') {
            currentNumber += char;
        } else {
            if (inToken && currentNumber !== '') {
                result.push(Number(currentNumber));
            }
            inToken = false;
            currentNumber = '';
        }
    }
    if (inToken && currentNumber !== '') {
        result.push(Number(currentNumber));
    }
    return result;
}
console.log(getValues("$", "$$300$200$300"));
function getValues(symbol, stream) {
    const result = [];
    let inToken = false;
    let currentNumber = '';
    for (let i = 0; i < stream.length; i++) {
        const char = stream[i];
        if (char === symbol) {
            if (inToken) {
                if (currentNumber !== '') {
                    result.push(currentNumber);
                }
                currentNumber = '';
            }
            inToken = true;
        } else if (inToken && char >= '0' && char <= '9') {
            currentNumber += char;
        } else {
            if (inToken && currentNumber !== '') {
                result.push(currentNumber);
            }
            currentNumber = '';
            inToken = false;
        }
    }
    if (inToken && currentNumber !== '') {
        result.push(currentNumber);
    }
    return result;
}

/*
Given several account and target balance. Balance all acount by moving funds to make sure the Accounts are atleast at Target Balance.
Example :
Input :
Account 1 - 130
Acount 2 - 90
Acount 3 - 70
Acount 4 - 150

Threshold = 100
Output :
Acount 1 -> Acount2 = 10
Account 1 - > Account 3 = 20
Account 4 -> Account 3 = 10
*/
function balanceAccounts(accounts, threshold) {
    const excessAccounts = [];
    const deficitAccounts = [];
    const transactions = [];

    // Calculate excess and deficit for each account
    accounts.forEach((balance, index) => {
        const diff = balance - threshold;
        if (diff > 0) {
            excessAccounts.push({ account: index + 1, excess: diff });
        } else if (diff < 0) {
            deficitAccounts.push({ account: index + 1, deficit: -diff });
        }
    });

    // Redistribute funds
    let i = 0; // Pointer for excessAccounts
    let j = 0; // Pointer for deficitAccounts

    while (i < excessAccounts.length && j < deficitAccounts.length) {
        const excessAccount = excessAccounts[i];
        const deficitAccount = deficitAccounts[j];

        // Transfer funds
        const transferAmount = Math.min(excessAccount.excess, deficitAccount.deficit);
        transactions.push(
            `Account ${excessAccount.account} -> Account ${deficitAccount.account} = ${transferAmount}`
        );

        // Update excess and deficit
        excessAccount.excess -= transferAmount;
        deficitAccount.deficit -= transferAmount;

        // Move to the next account if fully balanced
        if (excessAccount.excess === 0) i++;
        if (deficitAccount.deficit === 0) j++;
    }

    return transactions;
}

console.log(balanceAccounts([130, 90, 70, 150], 100));


class TaskManager {
    constructor() {
        this.tasks = []; // 存储任务名称
        this.weights = []; // 累加权重数组
        this.totalWeight = 0; // 总权重
    }

    // 添加任务
    add(task, weight) {
        this.tasks.push(task);
        this.totalWeight += weight; // 更新总权重
        this.weights.push(this.totalWeight); // 更新累加权重数组
    }

    // 随机选择任务
    pickTask() {
        const target = Math.random() * this.totalWeight; // 生成随机权重
        // 使用二分查找确定随机权重所属的任务
        let left = 0, right = this.weights.length - 1;
        while (left <= right) {
            const mid = Math.floor((left + right) / 2);
            if (this.weights[mid] < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        return this.tasks[left];
    }
}

/**
input为两个string, 检查两个string是否每个字符相互对应, (str1-》str2 和str2-〉str1都可以)
eg. apple 和cttol可以相互对应, 但是apple和ctpol不符合 ('p' -> 't' + 'p' -> 'p'两个mapping)
**/

function isIsomorphic(str1, str2) {
    if (str1.length !== str2.length) return false;

    const map1 = new Map();
    const map2 = new Map();

    for (let i = 0; i < str1.length; i++) {
        const c1 = str1[i];
        const c2 = str2[i];

        if (map1.has(c1) && map1.get(c1) !== c2) return false;
        if (map2.has(c2) && map2.get(c2) !== c1) return false;

        map1.set(c1, c2);
        map2.set(c2, c1);
    }

    return true;
}
// follow up 1: 给定一个字符串列表 wordList 和一个字符串 target，找出所有能和 target 形成一一映射的字符串

function isIsomorphic(str1, str2) {
    if (str1.length !== str2.length) return false;

    const map1 = new Map();
    const map2 = new Map();

    for (let i = 0; i < str1.length; i++) {
        const c1 = str1[i];
        const c2 = str2[i];

        if (map1.has(c1) && map1.get(c1) !== c2) return false;
        if (map2.has(c2) && map2.get(c2) !== c1) return false;

        map1.set(c1, c2);
        map2.set(c2, c1);
    }

    return true;
}

function findIsomorphicWords(wordList, target) {
    return wordList.filter(word => isIsomorphic(word, target));
}

// 测试用例
// 输出: [ 'cttol', 'title', 'paper' ]

// follow up 2: 优化时间复杂度, 怎样可以不用每次遍历
// 计算字符串的模式表示
function getPattern(str) {
    const map = new Map();
    let pattern = [];
    let count = 0;

    for (const char of str) {
        if (!map.has(char)) {
            map.set(char, count);
            count++;
        }
        pattern.push(map.get(char));
    }
    
    return pattern.join(" ");
}

function preprocessWordList(wordList) {
    const patternMap = new Map();
    
    for (const word of wordList) {
        const pattern = getPattern(word);
        if (!patternMap.has(pattern)) {
            patternMap.set(pattern, []);
        }
        patternMap.get(pattern).push(word);
    }

    return patternMap;
}

function findIsomorphicWordsOptimized(wordList, target) {
    const patternMap = preprocessWordList(wordList);
    const targetPattern = getPattern(target);

    return patternMap.get(targetPattern) || [];
}

// 测试用例
const words = ["cttol", "ctpol", "title", "paper", "apple", "robot"];
console.log(findIsomorphicWordsOptimized(words, "apple")); 
// 输出: [ 'cttol', 'title', 'paper' ]



/**
题目要求对于给定的 job 列表，打印时需要先打印出该 job 所有依赖的命令（依赖可能也有它们自己的依赖），
最后打印该 job 本身的命令。这其实就是一个“后序遍历”（post-order）的过程。 
**/

// 定义 Job 类，包含 name、cmd 和 deps 三个属性
class Job {
    constructor(name, cmd, deps = []) {
      this.name = name;
      this.cmd = cmd;
      this.deps = deps; // deps 是一个 Job 对象数组
    }
  }
  
  /**
   * 递归打印 job 的依赖命令，再打印当前 job 的命令
   * 注意：此处不处理重复打印或循环依赖的情况
   * @param {Job} job - 当前的 job 对象
   */
  function printJob(job) {
    // 先打印所有依赖的命令
    for (const dep of job.deps) {
      printJob(dep);
    }
    // 最后打印当前 job 的命令
    console.log(job.cmd);
  }
  
  /**
   * 遍历给定的 job 列表，依次调用 printJob 打印每个 job（及其依赖）的命令
   * @param {Job[]} jobList - job 对象数组
   */
  function printAllJobs(jobList) {
    for (const job of jobList) {
      printJob(job);
    }
  }
  
  // 示例使用
  
  // 构造一些示例 Job 对象
  const jobA = new Job("A", "echo A");
  const jobB = new Job("B", "echo B");
  const jobC = new Job("C", "echo C", [jobA, jobB]);
  const jobD = new Job("D", "echo D", [jobC]);
  
  // 假设最外层任务列表包含 jobD 和 jobB
  const jobList = [jobD, jobB];
  
  // 调用函数打印所有 job 的命令
  printAllJobs(jobList);
  
  /*
    运行结果将依次输出：
      echo A
      echo B
      echo C
      echo D
      echo B
    注意：因为 jobB 同时存在于 jobC 的依赖中和顶层列表中，
    所以会被打印两次（这也是最基础答案未做重复处理的结果）
  */

    
    // 定义 Job 类
class Job {
    constructor(name, cmd, deps = []) {
      this.name = name;
      this.cmd = cmd;
      this.deps = deps; // deps 是一个 Job 对象数组
    }
  }
  
  /**
   * 递归打印 job 的依赖命令，再打印当前 job 的命令。
   * 使用 memSet 记录已打印的 job，避免重复打印
   * @param {Job} job - 当前的 job 对象
   * @param {Set<string>} memSet - 用于记录已打印过的 job 的名称
   */
  function printJob(job, memSet) {
    // 如果当前 job 已经打印过，则直接返回，不再重复打印
    if (memSet.has(job.name)) {
      return;
    }
    
    // 先递归打印所有依赖的 job 命令
    for (const dep of job.deps) {
      printJob(dep, memSet);
    }
    
    // 打印当前 job 的命令，并标记为已打印
    console.log(job.cmd);
    memSet.add(job.name);
  }
  
  /**
   * 遍历给定的 job 列表，并调用 printJob 打印每个 job（及其依赖）的命令
   * @param {Job[]} jobList - job 对象数组
   */
  function printAllJobs(jobList) {
    const memSet = new Set();
    for (const job of jobList) {
      printJob(job, memSet);
    }
  }
  
  // 示例使用
  
  // 构造一些示例 Job 对象
  const jobA = new Job("A", "echo A");
  const jobB = new Job("B", "echo B");
  const jobC = new Job("C", "echo C", [jobA, jobB]);
  const jobD = new Job("D", "echo D", [jobC]);
  
  // 假设最外层任务列表包含 jobD 和 jobB
  const jobList = [jobD, jobB];
  
  // 调用函数打印所有 job 的命令（依赖先行）
  printAllJobs(jobList);
  
  /*
    输出结果：
      echo A
      echo B
      echo C
      echo D
  
    注意：jobB 虽然既出现在 jobC 的依赖中也在最外层列表中，
    但由于内存集合 memSet 的存在，jobB 只会被打印一次。
  */
  // 定义 Job 类
class Job {
    constructor(name, cmd, deps = []) {
      this.name = name;
      this.cmd = cmd;
      this.deps = deps; // deps 是一个 Job 对象数组
    }
  }
  
  /**
   * 递归打印 job 的依赖命令，再打印当前 job 的命令。
   * 在遍历过程中使用 path 检测当前递归路径中是否存在循环依赖，
   * 并使用 memSet 记录全局已打印的 job，避免重复打印。
   *
   * @param {Job} job - 当前的 job 对象
   * @param {Set<string>} memSet - 用于记录全局已打印过的 job 的名称
   * @param {Set<string>} path - 当前递归路径中的 job 名称集合，用于检测循环依赖
   */
  function printJob(job, memSet, path) {
    // 如果当前 job 已经在当前路径中，则说明存在循环依赖，输出错误信息并返回
    if (path.has(job.name)) {
      console.error(`检测到循环依赖: ${[...path, job.name].join(" -> ")}`);
      return;
    }
  
    // 如果该 job 全局已经打印过，则直接返回，避免重复打印
    if (memSet.has(job.name)) {
      return;
    }
  
    // 将当前 job 加入到递归路径中
    path.add(job.name);
  
    // 递归打印所有依赖的 job
    for (const dep of job.deps) {
      printJob(dep, memSet, path);
    }
  
    // 当前 job 的依赖处理完毕后，从路径中移除
    path.delete(job.name);
  
    // 打印当前 job 的命令，并将其标记为已打印
    console.log(job.cmd);
    memSet.add(job.name);
  }
  
  /**
   * 遍历给定的 job 列表，并打印每个 job（及其依赖）的命令。
   * 每个顶层 job 都使用一个新的空 path 来检测循环依赖，
   * 而全局 memSet 用于避免重复打印。
   *
   * @param {Job[]} jobList - job 对象数组
   */
  function printAllJobs(jobList) {
    const memSet = new Set();
    for (const job of jobList) {
      printJob(job, memSet, new Set());
    }
  }
  
  // 示例使用
  
  // 构造一些示例 Job 对象
  const jobA = new Job("A", "echo A");
  const jobB = new Job("B", "echo B");
  const jobC = new Job("C", "echo C", [jobA, jobB]);
  const jobD = new Job("D", "echo D", [jobC]);
  
  // 构造一个循环依赖示例：jobE 与 jobF 互相依赖
  const jobE = new Job("E", "echo E");
  const jobF = new Job("F", "echo F", [jobE]);
  jobE.deps.push(jobF); // 形成循环依赖：E -> F -> E
  
  // 最外层任务列表包含 jobD 和 jobE
  const jobList = [jobD, jobE];
  
  // 调用函数打印所有 job 的命令（依赖先行）
  printAllJobs(jobList);
  
  /*
    运行结果示例：
    
    echo A
    echo B
    echo C
    echo D
    检测到循环依赖: E -> F -> E
    echo E
    
    说明：
    - jobD 及其依赖 jobC、jobA、jobB 均正常打印；
    - 对于 jobE 和 jobF，由于存在循环依赖，检测到循环后输出错误信息，
      并避免无限递归。同时，由于没有重复打印，jobE 只打印一次，
      jobF 因循环检测未继续递归打印其命令（或根据需求进行其它处理）。
  */
  

      function replaceTemplate(template, values) {
        let result = [];
        let keyBuffer = [];
        let insideBraces = false;
    
        for (let i = 0; i < template.length; i++) {
            const char = template[i];
    
            if (char === '{') {
                insideBraces = true;
                keyBuffer = []; // 开始收集 key
            } else if (char === '}') {
                insideBraces = false; // 结束 key 收集
                const key = keyBuffer.join(""); // 获取 key 名称
                result.push(values[key] !== undefined ? values[key] : `{${key}}`); // 替换 key 或保留
            } else if (insideBraces) {
                keyBuffer.push(char); // 收集 key
            } else {
                result.push(char); // 普通字符
            }
    
            console.log(`Iteration ${i}:`, result); // 打印中间状态
        }
    
        console.log("Final result array:", result);
        return result.join(""); // 拼接最终结果
    }
    
    // 测试用例
    console.log(replaceTemplate("this is a {foo} {bar}", { "foo": "template", "bar": "string" }));
    