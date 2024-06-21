class Ast {
    constructor() {
        this.console = "VALIDO";
        this.errors = [];
        this.registers = new Registers()
    }

    setNewError(err){
        this.errors.push(err);
    }

    getErrors(){
        return this.errors;
    }

    getConsole(){
        return this.console;
    }
}