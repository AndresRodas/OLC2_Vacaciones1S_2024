{
  class CST {
    constructor() {
      this.text = [];
    }

    addNode(node) {
      this.text.push(node)
    }

    getOutput(){
      return this.text.join()
    }
  }
}

Start
  = gs:GlobalSection? _? ds:DataSection _ ts:TextSection {
    ts.addNode('Start -> GlobalSection;')
    ts.addNode('Start -> DataSection;')
    ts.addNode('Start -> TextSection;')
    return ts
  }

GlobalSection
  = ".global" _ ID _ 

DataSection
  = ".section .data" _ dec:Declarations*

TextSection
  = ".section .text" _ ident:ID ":" _ ins:Instructions {
    ins.addNode('TextSection -> sectionText;')
    ins.addNode(`TextSection -> ID;`)
    ins.addNode('TextSection -> DosPuntos;')
    ins.addNode('TextSection -> Instructions;')
    return ins
}

Instructions
  = ins:Load
  / ins:Store
  / ins:Arithmetic {
    ins.addNode(`Instructions -> Arithmetic;`)
    return ins
  }
  / ins:Logic {
    ins.addNode(`Instructions -> Logic;`)
    return ins
  }
  / ins:Rotation
  / ins:Jumps

Load
  = "LDR" _ reg1:register COMA _ CIZQ reg2:register CDER
  / "LDRB" _ reg1:register COMA _ CIZQ reg2:register CDER
  / "LDP" _ reg1:register COMA _ reg2:register COMA _ CIZQ reg3:register CDER

Store
  = "STR" _ reg1:register COMA _ CIZQ reg2:register CDER

Arithmetic
  = "ADD" _ reg1:register COMA _ reg2:register COMA _ reg3:register {
    let Cst = new CST();
    Cst.addNode(`Arithmetic -> ADD;`)
    Cst.addNode(`Arithmetic -> ${reg1}1;`)
    Cst.addNode(`Arithmetic -> COMA1;`)
    Cst.addNode(`Arithmetic -> ${reg2}2;`)
    Cst.addNode(`Arithmetic -> COMA2;`)
    Cst.addNode(`Arithmetic -> ${reg3}3;`)
    return Cst
  }
  / "SUB" _ reg1:register COMA _ reg2:register COMA _ reg3:register
  / "MUL" _ reg1:register COMA _ reg2:register COMA _ reg3:register
  / "UDIV" _ reg1:register COMA _ reg2:register COMA _ reg3:register
  / "SDIV" _ reg1:register COMA _ reg2:register COMA _ reg3:register

Logic
  = "AND" _ reg1:register COMA _ reg2:register COMA _ reg3:register
  / "ORR" _ reg1:register COMA _ reg2:register COMA _ reg3:register
  / "EOR" _ reg1:register COMA _ reg2:register COMA _ reg3:register
  / "MVN" _ reg1:register COMA _ reg2:register

Rotation
  = "LSL" _ reg1:register COMA _ reg2:register COMA _ "#" _ integer
  / "LSR" _ reg1:register COMA _ reg2:register COMA _ "#" _ integer

Jumps
  = "B" _ ID
  / "BL" _ ID

Declarations
  = id:ID ":" _ "." _ ID _ (integer / string)

register
  = reg:[a-zA-Z][0-9]+ _ {
    return reg
  }

COMA = "," _

CIZQ = "[" _

CDER = "]" _

integer "integer"
  = _ [0-9]+ { return parseInt(text(), 10); }

ID
  = id:([a-zA-Z_$][a-zA-Z0-9_$]*) _ { 
    console.log(id)
    return id; 
  }

string "string"
  = "\"" chars:[^\"]* "\"" _ { return chars.join(""); }

_ "whitespace"
  = [ \t\n\r]*