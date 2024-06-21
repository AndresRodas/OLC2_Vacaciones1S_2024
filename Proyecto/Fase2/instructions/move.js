class Move extends Instruction {

    constructor(line, col) {
        super();
        this.line = line;
        this.col = col;

    }

    execute(ast, env, gen) {
        console.log('Ejecutando un move');
        ast.setNewError({ msg: 'Índice de registro no válido.', line: 0, col: 0});
    }
}