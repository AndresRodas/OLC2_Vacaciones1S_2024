
Expression
  = head:PrintExpr tail:(_ ("+" / "-") _ Term)* {
      return tail.reduce(function(result, element) {
        if (element[1] === "+") { return result + element[3]; }
        if (element[1] === "-") { return result - element[3]; }
      }, head);
    }

PrintExpr
  = "print(" _ text:String _ ")" {
    return text;
  }
  / Term

Term
  = head:Factor tail:(_ ("*" / "/") _ Factor)* {
      return tail.reduce(function(result, element) {
        if (element[1] === "*") { return result * element[3]; }
        if (element[1] === "/") { return result / element[3]; }
      }, head);
    }

Factor
  = "(" _ expr:Expression _ ")" { return expr; }
  / Integer

Integer "integer"
  = _ [0-9]+ { return parseInt(text(), 10); }

String "string"
  = "\"" chars:[^\"]* "\"" { return chars.join(""); }

_ "whitespace"
  = [ \t\n\r]*
