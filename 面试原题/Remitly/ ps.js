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
    let isNumberExtraction = false;
    let currentNumber = '';

    for (const char of stream) {
        if (char === symbol) {
            if (currentNumber.length > 0) {
                result.push(currentNumber); // 保存数字
                currentNumber = '';
            }
            isNumberExtraction = true;
        } else if (char >= '0' && char <= '9') {
            currentNumber += char;
        } else {
            if (currentNumber.length > 0) {
                result.push(currentNumber);
            }
            isNumberExtraction = false;
            currentNumber = '';
        }
    }
    if (currentNumber.length > 0) {
        result.push(currentNumber);
    }
    return result;
}
console.log(getValues("$", "$200$300"));


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