class SystemCall extends Instruction {

    constructor(line, col, id, arg) {
        super();
        this.line = line;
        this.col = col;
        this.id = id;
        this.arg = arg;
    }

    execute(ast, env, gen) {
        // Obteniendo parámetros de la llamada
        let regtemp0 = ast?.registers?.getRegister('x0');

        // Comprobando acción a realizar
        if(regtemp0.value === 0) this.stdin(ast, env, gen);  // Se maneja una salida del sistema
        if(regtemp0.value === 1) this.stdout(ast, env, gen);  // Se maneja una salida del sistema
        if(regtemp0.value === 2) this.stderr(ast, env, gen);  // Se maneja una salida del sistema
    }

    stdin(ast, env, gen){ // Entrada estándar
        // ToDo:
    }

    stdout(ast, env, gen){ // Salida estándar 
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

    stderr(ast, env, gen){ // Salida de errores estándar
        // ToDo:
    }
}