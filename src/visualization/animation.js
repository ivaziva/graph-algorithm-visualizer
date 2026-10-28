export class Animation {
    constructor(renderer, logger, graph, speed = 500) {
        this.renderer = renderer;
        this.logger = logger;
        this.graph = graph;
        this.speed = speed;
        this.paused = false;
    }
    async play(steps) {
        for (const step of steps) {
            while (this.paused) {
                await this.sleep(100);
            }

            if (step.type == "visit") {
                step.node.selected = true;
                this.renderer.clear(); this.renderer.drawGraph(this.graph);
            }

            this.logger.logStep(step);

            await this.sleep(this.speed);

            step.node.selected = false;
        }
    }
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    pause() {
        this.paused = true;
    }
    resume() {
        this.paused = false;
    }
    reset() {
        this.paused = false;
    }
}