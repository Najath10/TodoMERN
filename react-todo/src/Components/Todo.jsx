import React from 'react'
import { useEffect, useRef, useState } from "react";
import "../App.css";
import axios from "axios";


const API_URL = import.meta.env.VITE_API_URL
const Todo = () => {
 
    const [todoList,setTodoList] = useState([]);
    const [newTodo,setNewTodo] = useState("");
    const [editTodo,setEditTodo] = useState(null);
    const [editValue,setEditValue] = useState("");
    const saveRef = useRef(null);


    const fetchTodo = async()=>{
     try {
     const response = await axios.get(API_URL)
     setTodoList(response.data);
     } catch (error) {
       console.log("error Fetching todo");
       }
     }

     useEffect(()=>{
       fetchTodo();
     },[])

     const addTodo = async()=>{
       if (!newTodo.trim()) return alert("emptyy")
       try {
         const response = await axios.post(API_URL,{
           todo:newTodo
         });
         setTodoList(response.data);
         setNewTodo("")
       } catch (error) {
         console.log("cannot add todo");
       }
     }

     const toggleTodo=async (id) => {
       try {
         const response = await axios.patch(`${API_URL}/${id}/toggle`);
         setTodoList(response.data)
       } catch (error) {
         console.error("Error toggling todo:",error);
         
       }
     }

     const deleteTodo =async (id)=>{
        
       try {
         const response = await axios.delete(API_URL,{
           data:{
             _id:id
           }
         })
         setTodoList(response.data)
       } catch (error) {
         console.log("error deleting todo");
       }
     }

   const openEditPopup = (todo)=>{
      
       setEditTodo(todo)
       setEditValue(todo.todo)
   }
   useEffect(()=>{
       if (editTodo ) {
           saveRef.current.focus();
       }
   },[editTodo])

   const saveEdit = async() =>{
     if(!editValue.trim()) return alert("empty input")
     try {
       const response = await axios.put(API_URL,{
         _id:editTodo._id,
         todo:editValue,
         completed:editTodo.completed
       });
       setTodoList(response.data);
       setEditTodo(null)
       setEditValue("")
     } catch (error) {
       console.log("error updating todo");
     }
   }

   const cancelEdit =async()=> {
     setEditTodo(null);
     setEditValue("")
   }


return (
       <div className="container">
         <h1 className="title">Todo List</h1>
         <div className="input-row">
           <input
             type="text"
             value={newTodo}
             onChange={(e) => setNewTodo(e.target.value)}
             onKeyDown={(e) => e.key === "Enter" && addTodo()}
             placeholder="Add a new task"
             className="input"
           />
           <button
             onClick={addTodo}
             className="add-btn"
             disabled={!newTodo.trim()}
           >
             Add Task
           </button>
         </div>
           <ul className="todo-list">
             {todoList.map((todo) => (
               <li key={todo._id} className="todo-item">
                 <span
                   onClick={() => toggleTodo(todo._id)}
                   className={`todo-text ${todo.completed ? "completed" : ""}`}
                 >
                   {todo.todo}
                 </span>
                 <button onClick={() => openEditPopup(todo)} className="edit-btn">
                   Edit
                 </button>
                 <button
                   onClick={() => deleteTodo(todo._id)}
                   className="delete-btn"
                 >
                   Delete
                 </button>
               </li>
             ))}
           </ul>

         {editTodo && (
           <div className="popup-overlay">
             <div className="popup-box">
               <h3>Edit Todo</h3>
               <input
                 type="text"
                 ref={saveRef}
                 value={editValue}
                 onChange={(e) => setEditValue(e.target.value)}
                 className="input"
                 onKeyDown={(e)=>e.key === "Enter" && saveEdit(editTodo._id)}
               />
               <div className="popup-buttons">
                 <button onClick={saveEdit} className="save-btn">
                   Save
                 </button>
                 <button onClick={cancelEdit} className="cancel-btn">
                   Cancel
                 </button>
               </div>
             </div>
           </div>
         )}
       </div>
     );
   };

export default Todo
