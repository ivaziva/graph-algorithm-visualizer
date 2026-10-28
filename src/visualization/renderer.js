export class Renderer {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");

        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;

        this.r = 20;
    }
    drawNode(node) {
        if (node.selected) {
            this.ctx.beginPath();

            this.ctx.arc(node.x, node.y, this.r + 4, 0, 2 * Math.PI);

            const selectedColor = getComputedStyle(document.documentElement).getPropertyValue("--node-selected-color");

            this.ctx.strokeStyle = selectedColor; this.ctx.lineWidth = 4;

            this.ctx.stroke();
        }

        this.ctx.beginPath();

        const graphcolor = getComputedStyle(document.documentElement).getPropertyValue("--graph-color");
        this.ctx.fillStyle = graphcolor; this.ctx.strokeStyle = graphcolor;

        this.ctx.arc(node.x, node.y, this.r, 0, 2 * Math.PI);
        this.ctx.fill(); this.ctx.stroke();

        const styles = getComputedStyle(document.documentElement);

        this.nodeTextColor = styles.getPropertyValue("--node-text-color").trim();
        this.nodeTextSize = styles.getPropertyValue("--node-text-size").trim();
        this.nodeTextFont = styles.getPropertyValue("--node-text-font").trim();
        this.nodeTextWeight = styles.getPropertyValue("--node-text-weight").trim();
        this.nodeTextAlign = styles.getPropertyValue("--node-text-align").trim();
        this.nodeTextBaseline = styles.getPropertyValue("--node-text-baseline").trim();

        this.ctx.fillStyle = this.nodeTextColor;
        this.ctx.font = `${this.nodeTextWeight} ${this.nodeTextSize} ${this.nodeTextFont}`;
        this.ctx.textAlign = this.nodeTextAlign; this.ctx.textBaseline = this.nodeTextBaseline;
        
        this.ctx.fillText(node.id, node.x, node.y);
    }
    drawEdge(from, to) {
        this.ctx.beginPath();
        const dx = to.x - from.x; const dy = to.y - from.y;
        const d = Math.sqrt(dx * dx + dy * dy);

        const ex = dx/d; const ey = dy/d;

        const startX = from.x + this.r * ex; const startY = from.y + this.r * ey;
        const endX = to.x - this.r * ex; const endY = to.y - this.r * ey;

        this.ctx.moveTo(startX, startY); this.ctx.lineTo(endX, endY);
        this.ctx.stroke();
    }
    drawGraph(graph) {
        for (const node of graph.nodes) this.drawNode(node);
        for (const edge of graph.edges) this.drawEdge(edge.from, edge.to);
    }
    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}