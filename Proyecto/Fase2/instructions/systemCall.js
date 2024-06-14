class SystemCall extends Instruction {

    constructor(line, col) {
        super();
        this.line = line;
        this.col = col;
    }

    execute(ast, env, gen) {
        console.log('Ejecutando una llamada de sistema');
    }
}