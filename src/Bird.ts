// @ts-ignore
interface IBird {
    name: string;
    id:number;
}
class Bird implements IBird{
    id: number;
    name: string;
    constructor(name: string, id: number) {
        this.name = name;
        this.id = id;
    }

    sayName(){
        return this.name
    }
}
export  default Bird