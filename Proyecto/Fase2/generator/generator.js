class Generator {

    constructor() {
        this.code = '';
        this.quadruples = [];
    }

    addQuadruple(quad) {
        this.quadruples.push(quad);
    }

    getQuadruples(){
        return this.quadruples;
    }


}