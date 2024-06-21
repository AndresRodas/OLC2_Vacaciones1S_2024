class Primitive extends Expression {

    constructor(line, col, id, type, value) {
        super();
        this.line = line;
        this.col = col;
        this.id = id;
        this.type = type;
        this.value = value;
    }

    execute(ast, env, gen) {
        // Crear simbolo
        return new Symbol(this.line, this.col, this.type, this.value)
    }
}