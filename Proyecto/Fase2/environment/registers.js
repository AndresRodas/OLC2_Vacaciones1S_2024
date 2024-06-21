class Registers {
    constructor() {
        this.registers = new Array(31).fill(0);
    }

    getRegister(registerIndex) {
        try {
            if (!registerIndex.includes('x')){
                return null;
            }
            let regNumber = parseInt(registerIndex.replace('x', ''));
            if (regNumber >= 0 && regNumber < 32) {
                return this.registers[regNumber];
            } else {
                return null;
            }
        } catch (e) {
            return null;
        }
        
    }

    setRegister(registerIndex, value, ast) {
        // Establecer el valor de un registro específico
        if (registerIndex >= 0 && registerIndex < 32) {
            this.registers[registerIndex] = value;
        } else {
            console.error("Error: Índice de registro no válido.");
        }
    }

    getRegisterHexa(){
        //ToDo:
    }

}