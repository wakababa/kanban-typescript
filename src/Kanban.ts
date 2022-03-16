import KanbanPartition from "./models/KanbanPartition";
import KanbanData from "./models/KanbanData";
interface IKanban{
    store:Array<KanbanPartition>
}
class Kanban implements IKanban{
    store:KanbanPartition[]
    constructor() {
        this.store = <KanbanPartition[]>[]
    }

    setInitialStore(store:Array<KanbanPartition>) {
        this.store = store
    }

    createNewPartition(name:string, data?:KanbanData[]):KanbanPartition {
        let newPartition = new KanbanPartition(name, data)
        this.store = [
            ...this.store,
            newPartition
        ]
        return newPartition
    }

    getPartition(key:string) {
        return this.store.find(p => p.key === key)
    }
    moveData(toPartition :string,data:KanbanData){
        const copyStore = this.store
        const toIndex = this.store.findIndex(store=>store.name ===toPartition)
        copyStore[toIndex].data =[...copyStore[toIndex].data,data]
        this.store = copyStore
    }
    editData(partitionName:string,data:KanbanData){
        const copyStore = this.store
        const index = this.store.findIndex(store=>store.name ===partitionName)
        const dataIndex = copyStore[index].data.findIndex(d=>d.getId() === data.getId())
        copyStore[index].data[dataIndex] =data
        this.store = copyStore
    }
}

export default Kanban