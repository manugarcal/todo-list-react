import { useRef, useState } from "react"
import DeleteAll from "./DeleteAll"
import Header from "./Header"
import InputTask from "./InputTask"
import TaskList from "./TaskList"

const Container = () => {

    let inputRef = useRef(null);
    let emptyLiRef = useRef(null)
    const [items, setItems] = useState([]);
    const newItem = (e) => {
        if (inputRef.value !== "" && e.keyCode === 13) {
            setItems(items.concat(inputRef.value));
            inputRef.value = "";
            emptyLiRef.current.className = "newClass"
        } else if (inputRef.value !== "" && e.type === "click") {
            setItems(items.concat(inputRef.value));
            inputRef.value = "";
            emptyLiRef.current.className = "newClass"
        }
    }
    const iref = (r) => {
        inputRef = r
    }

    const dlt = (i) => {    
     items.splice(i, 1);
     setItems([...items]);
    } 

    const deleteAll = () => {
        setItems([]);
    }

    const liGenerator = items.map((newValue, i) => {
            return <li key={i} className="list-group-item list-group-item-action list-group-item-success">{newValue}<i onClick={() => dlt(i)} className="float-right fas fa-trash"></i></li>
    })
    const emptyLi = <li ref={emptyLiRef} className="list-group-item list-group-item-action list-group-item-danger">No task</li>
    
    const handleSubmit = e => {
     e.preventDefault();
    }
    return (
        <div className="container card w-75 mt-3">
            <Header />
            <InputTask handleSubmit={handleSubmit} newItem={newItem} item={items} iRef={iref} inputRef={inputRef} />
            <TaskList emptyLi={emptyLi} liGenerator={liGenerator} />
            <DeleteAll deleteAll={deleteAll} />
        </div>
    )
}
export default Container;