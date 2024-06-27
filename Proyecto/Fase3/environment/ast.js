class Ast {
    constructor() {
        this.console = "";
        this.errors = [];
        this.registers = new Registers()
    }

    setConsole(str){
        this.console += str;
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