class BankingSystem {
    constructor() {
        this.accounts = {};  // 存储账户余额
        this.outgoingTransactions = {};  // 存储账户的支出总额
        this.payments = {};  // 存储支付记录
        this.paymentCount = 0;  // 用来生成唯一的支付标识符
    }

    // 处理返现逻辑
    processCashback(timestamp) {
        // 遍历所有支付记录，检查是否有需要返现的支付
        for (let paymentId in this.payments) {
            const payment = this.payments[paymentId];

            if (payment.status === 'IN_PROGRESS' && timestamp >= payment.cashbackTime) {
                // 处理返现
                this.accounts[payment.accountId] += payment.cashbackAmount;
                payment.status = 'CASHBACK_RECEIVED';
            }
        }
    }

    // 创建账户
    createAccount(timestamp, accountId) {
        this.processCashback(timestamp);  // 确保先处理返现
        if (this.accounts.hasOwnProperty(accountId)) {
            return false;
        }
        this.accounts[accountId] = 0;
        this.outgoingTransactions[accountId] = 0;
        return true;
    }

    // 存款
    deposit(timestamp, accountId, amount) {
        this.processCashback(timestamp);  // 确保先处理返现
        if (!this.accounts.hasOwnProperty(accountId)) {
            return null;
        }
        this.accounts[accountId] += amount;
        return this.accounts[accountId];
    }

    // 转账
    transfer(timestamp, sourceAccountId, targetAccountId, amount) {
        this.processCashback(timestamp);  // 确保先处理返现
        if (!this.accounts.hasOwnProperty(sourceAccountId) || 
            !this.accounts.hasOwnProperty(targetAccountId)) {
            return null;
        }
        if (sourceAccountId === targetAccountId) {
            return null;
        }
        if (this.accounts[sourceAccountId] < amount) {
            return null;
        }
        this.accounts[sourceAccountId] -= amount;
        this.accounts[targetAccountId] += amount;
        this.outgoingTransactions[sourceAccountId] += amount;
        return this.accounts[sourceAccountId];
    }

    // 支付并设置返现
    pay(timestamp, accountId, amount) {
        this.processCashback(timestamp);  // 确保先处理返现
        if (!this.accounts.hasOwnProperty(accountId) || this.accounts[accountId] < amount) {
            return null;
        }

        // 从账户中扣除金额
        this.accounts[accountId] -= amount;
        this.outgoingTransactions[accountId] += amount;

        // 生成唯一的支付 ID
        const paymentId = `payment${++this.paymentCount}`;

        // 计算返现金额（向下取整）
        const cashbackAmount = Math.floor(amount * 0.02);

        // 记录支付操作
        this.payments[paymentId] = {
            accountId: accountId,
            amount: amount,
            cashbackAmount: cashbackAmount,
            status: 'IN_PROGRESS',
            cashbackTime: timestamp + 86400000  // 24 小时后处理返现
        };

        return paymentId;
    }

    // 获取支付状态
    getPaymentStatus(timestamp, accountId, paymentId) {
        this.processCashback(timestamp);  // 确保先处理返现
        if (!this.payments.hasOwnProperty(paymentId)) {
            return null;
        }

        const payment = this.payments[paymentId];

        // 验证支付记录的账户是否匹配
        if (payment.accountId !== accountId) {
            return null;
        }

        return payment.status;
    }
}

/***
 Level 1: 基本银行系统操作
1.账户创建：
使用 createAccount(timestamp, accountId) 创建一个账户。
如果账户已经存在，返回 false；如果成功创建，返回 true。

2.存款：
使用 deposit(timestamp, accountId, amount) 向账户存款。
如果账户存在，增加相应金额并返回账户的当前余额。
如果账户不存在，返回 null。

3.转账：
使用 transfer(timestamp, sourceAccountId, targetAccountId, amount) 在账户之间进行转账。
如果源账户和目标账户都存在且源账户余额足够，完成转账，并返回源账户的剩余余额；否则返回 null

Level 2: 排名账户的支出
1. 账户排名：
使用 topSpenders(timestamp, n) 返回支出最多的前 n 个账户，按支出降序排列。
支出相同时按账户 ID 升序排列。
返回格式为：["account1(2500)", "account2(2000)"]。
实现：
记录账户支出：在 transfer 和 pay 操作中记录账户的支出。
返回支出排名：根据记录的支出金额对账户进行排序。


Level 3: 返现和支付状态
1.支付：
使用 pay(timestamp, accountId, amount) 进行支付，并产生 2% 的返现，返现将在 24 小时后退回。
生成唯一的支付标识符并返回。

2.获取支付状态：
使用 getPaymentStatus(timestamp, accountId, payment) 查询支付状态。
状态包括 "IN_PROGRESS" 和 "CASHBACK_RECEIVED"。
实现：
记录支付信息：每次支付生成唯一支付标识符，记录返现信息和返现时间。
处理返现：当时间到达返现时间戳时，自动将返现退回账户。
查询支付状态：根据时间戳判断支付状态是进行中还是已完成。
 ***/

