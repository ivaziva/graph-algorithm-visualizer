export function bfs(start) {
    const distance = new Map();
    const visited = new Set();
    const queue = [];

    const steps = [];

    distance.set(start, 0);
    visited.add(start);
    queue.push(start);

    while (queue.length > 0) {
        const node = queue.shift();
        steps.push({type : "visit", node : node});

        for (const sled of node.neighbors) {
            if (visited.has(sled)) continue;

            distance.set(sled, distance.get(node) + 1);
            visited.add(sled);
            queue.push(sled);
        }
    }

    return {distance, steps};
}