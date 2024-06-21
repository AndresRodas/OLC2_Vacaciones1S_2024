class Cst {
    constructor() {
        this.Nodes = [];
        this.Edges = [];
        this.idCount = 0;
    }

    newNode(){
        let count = this.idCount; 
        this.idCount++;
        return `${count}`
    }

    addNode(id, label){
        this.Nodes.push({
            id: id, 
            label: label,
        });
    }

    addEdge(from, to){
        this.Edges.push({
            from: from, 
            to: to,
        });
    }
}