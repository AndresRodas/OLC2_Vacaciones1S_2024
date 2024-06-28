
const RootExecuter = async (root, ast, env, gen) => {
    const instructions = root?.textSection?.instructions ?? [];
    await instructions.forEach(async inst => {
        inst.execute(ast, env, gen);       
    });
}

const DataSectionExecuter = async (root, ast, env, gen) => {
    const instructions = root?.dataSection ?? [];
    await instructions.forEach(async inst => {
        inst.execute(ast, env, gen);
    });
}