export class Controls {
    constructor() {
        this.addNodeButton = document.getElementById("add-node");
        this.addEdgeButton = document.getElementById("add-edge");

        this.removeNodeButton = document.getElementById("remove-node");
        this.removeEdgeButton = document.getElementById("remove-edge");

        this.clearButton = document.getElementById("clear");

        this.bfsButton = document.getElementById("bfs");
        this.dfsButton = document.getElementById("dfs");

        this.runButton = document.getElementById("run");
        this.pauseButton = document.getElementById("pause");
        this.resetButton = document.getElementById("reset");

        this.speedSlider = document.getElementById("speed");
    }
    onAddNode(callback) {
        this.addNodeButton.addEventListener("click", callback);
    }
    onAddEdge(callback) {
        this.addEdgeButton.addEventListener("click", callback);
    }
    onRemoveNode(callback) {
        this.removeNodeButton.addEventListener("click", callback);
    }
    onRemoveEdge(callback) {
        this.removeEdgeButton.addEventListener("click", callback);
    }
    onClear(callback) {
        this.clearButton.addEventListener("click", callback);
    }
    onBFS(callback) {
        this.bfsButton.addEventListener("click", callback);
    }
    onDFS(callback) {
        this.dfsButton.addEventListener("click", callback);
    }
    onRun(callback) {
        this.runButton.addEventListener("click", callback);
    }
    onPause(callback) {
        this.pauseButton.addEventListener("click", callback);
    }
    onReset(callback) {
        this.resetButton.addEventListener("click", callback);
    }
    onSpeedChange(callback) {
        this.speedSlider.addEventListener("input", callback);
    }
}