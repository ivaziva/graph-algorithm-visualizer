export class Graph {
    constructor() {
        this.nodes = [];
        this.edges = [];
    }
    addNode(node) {
        this.nodes.push(node);
    }
    addEdge(from, to) {
        this.edges.push({from, to});

        from.neighbors.push(to);
        to.neighbors.push(from);
    }
    removeNode(node) {
        for (const {from, to} of this.edges)
        {
            if (from == node) to.neighbors = to.neighbors.filter(neighbor => neighbor !== from);
            if (to == node) from.neighbors = from.neighbors.filter(neighbor => neighbor !== to);
        }
        this.edges = this.edges.filter(edge => (edge.from !== node && edge.to !== node));
        this.nodes = this.nodes.filter(nodes => nodes !== node);
    }
    removeEdge(from, to) {
        this.edges = this.edges.filter(edge => !((edge.from == from && edge.to == to) || (edge.from == to && edge.to == from)));

        from.neighbors = from.neighbors.filter(neighbor => neighbor !== to);
        to.neighbors = to.neighbors.filter(neighbor => neighbor !== from);
    }
    clear() {
        for (const node of this.nodes) {
            node.neighbors = [];
        }
        this.nodes = [];
        this.edges = [];
    }
}