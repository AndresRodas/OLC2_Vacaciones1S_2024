class Registers {
    constructor() {
        this.registers = new Array(31).fill(0);
    }

    getRegister(registerIndex) {
        try {
            // Validaciones
            if (!registerIndex.includes('x')){
                return null;
            }
            let regNumber = parseInt(registerIndex.replace('x', ''));
            // Obtiene el valor de un registro
            if (regNumber >= 0 && regNumber < 32) {
                return this.registers[regNumber];
            } else {
                return null;
            }
        } catch (e) {
            return null;
        }
    }

    setRegister(registerIndex, value) {
        try {
            // Validaciones
            if (!registerIndex.includes('x')){
                return null;
            }
            let regNumber = parseInt(registerIndex.replace('x', ''));
            // Establecer el valor de un registro específico
            if (regNumber >= 0 && regNumber < 32) {
                this.registers[registerIndex] = value;
            } else {
                return null;
            }
        } catch (e) {
            return null;
        }
    }

    getRegisterHexa(){
        //ToDo:
    }

}