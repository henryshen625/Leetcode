const EMPTY = ' ';
const DASHMART = 'D';
const direction = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
];

function distanceToNearstGate(rooms) {
    const m = rooms.length;
    if (m === 0) return rooms;
    const n = rooms[0].length;
    const queue = [];
    
    for (let row = 0; row < m; row++) {
        for (let col = 0; col < n; col++) {
            if (rooms[row][col] === DASHMART) {
                queue.push([row, col]);
            }
            
        }
    }
    while (queue.length > 0) {
        const [row, col] = queue.shift();
        for (const [dr, dc] of direction) {
            const r = row + dr;
            const c = col + dc;
            if (r < 0 || c < 0 || r >= m || c >= n || rooms[r][c] !== EMPTY) {
                continue;
            }
            rooms[r][c] = String.fromCharCode(rooms[row][col].charCodeAt(0) + 1);
            queue.push([r, c]);
        }
    }
    return rooms;
}
const locationBoard = [
    ['X', ' ', ' ', 'D', ' ', ' ', 'X', ' ', 'X'],
    ['X', ' ', 'X', 'X', ' ', ' ', ' ', ' ', 'X'],
    [' ', ' ', ' ', 'D', 'X', 'X', ' ', 'X', ' '],
    [' ', ' ', ' ', 'D', ' ', 'X', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', 'X', ' ', ' ', 'X'],
    [' ', ' ', ' ', ' ', 'X', ' ', ' ', 'X', 'X']
];

const newBoard = distanceToNearstGate(locationBoard);
const locationList = [[2,2], [4,0], [0,4], [2,6]];
const answer = locationList.map(location => newBoard[location[0]][location[1]].charCodeAt(0) - 'D'.charCodeAt(0));
console.log(answer);