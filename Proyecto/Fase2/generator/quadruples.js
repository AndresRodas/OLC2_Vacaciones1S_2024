class Quadruples {
    constructor() {
        this.op = '-';
        this.arg1 = '-';
        this.arg2 = '-';
        this.arg3 = '-';
        this.res = '-';
    }

    getQuadruple() {
        return {
            Op: this.op,
            Arg1: this.arg1,
            Arg2: this.arg2,
            Arg3: this.arg3,
            Result: this.res,
        };
    }

    setOperator(op){
        if(op) this.op = op;
    }

    getOperator(){
        return this.op;
    }

    setArg1(arg1){
        if(arg1) this.arg1 = arg1;
    }

    getArg1(){
        return this.arg1;
    }

    setArg2(arg2){
        if(arg2) this.arg2 = arg2;
    }

    getArg2(){
        return this.arg2;
    }

    setArg3(arg3){
        if(arg3) this.arg3 = arg3;
    }

    getArg3(){
        return this.arg3;
    }

    setResult(res){
        if(res) this.res = res;
    }

    getResult(){
        return this.res;
    }

}