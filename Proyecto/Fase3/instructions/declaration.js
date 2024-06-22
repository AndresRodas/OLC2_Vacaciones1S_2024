class Declaration extends Instruction {

    constructor(line, col, id, name, type, exp) {
        super();
        this.line = line;
        this.col = col;
        this.id = id;
        this.name = name;
        this.type = type;
        this.exp = exp;
    }

    execute(ast, env, gen) {
        // Obtener valor
        let sym = this.exp.execute(ast, env, gen);
        // Validar tipo
        if(this.type !== sym?.type){
            ast.setNewError({ 
                msg: `El tipo de dato de ${this.name} es incorrecto.`, 
                line: this.line,
                col: this.col
            });
            return;
        }
        // Guardar en entorno
        env.saveVariable(ast, this.line, this.col, this.name, sym);
    }
}