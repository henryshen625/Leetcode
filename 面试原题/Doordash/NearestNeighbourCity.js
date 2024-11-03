// ["axx", "axy", "az", "axd", "aa", "abc", "abs", "p"], 
// [0, 1, 2, 4, 5, 0, 1, 0], 
// [1, 2, 5, 3, 4, 2, 0, 2], 
// ["axx", "axy", "abs", "zmm"]

function closestCities(cities, xValues, yValues, queries) {
    const cityIndexMap = new Map();
    for (let i = 0; i < cities.length; i++) {
        cityIndexMap.set(cities[i], i);
    }
    const result = [];
    for (const query of queries) {
        result.push(getClosestCity(cities, xValues, yValues, query, cityIndexMap));
    }

    return result;
}

function getClosestCity(cities, xValues, yValues, queryCity, cityIndexMap) {
    if (!cityIndexMap.has(queryCity)) return 'NONE';

    const queryIndex = cityIndexMap.get(queryCity);
    const queryX = xValues[queryIndex];
    const queryY = yValues[queryIndex];

    let closestCityIndex = -1;
    let minDistance = Infinity;

    for (let i = 0; i < cities.length; i++) {
        if (i === queryIndex) continue;
        if (xValues[i] === queryX || yValues[i] === queryY) {
            const distance = Math.abs(xValues[i] - queryX) + Math.abs(yValues[i] - queryY);
            if (distance < minDistance) {
                closestCityIndex = i;
                minDistance = distance;
            } else if (distance === minDistance) {
                if (cities[i] < cities[closestCityIndex]) {
                    closestCityIndex = i;
                }
            }
        }
    }
    return closestCityIndex === -1 ? 'NONE' : cities[closestCityIndex];
}
const cities = ["axx", "axy", "az", "axd", "aa", "abc", "abs", "p"];
const xValues = [0, 1, 2, 4, 5, 0, 1, 0];
const yValues = [1, 2, 5, 3, 4, 2, 0, 2];
const queries = ["axx", "axy", "abs", "zmm"];
console.log(closestCities(cities, xValues, yValues, queries));