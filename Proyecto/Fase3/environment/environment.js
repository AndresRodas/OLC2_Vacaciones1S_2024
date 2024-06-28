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

    getVariable(ast, line, col, id) {
        let tmpEnv = this;
        while (true) {
            if (id in tmpEnv.table) {
                return tmpEnv.table[id];
            }
            if (tmpEnv.previous === null) {
                break;
            } else {
                tmpEnv = tmpEnv.previous;
            }
        }
        ast?.setNewError({ msg: `La variable ${id} no existe.`, line, col});
        return new Symbol(0, 0, '', Type.NULL, null);
    }

    setVariable(ast, line, col, id, sym) {
        let tmpEnv = this;
        while (true) {
            if (id in tmpEnv.table) {
                tmpEnv.table[id] = sym;
                return sym;
            }
            if (tmpEnv.previous === null) {
                break;
            } else {
                tmpEnv = tmpEnv.previous;
            }
        }
        ast?.setNewError({ msg: `La variable ${id} no existe.`, line, col});
        return new Symbol(0, 0, '', Type.NULL, null);
    }

}