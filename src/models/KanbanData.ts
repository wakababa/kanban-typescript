import KanbanIssueTypes from "../types/KanbanIssueTypes";
import KanbanPriorityTypes from "../types/KanbanPriorityTypes";
import { v4 as uuid } from 'uuid';
export interface IKanbanData{
    name:string;
    description:string;
    issueType:string;
    priority:string;
    getId():string
}


class KanbanData implements IKanbanData{
    private readonly _id: string;
    name:string;
    description:string;
    issueType:KanbanIssueTypes;
    priority:KanbanPriorityTypes;
    constructor(name :string, description?:string) {
        this._id =  uuid()
        this.name = name
        this.description = description ?? ""
        this.issueType = KanbanIssueTypes.FEATURE
        this.priority = KanbanPriorityTypes.MEDIUM
    }

    getId() : string {
        return this._id
    }

    getName() {
        return this.name
    }

    setName(value:string) {
        this.name = value
    }

    getDescription() {
        return this.description
    }

    setDescription(value:string) {
        this.description = value
    }

    getPriority() {
        return this.priority
    }

    setPriority(priority:KanbanPriorityTypes) {
        this.priority = priority
    }

    getIssueType() {
        return this.issueType
    }

    setIssueType(issueType:KanbanIssueTypes) {
        this.issueType = issueType
    }

}

export default KanbanData