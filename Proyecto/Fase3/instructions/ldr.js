class Ldr extends Instruction {

    constructor(line, col, id, reg, variable) {
        super();
        this.line = line;
        this.col = col;
        this.id = id;
        this.reg = reg;
        this.variable = variable;
    }

    execute(ast, env, gen) {
        // Obteniendo valor
        let newValue = env?.getVariable(ast, this.line, this.col, this.variable);
        // Validando retorno
        if (newValue.type === Type.NULL) return;
        // Set register
        newValue.id = this.variable;
        let setReg = ast.registers?.setRegister(this.reg, newValue);
        if (setReg === null) ast.setNewError({ msg: `El registro de destino es incorrecto.`, line: this.line, col: this.col});
    }
}