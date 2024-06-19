class Ast {
    constructor() {
        this.instructions = [];
        this.console = "";
        this.errors = [];
        this.cstNodes = [];
        this.cstEdges = [];
        this.idCount = 0;
    }

    addNode(label){
        this.cstNodes.push({
            id: this.idCount, 
            label: label,
        });
        this.idCount = this.idCount + 1;
    }

    addEdge(from, to){
        this.cstEdges.push({
            from: from, 
            to: to,
        });
    }

}