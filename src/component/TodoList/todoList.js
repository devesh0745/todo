import {useSelector,useDispatch} from "react-redux";
import { deleteTodoAsync, todoAction, todoSelector, toogleTodoAsync } from "../../redux/reducer/todoReducer";
import { getInitialStateAsync } from "../../redux/reducer/todoReducer";
import {useEffect} from "react";
import "./todoList.css"
export function TodoList(){
    const todos=useSelector(todoSelector);
    //console.log(todos);
    const dispatch=useDispatch()

    useEffect(()=>{
        dispatch(getInitialStateAsync())
    },[])

    function handleToogle(index){
       // dispatch(todoAction.toogle(index))
        dispatch(toogleTodoAsync(index))
    }
    function handleDelete(index){
        dispatch(deleteTodoAsync(index))
    }

    return(
        <div className="todo-list">
  {todos.map((todo, index) => (
    <li className="list" key={index}>
      <div className="title-container">
        <span className={`title-icon ${todo.completed ? 'completed-icon' : 'pending-icon'}`}>
          {todo.completed ? '✓' : '•'}
        </span>
        <p className="title">{todo.title}</p>
      </div>
      <div className="toogle-del">
      <span className={todo.completed ? 'completed' : 'pending'}>{todo.completed ? 'Completed' : 'Pending'}</span>
      <button id="toogle" onClick={() => { handleToogle(todo.id) }}>Toogle</button>
      <button id="delete" onClick={() => { handleDelete(todo.id) }}>X</button>
      </div>
    </li>
  ))}
</div>
    )
}