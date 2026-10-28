import { bfs } from "./algorithms/bfs.js";
import { dfs } from "./algorithms/dfs.js";

import { Node } from "./graph/Node.js";
import { Graph } from "./graph/Graph.js";

import { Controls } from "./ui/controls.js";
import { Logger } from "./ui/logger.js";

import { Renderer } from "./visualization/renderer.js";
import { Animation } from "./visualization/animation.js";

const canvas = document.getElementById("canvas");
const loggerElement = document.getElementById("logger");

const graph = new Graph();

const controls = new Controls();
const logger = new Logger(loggerElement);

const renderer = new Renderer(canvas);
const animation = new Animation(renderer, logger, graph);


let nextNodeID = 0;

let selectedNode = null;

let currentMode = null;

let startNode = null;

let isPaused = false;

let algorithm = null;

controls.onAddNode(() => {
    currentMode = "add-node";
});

controls.onAddEdge(() => {
    currentMode = "add-edge";
});

controls.onRemoveNode(() => {
    currentMode = "remove-node";
});

controls.onRemoveEdge(() => {
    currentMode = "remove-edge";
});

controls.onClear(() => {
    graph.clear(); renderer.clear(); logger.clear();
    nextNodeID = 0; startNode = null; selectedNode = null;
    currentMode = null; algorithm = null;
});

controls.onBFS(() => {
    currentMode = "bfs";
    algorithm = "bfs";
});

controls.onDFS(() => {
    currentMode = "dfs";
    algorithm = "dfs";
});

controls.onRun(() => {
    if (algorithm == null || startNode == null) return;
    let result;
    if (algorithm == "bfs") result = bfs(startNode);
    if (algorithm == "dfs") result = dfs(startNode);

    animation.play(result.steps);

    algorithm = null;
});

controls.onPause(() => {
    if (isPaused) {
        animation.resume();
        isPaused = false;
        controls.pauseButton.textContent = "Pause";
    }
    else {
        animation.pause();
        isPaused = true;
        controls.pauseButton.textContent = "Resume";
    }
});

controls.onReset(() => {
    animation.reset();
    renderer.clear(); renderer.drawGraph(graph);

    controls.pauseButton.textContent = "Pause";
    logger.clear();

    currentMode = null; algorithm = null;
    startNode = null; selectedNode = null;
    
    isPaused = false;
});

canvas.addEventListener("click", (event) => {
    const rect = canvas.getBoundingClientRect();
    
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    switch (currentMode) {
        case "add-node" : {
            nextNodeID ++; const id = nextNodeID;
            const node = new Node(id, x, y);
            graph.addNode(node);

            renderer.clear(); renderer.drawGraph(graph);

            currentMode = null; break;
        }
        case "add-edge" : {
            const node = graph.nodes.find(node => {
                const dx = x - node.x; const dy = y - node.y;
                return Math.sqrt(dx * dx + dy * dy) <= renderer.r;
            });
            if (!node) break;

            if (selectedNode == null) selectedNode = node;
            else {
                graph.addEdge(selectedNode, node);

                selectedNode = null;

                renderer.clear();renderer.drawGraph(graph);

                currentMode = null;
            }

            break;
        }
        case "remove-node" : {
            const node = graph.nodes.find(node => {
                const dx = x - node.x; const dy = y - node.y;
                return Math.sqrt(dx * dx + dy * dy) <= renderer.r;
            });
            if (!node) break;

            graph.removeNode(node);

            renderer.clear();renderer.drawGraph(graph);

            currentMode = null; break;
        }
        case "remove-edge" : {
            const node = graph.nodes.find(node => {
                const dx = x - node.x; const dy = y - node.y;
                return Math.sqrt(dx * dx + dy * dy) <= renderer.r;
            });
            if (!node) break;

            if (selectedNode == null) selectedNode = node;
            else {
                graph.removeEdge(selectedNode, node);

                selectedNode = null;

                renderer.clear();renderer.drawGraph(graph);

                currentMode = null;
            }

            break;
        }
        case "bfs" : {
            const node = graph.nodes.find(node => {
                const dx = x - node.x; const dy = y - node.y;
                return Math.sqrt(dx * dx + dy * dy) <= renderer.r;
            });
            if (!node) break;

            startNode = node;

            currentMode = null; break;
        }
        case "dfs" : {
            const node = graph.nodes.find(node => {
                const dx = x - node.x; const dy = y - node.y;
                return Math.sqrt(dx * dx + dy * dy) <= renderer.r;
            });
            if (!node) break;

            startNode = node;

            currentMode = null; break;
        }
    }
});

controls.onSpeedChange((event) => {
    animation.speed = Number(event.target.value);
});


