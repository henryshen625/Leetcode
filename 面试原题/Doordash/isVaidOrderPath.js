const list_orders = [
    ['P1', 'P2', 'D1', 'D2'], 
    ['P1', 'D1', 'P2', 'D2'], 
    ['P1', 'D2', 'D1', 'P2'], 
    ['P1', 'D2'], 
    ['P1', 'P2'], 
    ['P1', 'D1', 'D1'], 
    [], 
    ['P1', 'P1', 'D1'], 
    ['P1', 'P1', 'D1', 'D1'], 
    ['P1', 'D1', 'P1'], 
    ['P1', 'D1', 'P1', 'D1']
]

function isValidOrderPath(orders) {
    if (orders.length === 0) return true;
    const pickSet = new Set();
    const dropSet = new Set();
    for (const order of orders) {
        const orderAction = order[0];
        const orderNumer = order[1];
        if (orderAction === 'P') {
            if (pickSet.has(orderNumer)) {
                return false;
            }
            pickSet.add(orderNumer);
        } else if (orderAction === 'D') {
            if (dropSet.has(orderNumer) || !pickSet.has(orderNumer)) {
                return false;
            }
            dropSet.add(orderNumer);
        } else {
            return false;
        }
    }
    return pickSet.size === dropSet.size;
}

//Follow up1: Given an integer representing number of orders, print all possible valid order paths 
// https://leetcode.com/problems/count-all-valid-pickup-and-delivery-options/description/

var countOrders = function(n) {
    const MOD = 1e9 + 7;
    let dp = 1;

    for (let i = 1; i <= n; i++) {
        dp = dp * (2 * i - 1) * i % MOD;
    }

    return dp;
};

// Follow Up 2: Find the longest valid subarray. O(n^2) is obvious. O(n) involves careful consideration of all the cases of invalidity.


function longestValidSubarray(route) {
    if (route.length === 0) return 0;
    let left = 0;
    let maxLength = 0;
    const pickUpOrders = new Set();
    const compeletedOrder = new Set();
    function isValid(action) {
        let valid = true;
        const orderType = action[0];
        const orderId = action.slice(1);
        if (orderType === 'P') {
            if (pickUpOrders.has(orderId)) {
                valid = false;
            }
        } else {
            if (compeletedOrder.has(orderId) || !pickUpOrders.has(orderId)) {
                valid = false;
            }
        }
        return valid;
    }
    for (let right = 0; right < route.length; right++) {
        const action = route[right];
        const orderType = action[0];
        const orderId = action.slice(1);
        //  ["P1", "P1", "D1", "D1"]
        if (!isValid(action)) {
            if (orderType === 'P') {
                left = right;
            } else {
                left = right + 1;
            }
            pickUpOrders.clear();
            pickUpOrders.add(orderId);
            compeletedOrder.clear();
            continue;
        }
        if (orderType === 'P') {
            pickUpOrders.add(orderId);
        } else if (orderType === 'D') {
            pickUpOrders.delete(orderId);
            compeletedOrder.add(orderId);
        }
        if (pickUpOrders.size === 0) {
            maxLength = Math.max(maxLength, right - left + 1);
        }
    }
    return maxLength;
}

console.log(longestValidSubarray(["P1", "P2", "D1", "D2"])); // 4
console.log(longestValidSubarray(["P1", "D1", "P2", "D2"])); // 4
console.log(longestValidSubarray(["P1", "D2", "D1", "P2"])); // 0
console.log(longestValidSubarray(["P1", "D2"]));              // 0
console.log(longestValidSubarray(["P1", "P2"]));              // 0
console.log(longestValidSubarray(["P1", "D1", "D1"]));        // 2
console.log(longestValidSubarray([]));                        // 0
console.log(longestValidSubarray(["P1", "P1", "D1"]));        // 2
console.log(longestValidSubarray(["P1", "P1", "D1", "D1"]));  // 2
console.log(longestValidSubarray(["P1", "D1", "P1"]));        // 2
console.log(longestValidSubarray(["P1", "D1", "P1", "D1"]));  // 2