class Generator {

    constructor() {
        this.code = '';
        this.temporal = 0;
        this.quadruples = [];
    }

    newTemp(){
        let temp = this.temporal;
        this.temporal++;
        return `t${temp}`;
    }

    addQuadruple(op, arg1, arg2, arg3, res) {
        // Creando cuadruplo
        let quad = new Quadruples();
        // Agregando los valores
        quad.setOperator(op);
        quad.setArg1(arg1);
        quad.setArg2(arg2);
        quad.setArg3(arg3);
        quad.setResult(res);
        // Guardar registro
        this.quadruples.push(quad);
    }

    getQuadruples(){
        return this.quadruples;
    }


}