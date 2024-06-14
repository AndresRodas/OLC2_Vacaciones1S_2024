
Start
  = gs:GlobalSection _? ds1:DataSection? _? ts:TextSection _? ds2:DataSection? {
    let dataSectionConcat = []
    if (ds1 != null) dataSectionConcat = dataSectionConcat.concat(ds1);
    if (ds2 != null) dataSectionConcat = dataSectionConcat.concat(ds2);
    return new Root(gs, dataSectionConcat, ts);
  }

GlobalSection
  = ".global" _ id:ID _ { return id; }

DataSection
  = ".section .data" _ dec:Declarations*
  / ".data" _ dec:Declarations*

TextSection
  = ".section"? ".text"? _? ident:ID ":" _ ins:Instructions+ {
    return new TextSection(ident, ins);
  }

Instructions
  = ins:Load
  / ins:Store
  / ins:Arithmetic { return ins; }
  / ins:Logic { return ins; }
  / ins:Rotation
  / ins:Jumps

Load
  = "ldr" _ reg1:register COMA _ CIZQ reg2:register CDER
  / "ldrb" _ reg1:register COMA _ CIZQ reg2:register CDER
  / "ldp" _ reg1:register COMA _ reg2:register COMA _ CIZQ reg3:register CDER

Store
  = "str" _ reg1:register COMA _ CIZQ reg2:register CDER

Arithmetic
  = "add" _ reg1:register COMA _ reg2:register COMA _ reg3:register 
  {
    const loc = location()?.start;
    return new Operation(loc?.line, loc?.column, 'add', reg1, reg2, reg3, null);
  }
  / "sub" _ reg1:register COMA _ reg2:register COMA _ reg3:register
  {
    const loc = location()?.start;
    return new Operation(loc?.line, loc?.column, 'sub', reg1, reg2, reg3, null);
  }
  / "mul" _ reg1:register COMA _ reg2:register COMA _ reg3:register
  {
    const loc = location()?.start;
    return new Operation(loc?.line, loc?.column, 'mul', reg1, reg2, reg3, null);
  }
  / "udiv" _ reg1:register COMA _ reg2:register COMA _ reg3:register
  {
    const loc = location()?.start;
    return new Operation(loc?.line, loc?.column, 'udiv', reg1, reg2, reg3, null);
  }
  / "sdiv" _ reg1:register COMA _ reg2:register COMA _ reg3:register
  {
    const loc = location()?.start;
    return new Operation(loc?.line, loc?.column, 'sdiv', reg1, reg2, reg3, null);
  }

Logic
  = "and" _ reg1:register COMA _ reg2:register COMA _ reg3:register
  {
    const loc = location()?.start;
    return new Operation(loc?.line, loc?.column, 'and', reg1, reg2, reg3, null);
  }
  / "orr" _ reg1:register COMA _ reg2:register COMA _ reg3:register
  {
    const loc = location()?.start;
    return new Operation(loc?.line, loc?.column, 'orr', reg1, reg2, reg3, null);
  }
  / "eor" _ reg1:register COMA _ reg2:register COMA _ reg3:register
  {
    const loc = location()?.start;
    return new Operation(loc?.line, loc?.column, 'eor', reg1, reg2, reg3, null);
  }
  / "mvn" _ reg1:register COMA _ reg2:register
  {
    const loc = location()?.start;
    return new Operation(loc?.line, loc?.column, 'mvn', reg1, reg2, null, null);
  }

Rotation
  = "lsl" _ reg1:register COMA _ reg2:register COMA _ "#" _ integer
  / "lsr" _ reg1:register COMA _ reg2:register COMA _ "#" _ integer

Jumps
  = "b" _ ID
  / "bl" _ ID

Declarations
  = id:ID ":" _ "." _ ID _ (integer / string)

register
  = reg:[a-zA-Z][0-9]+ _ { return reg; }

COMA = "," _

CIZQ = "[" _

CDER = "]" _

integer "integer"
  = _ [0-9]+ { return parseInt(text(), 10); }

ID
  = id:([a-zA-Z_][a-zA-Z0-9_]*) _ {
    let completeId = id[0]+id[1]?.join('');
    return completeId; 
  }

string "string"
  = "\"" chars:[^\"]* "\"" _ { return chars.join(''); }

SimpleComment
  = "//" (!EndComment .)* EndComment

EndComment
  = "\r" / "\n" / "\r\n"

_ "whitespace"
  = [ \t\n\r]* (SimpleComment [ \t\n\r]*)*