function minEatingSpeed(piles, h) {
    const canFinish = k => {
        let totalTime = 0;
        for (let i = 0; i < piles.length; i++) {
            if (piles[i] <= k) {
                totalTime++
            } else {
                totalTime += Math.ceil(piles[i] / k);
            }
            if (totalTime > h) {
                return false;
            }
        }
        return true;
    }
    let left = 1;
    let right = Math.max(...piles);

    while (left <= right) {
        const mid = left + Math.floor((right - left) / 2);
        if (canFinish(mid)) {
            right = mid - 1;
        } else {
            left = mid + 1;
        }
    }
    return left;
}

