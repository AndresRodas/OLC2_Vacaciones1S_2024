class SystemCall extends Instruction {

    constructor(line, col, id, arg) {
        super();
        this.line = line;
        this.col = col;
        this.id = id;
        this.arg = arg;
    }

    async execute(ast, env, gen) {
        // Obteniendo parámetros de la llamada
        let regtemp0 = ast?.registers?.getRegister('x0');

        // Comprobando acción a realizar
        if(regtemp0.value === 0) await this.stdin(ast, env, gen);  // Se maneja una entrada del sistema
        if(regtemp0.value === 1) await this.stdout(ast, env, gen);  // Se maneja una salida del sistema
        if(regtemp0.value === 2) await this.stderr(ast, env, gen);  // Se maneja un error
    }

    async stdin(ast, env, gen) { // Entrada estándar
        let regtemp8 = ast?.registers?.getRegister('x8');
        // Validar número de llamada al sistema
        if(regtemp8.value === 63){ // read
            // realizando una lectura en el sistema
            const stdInputText = await window.openModal();
            const idBuffer = ast?.registers?.getRegister('x1')?.id;
            let length = ast?.registers?.getRegister('x2');
            // Creando nuevo simbolo
            let sym = new Symbol(this.line, this.col, idBuffer, Type.ASCIZ, '');
            // Agregando valores segun tamaño
            for (let i = 0; i < length.value; i++) {
                sym.value += stdInputText[i] ?? '0';
            }
            // Guardando la data obtenida
            env.setVariable(ast, this.line, this.col, idBuffer, sym)
        }
    }

    async stdout(ast, env, gen){ // Salida estándar 
        let regtemp8 = ast?.registers?.getRegister('x8');
        // Validar número de llamada al sistema
        if(regtemp8.value === 64){ // write
            let msg = ast?.registers?.getRegister('x1');
            let length = ast?.registers?.getRegister('x2');
            let strMsg = msg.value;
            for (let i = 0; i < length.value; i++) {
                ast?.setConsole(strMsg[i]);
            }
        } 
        if(regtemp8.value === 93){ // end
            return;
        }
    }

    async stderr(ast, env, gen){ // Salida de errores estándar
        // ToDo:
    }
}