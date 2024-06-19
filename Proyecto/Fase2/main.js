
let errorTable, symbolTable, Arm64Editor, consoleResult;

$(document).ready(function () {

    errorTable = newDataTable('#errorTable',
        [{data: "Type of Error"}, {data: "Description"}, {data: "Row"}, {data: "Column"}, {data: "Datetime"}],
        []);

    symbolTable = newDataTable('#symbolTable',
        [{data: "ID"}, {data: "SymType"}, {data: "DataType"}, {data: "Environment"}, {data: "Row"}, {data: "Column"}],
        []);

    $('.tabs').tabs();
    $("select").formSelect();
    $('.tooltipped').tooltip();

    Arm64Editor = editor('julia__editor', 'text/x-rustsrc');
    consoleResult = editor('console__result', '', false, true, false);
});

function editor(id, language, lineNumbers = true, readOnly = false, styleActiveLine = true) {
    return CodeMirror.fromTextArea(document.getElementById(id), {
        lineNumbers: true,
        styleActivateLine: true,
        matchBrackets: true,
        theme: "moxer",
        mode: "text/x-rustsrc"
    });
}

const openFile = async (editor) => {
    const {value: file} = await Swal.fire({
        title: 'Select File',
        input: 'file',

    })
    if (!file) return

    let reader = new FileReader();

    reader.onload = (e) => {
        const file = e.target.result;
        editor.setValue(file);
    }
    reader.onerror = (e) => {
        console.log("Error to read file", e.target.error)
    }
    reader.readAsText(file)
}

const saveFile = async (fileName, extension, editor) => {
    if (!fileName) {
        const {value: name} = await Swal.fire({
            title: 'Enter File name',
            input: 'text',
            inputLabel: 'File name',
            showCancelButton: true,
            inputValidator: (value) => {
                if (!value) {
                    return 'You need to write something!'
                }
            }
        })
        fileName = name;
    }
    if (fileName) {
        download(`${fileName}.${extension}`, editor.getValue())
    }
}

const download = (name, content) => {
    let blob = new Blob([content], {type: 'text/plain;charset=utf-8'})
    let link = document.getElementById('download');
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", name)
    link.click()
}

const cleanEditor = (editor) => {
    editor.setValue("");
}

function isLexicalError(e) {
    const validIdentifier = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/;
    const validInteger = /^[0-9]+$/;
    const validRegister = /^[a-zA-Z][0-9]+$/;
    const validCharacter = /^[a-zA-Z0-9_$,\[\]#"]$/;
    if (e.found) {
      if (!validIdentifier.test(e.found) && 
          !validInteger.test(e.found) &&
          !validRegister.test(e.found) &&
          !validCharacter.test(e.found)) {
        return true; // Error léxico
      }
    }
    return false; // Error sintáctico
}

const analysis = async () => {
    const text = Arm64Editor.getValue();
    try {
        // Creando ast auxiliar
        let ast = new Ast();
        // Creando entorno global
        let env = new Environment(null, 'Global');
        // Creando generador
        let gen = new Generator();
        // Obteniendo árbol
        let result = PEGGY.parse(text);
        // Ejecutando instrucciones
        RootExecuter(result, ast, env, gen);
        // Generando gráfica
        generateCst(result.CstTree);
        consoleResult.setValue("VALIDO");
    } catch (e) {
        if (e instanceof PEGGY.SyntaxError) {
            if (isLexicalError(e)) {
                consoleResult.setValue('Error Léxico: ' + e.message);
            } else {
                consoleResult.setValue('Error Sintáctico: ' + e.message);
            }
        } else {
            console.error('Error desconocido:', e);
        }
    }
}

const generateCst = (CstObj) => {
    // Creando el arreglo de nodos
    var nodes = new vis.DataSet(CstObj.Nodes);
    // Creando el arreglo de conexiones
    var edges = new vis.DataSet(CstObj.Edges);
    // Obteniendo el elemento a imprimir
    var container = document.getElementById('mynetwork');
    // Agregando data y opciones
    var data = {
        nodes: nodes,
        edges: edges
    };

    var options = {
        layout: {
        hierarchical: {
            direction: "UD",
            sortMethod: "directed",
        },
        },
        nodes: {
            shape: "box"
        },
        edges: { 
            arrows: "to",
        },
    };

    // Generando grafico red
    let network = new vis.Network(container, data, options);
}

const newDataTable = (id, columns, data) => {
    let result = $(id).DataTable({
        responsive: true,
        lengthMenu: [[15, 25, 50, -1], [15, 25, 50, "All"]],
        "lengthChange": true,
        data,
        columns
    });
    $('select').formSelect();
    return result;
}

const btnOpen = document.getElementById('btn__open'),
    btnSave = document.getElementById('btn__save'),
    btnClean = document.getElementById('btn__clean'),
    btnShowCst = document.getElementById('btn__showCST'),
    btnAnalysis = document.getElementById('btn__analysis');

btnOpen.addEventListener('click', () => openFile(Arm64Editor));
btnSave.addEventListener('click', () => saveFile("file", "rs", Arm64Editor));
btnClean.addEventListener('click', () => cleanEditor(Arm64Editor));
btnAnalysis.addEventListener('click', () => analysis());