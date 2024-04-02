import { useEffect, useState } from 'react';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { MdDelete, MdOutlineModeEdit } from "react-icons/md";

import Navbar from './components/Navbar'

function App() {

  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");
  const [showCompleted, setShowCompleted] = useState(true);

  const saveToLS = () => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }

  useEffect(() => {

    if (localStorage.getItem('todos')) {
      let oldTodos = JSON.parse(localStorage.getItem('todos'))
      setTodos(oldTodos)
    }

  }, [])

  useEffect(() => {
    saveToLS();
  }, [todos])

  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  const handleAdd = (e) => {

    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    setTodo("")

  }

  const handleCheckbox = (e) => {

    let id = e.target.name;

    let index = todos.findIndex((item) => {
      return item.id === id;
    })

    let newTodos = [...todos]

    newTodos[index].isCompleted = !(newTodos[index].isCompleted);

    setTodos(newTodos);

  }

  const handleEdit = (e, id) => {

    let index = todos.findIndex((item) => {
      return id === item.id;
    })

    console.log(index)

    setTodo(todos[index].todo);

    handleDelete(e, id, false);

  }

  const handleDelete = (e, id, toConfirm) => {

    if (toConfirm) {

      let userChoise = confirm("Are you sure you want to delete this task ? ")

      if (userChoise === true) {

        let index = todos.findIndex((item) => {
          return id === item.id;
        })

        let newTodos = [...todos]

        newTodos.splice(index, 1);

        setTodos(newTodos);

      }

    } else {

      let index = todos.findIndex((item) => {
        return id === item.id;
      })

      let newTodos = [...todos]

      newTodos.splice(index, 1);

      setTodos(newTodos);

    }

  }

  return (

    <>

      <Navbar />

      <div className=' bg-purple-200 py-8 sm:py-12 my-8 sm:my-12 w-[90%] max-w-[800px] mx-auto px-4 sm:px-10 flex flex-col items-center rounded-lg min-h-[500px] tracking-wide '>

        <div className="add-todo flex flex-col gap-4 w-full items-center sm:items-start">

          <p className='font-semibold tracking-wide text-lg'>Add a todo</p>

          <div className='flex gap-5 w-full justify-center items-center flex-col sm:flex-row '>

            <input type="text" onChange={handleChange} name="" value={todo} id="" placeholder='What are you going to do ?' className='px-3 py-2 rounded-md outline-0 w-full sm:w-5/6' />

            <input type="button" value="Save" onClick={handleAdd} disabled={todo.length <= 3} className='py-2 bg-purple-900 text-white px-5 rounded-md hover:bg-purple-800 transition-all duration-200 disabled:hover:cursor-not-allowed disabled:bg-purple-950 w-[100px] sm:w-1/6' />

          </div>

        </div>

        <div className="todos-div flex flex-col gap-10 sm:gap-14 pt-10 items-center w-full max-w-[600px]">

          <div className='flex flex-col gap-4 items-center'>

            <p className='font-semibold'> {(todos.length === 0) ? 'Your Task list is empty !' : 'Your Task List'}</p>

            <div onClick={() => { setShowCompleted(!showCompleted) }} className='cursor-default'><input type="checkbox" name="" id="" checked={showCompleted} onChange={() => { setShowCompleted(!showCompleted) }} /> <span>Show completed tasks</span></div>

          </div>

          <div className="todos flex flex-col gap-3 w-full">

            {/* {todos.length === 0 && <p className='py-3'>Tour task list is empty!</p>} */}

            {todos.map((item) => {

              if (showCompleted || !item.isCompleted) {

                return (<div key={item.id} className="todo flex items-center w-full gap-4 sm:justify-evenly">

                  <div className='flex gap-2 items-center w-full '>

                    <input id={item.id} name={item.id} onChange={handleCheckbox} type='checkbox' checked={item.isCompleted} />

                    <label htmlFor={item.id} className={item.isCompleted ? 'line-through' : ''}>{item.todo}</label>

                  </div>

                  <div className="buttons flex gap-2">

                    <button onClick={(e) => { handleEdit(e, item.id) }} className='py-2 bg-purple-900 text-white px-2 rounded-md hover:bg-purple-950 transition-all duration-200'><MdOutlineModeEdit />
                    </button>

                    <button name={item.id} onClick={(e) => { handleDelete(e, item.id, true) }} className='py-2 bg-purple-900 text-white px-2.5 rounded-md hover:bg-purple-950 transition-all duration-200'><MdDelete /></button>

                  </div>

                </div>)

              }

            })

            }

          </div>

        </div>

      </div>

    </>

  )

}

export default App