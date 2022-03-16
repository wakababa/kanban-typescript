import KanbanPartition from "./models/KanbanPartition";
import KanbanData from "./models/KanbanData";
interface IKanban{
    getStore():Array<KanbanPartition>
}
class Kanban implements IKanban{
    private store:KanbanPartition[]
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

    getPartition(key:string | undefined) : KanbanPartition | undefined {
        return this.store.find(p => p.key === key)
    }

    getAllPartitionName() : string[] {
        return this.store.map(p => p.name)
    }

    getStore(): Array<KanbanPartition> {
        return this.store
    }

    moveData(fromPartition: string, toPartition :string,data:KanbanData){
        this.getPartition(fromPartition)?.removeData(data.getId())
        this.getPartition(toPartition)?.appendData(data)

    }

}

export default Kanban