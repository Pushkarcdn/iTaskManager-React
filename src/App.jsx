import { useEffect, useState } from 'react';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';

function App() {

  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");

  const saveToLS = () => {
    // localStorage.setItem('todos', JSON.stringify(todos))
  }

  useEffect(() => {

    // if (localStorage.getItem('todos')) {
    //   let oldTodos = JSON.parse(localStorage.getItem('todos'))
    //   setTodos(oldTodos)
    // }

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

    // console.log(e, e.target, e.target.name);

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

    // let t = todos.filter((item) => { item.id === id })

    console.log(index)

    setTodo(todos[index].todo);

    handleDelete(e, id, false);

  }

  const handleDelete = (e, id, toConfirm) => {

    // console.log(e.target.name)

    // let id = e.target.name;

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

      <div className=' container bg-purple-200 px-10 py-10 mx-auto my-12 rounded-lg min-h-screen w-2/4'>

        <div className="add-todo py-5 flex flex-col gap-3">

          <p className='font-semibold tracking-wide'>Add a todo</p>

          <div className='flex gap-5'>

            <input type="text" onChange={handleChange} name="" value={todo} id="" placeholder='Enter a todo' className='px-3 py-2 rounded-md outline-0 w-2/4' />

            <input type="button" value="Save" onClick={handleAdd} disabled={todo.length <= 3} className='py-2 bg-purple-900 text-white px-4 rounded-md hover:bg-purple-800 transition-all duration-200 disabled:hover:cursor-not-allowed disabled:bg-purple-950' />

          </div>

        </div>

        <div className="todos-div flex flex-col gap-8 py-10">

          <p className='font-semibold'> {(todos.length === 0) ? 'Your Task list is empty !' : 'Your Task List'}</p>

          <div className="todos flex flex-col gap-3">

            {/* {todos.length === 0 && <p className='py-3'>Tour task list is empty!</p>} */}

            {todos.map((item) => {

              return (

                <div key={item.id} className="todo flex items-center justify-between">

                  <div className='flex gap-4 items-center'>

                    <input name={item.id} onChange={handleCheckbox} type='checkbox' checked={item.isCompleted} />

                    <p className={item.isCompleted ? 'line-through' : ''}>{item.todo}</p>

                  </div>

                  <div className="buttons flex gap-3">

                    <button onClick={(e) => { handleEdit(e, item.id) }} className='py-2 bg-purple-900 text-white px-4 rounded-md hover:bg-purple-950 transition-all duration-200'>Edit</button>

                    <button name={item.id} onClick={(e) => { handleDelete(e, item.id, true) }} className='py-2 bg-purple-900 text-white px-4 rounded-md hover:bg-purple-950 transition-all duration-200'>Delete</button>

                  </div>

                </div>

              )

            })}

          </div>

        </div>

      </div>

    </>
  )
}

export default App