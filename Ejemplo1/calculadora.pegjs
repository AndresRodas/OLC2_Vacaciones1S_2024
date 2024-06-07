s = e

e = left:t "+" right:e 
    { 
        cst.add("left:t + right:e ")
        return left + right; 
    }
    / t

t = left:f op:("*" / "/") right:t
    {
      return op == "*" ? left * right : left / right;
    }
    / f

f = _ num:[0-9]+ _ 
    { 
        return parseInt(num.join(""), 10);
    }

_ = [ \t\n\r]*
