{
  // Creando cst 
  let cst = new Cst();
  // Agregar nodos
  function newPath(idRoot, nameRoot, nodes) {
    cst.addNode(idRoot, nameRoot);
    for (let node of nodes) {
      if (typeof node !== "string"){
        cst.addEdge(idRoot, node?.id);
        continue;
      }
      let newNode = cst.newNode();
      cst.addNode(newNode, node);
      cst.addEdge(idRoot, newNode);
    }
  }
}

Start
  = gs:GlobalSection _? ds1:DataSection? _? ts:TextSection _? ds2:DataSection? {
    let dataSectionConcat = []
    if (ds1 != null) dataSectionConcat = dataSectionConcat.concat(ds1.value);
    if (ds2 != null) dataSectionConcat = dataSectionConcat.concat(ds2.value);
    // Agregando raiz cst
    let idRoot = cst.newNode();
    newPath(idRoot, 'Start', [gs, ds1, ts, ds2]);
    return new Root(gs, dataSectionConcat, ts, cst);
  }

GlobalSection
  = ".global" _ id:ID _ 
  {
    let idRoot = cst.newNode();
    newPath(idRoot, 'GlobalSection', ['.global', id]);
    return { id: idRoot, name: id};
  }

DataSection
  = ".section .data" _ dec:Declarations*
  {
    let idRoot = cst.newNode();
    newPath(idRoot, 'DataSection', ['.section', '.data'].concat(dec));
    return { id: idRoot, value: dec};
  }
  / ".data" _ dec:Declarations*
  {
    let idRoot = cst.newNode();
    newPath(idRoot, 'DataSection', ['.data'].concat(dec));
    return { id: idRoot, value: dec};
  }

TextSection
  = ".section"? ".text"? _? ident:ID ":" _ ins:Instructions+ 
  {
    let idInst = cst.newNode();
    newPath(idInst, ident, ins);
    let idRoot = cst.newNode();
    newPath(idRoot, 'TextSection', [{ id:idInst }]);
    return new TextSection(idRoot, 'TextSection', ident, ins);
  }

Instructions
  = ins:Load
  {
    return ins;
  }
  / ins:Store
  / ins:Move
  {
    return ins;
  }
  / ins:Arithmetic 
  {
    return ins;
  }
  / ins:Logic
  {
    return ins;
  }
  / ins:SystemCall

Load
  = ldr:LDR
  {
    return ldr;
  }

LDR
  = "ldr" _ reg:register COMA _ "=" id:ID
  {
    const loc = location()?.start;
    let idRoot = cst.newNode();
    newPath(idRoot, 'Load', ['ldr', reg, ',', id]);
    return new Ldr(loc?.line, loc?.column, idRoot, reg.name, id); 
  }

Store
  = "str" _ reg1:register COMA _ CIZQ reg2:register CDER

Arithmetic
  = "add" _ reg1:register COMA _ reg2:register COMA _ reg3:register 
  {
    const loc = location()?.start;
    const idRoot = cst.newNode();
    newPath(idRoot, 'Arithmetic', ['add', reg1, 'COMA', reg2, 'COMA', reg3]);
    return new Operation(loc?.line, loc?.column, idRoot, 'Arithmetic', 'add', reg1.name, reg2.name, reg3.name, null);
  }
  / "sub" _ reg1:register COMA _ reg2:register COMA _ reg3:register
  {
    const loc = location()?.start;
    const idRoot = cst.newNode();
    newPath(idRoot, 'Arithmetic', ['sub', reg1, 'COMA', reg2, 'COMA', reg3]);
    return new Operation(loc?.line, loc?.column, idRoot, 'Arithmetic', 'sub', reg1.name, reg2.name, reg3.name, null);
  }
  / "mul" _ reg1:register COMA _ reg2:register COMA _ reg3:register
  {
    const loc = location()?.start;
    const idRoot = cst.newNode();
    newPath(idRoot, 'Arithmetic', ['mul', reg1, 'COMA', reg2, 'COMA', reg3]);
    return new Operation(loc?.line, loc?.column, idRoot, 'Arithmetic', 'mul', reg1.name, reg2.name, reg3.name, null);
  }
  / "udiv" _ reg1:register COMA _ reg2:register COMA _ reg3:register
  {
    const loc = location()?.start;
    const idRoot = cst.newNode();
    newPath(idRoot, 'Arithmetic', ['udiv', reg1, 'COMA', reg2, 'COMA', reg3]);
    return new Operation(loc?.line, loc?.column, idRoot, 'Arithmetic', 'udiv', reg1.name, reg2.name, reg3.name, null);
  }
  / "sdiv" _ reg1:register COMA _ reg2:register COMA _ reg3:register
  {
    const loc = location()?.start;
    const idRoot = cst.newNode();
    newPath(idRoot, 'Arithmetic', ['sdiv', reg1, 'COMA', reg2, 'COMA', reg3]);
    return new Operation(loc?.line, loc?.column, idRoot, 'Arithmetic', 'sdiv', reg1.name, reg2.name, reg3.name, null);
  }

Logic
  = "and" _ reg1:register COMA _ reg2:register COMA _ reg3:register
  {
    const loc = location()?.start;
    let idRoot = cst.newNode();
    newPath(idRoot, 'Logic', ['and', reg1, 'COMA', reg2, 'COMA', reg3]);
    return new Operation(loc?.line, loc?.column, idRoot, 'Logic', 'and', reg1.name, reg2.name, reg3.name, null);
  }
  / "orr" _ reg1:register COMA _ reg2:register COMA _ reg3:register
  {
    const loc = location()?.start;
    let idRoot = cst.newNode();
    newPath(idRoot, 'Logic', ['orr', reg1, 'COMA', reg2, 'COMA', reg3]);
    return new Operation(loc?.line, loc?.column, idRoot, 'Logic', 'orr', reg1.name, reg2.name, reg3.name, null);
  }
  / "eor" _ reg1:register COMA _ reg2:register COMA _ reg3:register
  {
    const loc = location()?.start;
    let idRoot = cst.newNode();
    newPath(idRoot, 'Logic', ['eor', reg1, 'COMA', reg2, 'COMA', reg3]);
    return new Operation(loc?.line, loc?.column, idRoot, 'Logic', 'eor', reg1.name, reg2.name, reg3.name, null);
  }
  / "mvn" _ reg1:register COMA _ reg2:register
  {
    const loc = location()?.start;
    let idRoot = cst.newNode();
    newPath(idRoot, 'Logic', ['mvn', reg1, 'COMA', reg2]);
    return new Operation(loc?.line, loc?.column, idRoot, 'Logic', 'mvn', reg1.name, reg2.name, null, null);
  }

Move
  = "mov" _ reg1:register COMA _ reg2:register
  {
    const loc = location()?.start;
    const idRoot = cst.newNode();
    newPath(idRoot, 'Move', ['mov', reg1, 'COMA', reg2]);
    return new Move(loc?.line, loc?.column, idRoot, reg1.name, reg2.name);
  }
  / "mov" _ reg:register COMA _ int:integer
  {
    const loc = location()?.start;
    const idRoot = cst.newNode();
    newPath(idRoot, 'Move', ['mov', reg, 'COMA', int]);
    return new Move(loc?.line, loc?.column, idRoot, reg.name, int);
  }



SystemCall
  = "svc" _ int:integer 
  {
    const loc = location()?.start;
    let idRoot = cst.newNode();
    newPath(idRoot, 'SystemCall', ["svc", int]);
    return new SystemCall(loc?.line, loc?.column, idRoot, int);
  }

Declarations
  = id:ID ":" _ "." _ type:TYPE _ exp:primitive
  {
    const loc = location()?.start;
    let idRoot = cst.newNode();
    newPath(idRoot, 'Declaration', [id, ":", type, exp]);
    return new Declaration(loc?.line, loc?.column, idRoot, id, type.value, exp);
  }

TYPE
  = "asciz"
  {
    let idRoot = cst.newNode();
    newPath(idRoot, 'TYPE', ['asciz']);
    return { id: idRoot, value: Type.ASCIZ }
  }
  / "ascii"
  {
    let idRoot = cst.newNode();
    newPath(idRoot, 'TYPE', ['ascii']);
    return { id: idRoot, value: Type.ASCIZ }
  }
  / "space"
  {
    let idRoot = cst.newNode();
    newPath(idRoot, 'TYPE', ['space']);
    return { id: idRoot, value: Type.SPACE }
  }
  / "skip"
  {
    let idRoot = cst.newNode();
    newPath(idRoot, 'TYPE', ['skip']);
    return { id: idRoot, value: Type.SKIP }
  }

register
  = [a-zA-Z][0-9]+ _ 
  {
    let idRoot = cst.newNode(); 
    //newPath(idRoot, 'register', [text()]);
    return { id: idRoot, name: text() }
  }

ID
  = id:([a-zA-Z_][a-zA-Z0-9_]*) _ 
  {
    let completeId = id[0]+id[1]?.join('');
    return completeId; 
  }

primitive
  = str:string { return str }
  / int:integer { return int }

integer "integer"
  = _ [0-9]+ _
  {
    const loc = location()?.start;
    let idRoot = cst.newNode();
    newPath(idRoot, 'integer', [text()]);
    return new Primitive(loc?.line, loc?.column, idRoot, 'integer', Type.SPACE, parseInt(text(), 10));
  }

string "string"
  = "\"" chars:[^\"]* "\"" _ 
  {
    const loc = location()?.start;
    let idRoot = cst.newNode();
    newPath(idRoot, 'string', [chars.join('')]);
    return new Primitive(loc?.line, loc?.column, idRoot, 'string', Type.ASCIZ, chars.join(''));
  }

/********** LEXER **********/

COMA = "," _

CIZQ = "[" _

CDER = "]" _

SimpleComment
  = "//" (!EndComment .)* EndComment

EndComment
  = "\r" / "\n" / "\r\n"

_ "whitespace"
  = [ \t\n\r]* (SimpleComment [ \t\n\r]*)*