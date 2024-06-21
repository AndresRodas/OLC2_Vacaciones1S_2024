class Environment {

    constructor(previous, id) {
        this.previous = previous;
        this.id = id;
        this.table = {};
    }

    saveVariable(ast, line, col, id, symbol) {
        if (id in this.table) {
            ast.setNewError({ msg: `La variable ${id} ya existe.`, line, col});
            return;
        }
        this.table[id] = symbol;
    }

}