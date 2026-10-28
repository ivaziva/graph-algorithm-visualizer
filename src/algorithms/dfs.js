export function dfs(start) {
    const visited = new Set();
    const stack = [];
    const orderDFS = [];

    const steps = [];

    stack.push(start);

    while (stack.length > 0) {
        const node = stack.pop();
        if (visited.has(node)) continue;

        visited.add(node);
        steps.push({type : "visit", node : node});

        for (const sled of node.neighbors) {
            if (visited.has(sled)) continue;
            stack.push(sled);
        }

        orderDFS.push(node);
    }

    return {orderDFS, steps};
}