class Expression {
    // Abstract method
    execute(ast, env, gen) {
        throw new Error('El método execute() debe ser implementado');
    }
}