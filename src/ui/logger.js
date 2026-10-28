export class Logger {
    constructor(element) {
        this.element = element;
    }
    log(message) {
        const entry = document.createElement("div");
        entry.textContent = message;
        this.element.appendChild(entry);
    }
    logStep(step) {
        if (step.type == "visit") {
            this.log(`Visiting node ${step.node.id}`);
        }
    }
    clear() {
        this.element.innerHTML = "";
    }
}