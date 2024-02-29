import {createSlice,createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

const initialState={
    todos:[]
}

//CAT to fetch the todos.(GET REQ)
export const getInitialStateAsync=createAsyncThunk(
    "todo/getInitialState",
   async ()=>{
    try{
       return await axios.get("https://jsonplaceholder.typicode.com/todos");
    }catch(error){
        console.log("error:",error);
    }
    }
)

//CAT to add todo.(POST REQ)
export const addTodoAsync=createAsyncThunk(
    "todo/addTodo", 
    async (payload)=>{
        const response=await fetch("https://jsonplaceholder.typicode.com/todos",{
        method:"POST",
        headers:{
            "content-type":"application/json"
        },
        
        body:JSON.stringify({
            title:payload,
            completed:false
        })
        //JSON.stringify(payload)
    }); 
    //It will return a promise.
    return response.json();
})
//CAT to toogle todo.(PUT REQ)
export const toogleTodoAsync=createAsyncThunk(
    "todo/toogleTodo",
    async (payload)=>{
        const response=await fetch(`https://jsonplaceholder.typicode.com/todos/${payload}`,{
            method:"PUT",
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify({
                id:payload
            })
        })
        return response.json();
    }

)
//CAT to delete todo.(DELETE REQ)
export const deleteTodoAsync = createAsyncThunk(
    'todo/deleteTodo',
    async (payload) => {
      try {
        console.log('id:', payload);
  
        const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${payload}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
       
  
        // For successful DELETE requests, return an object indicating success
        return { id: payload };
      } catch (error) {
        console.error('Error during DELETE request:', error);
        // Rethrow the error to make it visible in the action payload
        throw error;
      }
    }
  );
  

export const todoSlice=createSlice({
    name:"todo",
    initialState:initialState,
    reducers:{
        

    },
    //Extra reducer to Get todo
    extraReducers:(builder)=>{
        builder.addCase(getInitialStateAsync.fulfilled,(state,action)=>{
            console.log(action.payload)
            state.todos=[...action.payload.data]
        })
        //Extra reducer to add todo.
        .addCase(addTodoAsync.fulfilled,(state,action)=>{
            state.todos.unshift(action.payload)
            state.todos.map((todo,i)=>{
            })
            console.log(state.todos.length)
           
        })
        //Extra reducer to delete todo.
        .addCase(deleteTodoAsync.fulfilled,(state,action)=>{
            console.log("delete id:",action.payload)
            state.todos = state.todos.filter(todo => todo.id !== action.payload.id);
        })
        //Extra reducer for toogle todo.
        .addCase(toogleTodoAsync.fulfilled,(state,action)=>{
            console.log("update id:",action.payload)
            state.todos.map((todo,i)=>{
                if(todo.id===action.payload.id){
                    console.log(todo.id)
                    todo.completed=!todo.completed
                }
            })
        })
    }

})
export const todoReducer=todoSlice.reducer;
export const todoAction=todoSlice.actions;
export const todoSelector=(state)=>state.todoReducer.todos