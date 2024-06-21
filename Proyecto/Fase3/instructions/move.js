class Move extends Instruction {

    constructor(line, col, id, obj, value) {
        super();
        this.line = line;
        this.col = col;
        this.id = id;
        this.obj = obj;
        this.value = value;
    }

    execute(ast, env, gen) {
        console.log(this.obj)
        console.log(this.value)
        console.log(ast.registers)
        
    }
}