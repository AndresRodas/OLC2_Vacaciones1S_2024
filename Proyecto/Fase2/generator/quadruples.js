class Quadruples {

    constructor(line, col, op, arg1, arg2, arg3, res ) {
        this.line = line;
        this.col = col;
        this.op = op;
        this.arg1 = arg1;
        this.arg2 = arg2;
        this.arg3 = arg3;
        this.res = res;
    }

    getQuad() {
        return [this.op, this.arg1, this.arg2, this.arg3, this.res];
    }

    setOperator(op){
        this.op = op;
    }

    getOperator(){
        return this.op;
    }

    setArg1(arg1){
        this.arg1 = arg1;
    }

    getArg1(){
        return this.arg1;
    }

    setArg2(arg2){
        this.arg2 = arg2;
    }

    getArg2(){
        return this.arg2;
    }

    setArg3(arg3){
        this.arg3 = arg3;
    }

    getArg3(){
        return this.arg3;
    }

    setResult(res){
        this.res = res;
    }

    getResult(){
        return this.res;
    }

}