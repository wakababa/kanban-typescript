import KanbanData from "./KanbanData";

export interface  IKanbanPartition{
    name:string;
    key:string;
    data:KanbanData[];
}

class KanbanPartition implements IKanbanPartition{
    name:string;
    key:string;
    data:KanbanData[]

    constructor(name: string, data?: KanbanData[]) {
        this.name = name
        this.key = name.toLocaleLowerCase()
        this.data = data ?? <KanbanData[]>[]
    }

    getName() {
        return this.name
    }

    setName(value:string) {
        this.name = value
    }

    getKey() {
        return this.key
    }

    setKey() {
        throw new Error("Partition Key cannot set manually")
    }

    getData() {
        return this.data
    }

    setData(initialData:any) {
        this.data = initialData
    }

    appendData(newData:KanbanData) {
        this.data = [...this.data, newData]
    }

    removeData(uuid:string) {
        this.data = this.data.filter(item => item.getId() !== uuid)
    }

    createNewData(name :string, description?:string) {
        let newData = new KanbanData(name, description)
        this.data = [
            ...this.data,
            newData
        ]
    }

}

export default KanbanPartition