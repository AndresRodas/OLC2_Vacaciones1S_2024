
const RootExecuter = (root, ast, env, gen) => {
    const instructions = root?.textSection?.instructions ?? [];
    instructions.forEach(inst => {
        inst.execute(ast, env, gen);       
    });
}

const DataSectionExecuter = (root, ast, env, gen) => {
    const instructions = root?.dataSection ?? [];
    instructions.forEach(inst => {
        inst.execute(ast, env, gen);
    });
}