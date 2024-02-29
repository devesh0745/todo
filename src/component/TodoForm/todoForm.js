import {useState} from "react";
import {useDispatch} from "react-redux";
import { addTodoAsync} from "../../redux/reducer/todoReducer";
import './todoForm.css';
import { FaCheckSquare } from 'react-icons/fa';


export function TodoForm(){
    const [todoText,setTodoText]=useState("");
    const dispatch=useDispatch();

    function handleSubmit(e){
        e.preventDefault();
       // console.log(todoText);
        dispatch(addTodoAsync(todoText));
        setTodoText(" ");
    }
    return(
        <>
        <h1 className="heading">
        <FaCheckSquare /> TODO LIST
      </h1>
        <form onSubmit={handleSubmit} className="form">
            <div  className="input">
            <input placeholder="Add Todo"
            type="text"
            value={todoText}
            onChange={(e)=>setTodoText(e.target.value)}
            />
            </div>
            <div className="add-btn">
            <button  type="submit">Add Todo</button>
            </div>
        </form>
        </>
    )
}