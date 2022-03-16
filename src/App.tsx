import React, {useEffect, useState} from 'react';
import Kanban from "./Kanban";
import { RiDeleteBin7Line } from 'react-icons/ri';
import { AiFillCloseCircle } from 'react-icons/ai';
import { BiCommentAdd } from 'react-icons/bi';
import KanbanData from "./models/KanbanData";
import KanbanPartition from "./models/KanbanPartition";

const kanban = new Kanban();
const handleLoadData=()=>{
  let backlog = kanban.createNewPartition("backlog")
  let dev = kanban.createNewPartition("dev")
  let test = kanban.createNewPartition("test")
  let done = kanban.createNewPartition("done")
  let blocked = kanban.createNewPartition("blocked")
  backlog.createNewData("First Issue","")
  backlog.createNewData("Second Issue","")
  backlog.createNewData("Third Issue","")
  dev.createNewData("Bug Issue","")
  dev.createNewData("Feature Issue")
  dev.createNewData("Error Issue")
  test.createNewData("Test")
  done.createNewData("Initial Project")
  blocked.createNewData("Block Issue")

}
handleLoadData()

type ModalProps ={
  data:KanbanData;
  partition:KanbanPartition;
  onClose():void;
  update():void;
}

const Modal=({data,partition,onClose,update} :ModalProps )  =>{
  const {name,description,issueType,priority} = data
  const [editName,setName] = useState(name)
  const [editDescription,setDescription] = useState(description)
  const [editIssueType,setIssueType] = useState(issueType)
  const [editPriority,setPriority] = useState(priority)

  return(
      <div style={{display:"flex",justifyContent:"center",alignItems:"center",backgroundColor:"#dedede",position:"absolute",width:"100%",height:"100%",top:0,left:0,opacity:0.8}}>
        <div style={{justifyContent:"center",padding:10,border:"1px solid black"}}>
          {/*<div style={{display:"flex",flexDirection:"row",alignItems:"center"}}>*/}
          {/*  <AiFillCloseCircle  size={25} onClick={onClose}/>*/}
          {/*</div>*/}
          <input  onChange={(e)=>setName(e.target.value)} type={"text"} value={editName}/>
          <div style={{display:"flex",flexDirection:"column",gap:5}}>
            <label style={{display:"flex",alignSelf:"flex-start",fontSize:16}}>Description</label>
            <textarea  onChange={(e)=>setDescription(e.target.value)} value={editDescription} placeholder={"Description"}>{description}</textarea>
          </div>
          <button onClick={()=>{

            data.setName(editName)
            data.setDescription(editDescription)
            data.setIssueType(editIssueType)
            data.setPriority(editPriority)
            update()
            onClose()

          }} style={{marginLeft:"auto"}}>SAVE</button>
        </div>
      </div>
  )
}
type IssueProps ={
  data:KanbanData;
  partition:KanbanPartition;
  update():void;
}

const Issue=({data,partition,update}:IssueProps)=>{
  const [open,setOpen] = useState(false)
  const {name,description,issueType,priority} = data
  const handleClose=()=>setOpen(false)
  return(
      <div>
        <button onClick={()=>setOpen(true)} key={data.getId()} style={{border: "1px solid black",backgroundColor:"#eee0a8",width:"100%"}}>
          <h2>{name}</h2>
        </button>
        {open && <Modal data={data} partition={partition} onClose={handleClose} update={update}/>}
      </div>
  )
}
type SettingsProps ={
  data:KanbanData;
  partition:KanbanPartition;
  update():void;
}
const Settings =({data,partition,update}:SettingsProps)=>{
  const [key, setKey] = useState(Date.now())

  return(
      <div key={data.getId()} style={{backgroundColor:"#d0cece",display:"flex",justifyContent:"space-between",padding:1,marginBottom:5}}>
        <select value={partition.name} onChange={(e)=> {
          kanban.moveData(partition.name, e.target.value,data)
          update()
        }}>
          {  kanban.getAllPartitionName().map((name,key)=>{
            return(
                <option
                    key={key}
                    value={name}>
                  {name}
                </option>
            )
          })}
        </select>
      </div>
  )
}
function App() {

  const [key, setKey] = useState(Date.now())


  const update =()=>{
    setKey(Date.now())
  }

  if(!kanban){
    return <>....</>
  }

  interface AppContextInterface {
    kanban: Kanban;
    partition: KanbanPartition;
    data: string;
  }

  return (
      <div className="App">
        <div style={{display: "flex",padding:2}}>
          {kanban.getStore().map((partition,key) =>
              <div key={key} style={{border: "1px solid black", padding: 5,width:"100%",marginBottom:5,height:"94vh"}}>
                <div style={{display:"flex",flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}>
                  <h2 style={{backgroundColor:"#e7e7e7",width:"100%"}}>{partition.name.toUpperCase()}</h2>
                  {/*<BiCommentAdd />*/}
                </div>
                {partition.data.map((data,key) =>

                    <div>
                      <Issue data={data} partition={partition} update={update}/>
                      <Settings data={data} partition={partition} update={update}/>
                    </div>

                )}
              </div>
          )}
        </div>
      </div>
  );
}
export default App;
