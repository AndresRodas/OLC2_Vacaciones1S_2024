class Operation extends Expression {

    constructor(line, col, inst, op1, op2, op3, op4) {
        super();
        this.line = line;
        this.col = col;
        this.inst = inst;
        this.op1 = op1;
        this.op2 = op2;
        this.op3 = op3;
        this.op4 = op4;
    }

    execute(ast, env, gen) {
        console.log(`Ejecutando una operación ${this.inst}`);
    }
}