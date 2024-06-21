class Ast {
    constructor() {
        this.console = "";
        this.errors = [];
        this.registers = new Registers()
    }

    setNewError(err){
        this.errors.push(err);
    }

}