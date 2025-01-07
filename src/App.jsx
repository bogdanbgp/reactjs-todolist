import { useState, useEffect } from "react"
import TodoInput from "./components/TodoInput"
import TodoList from "./components/TodoList"
import Confetti from "react-confetti"

function App() {
  const [todos, setTodos] = useState([])
  const [todoValue, setTodoValue] = useState('')
  const [confetti, setConfetti] = useState(false)

  function persistData(newList) {
    localStorage.setItem('todos', JSON.stringify({ todos: newList }))
  }

  function handleAddTodos(newTodo) {
    const newTodoList = [...todos, { text: newTodo, isDone: false }]
    persistData(newTodoList)
    setTodos(newTodoList)
  }

  function handleDeleteTodo(index) {
    const newTodoList = todos.filter((todo, todoIndex) => {
      return todoIndex !== index
    })
    persistData(newTodoList)
    setTodos(newTodoList)
  }

  function handleEditTodo(index) {
    const valueToBeEdited = todos[index].text
    setTodoValue(valueToBeEdited)
    handleDeleteTodo(index)
  }

  function handleCheckTodo(index) {
    const newTodoList = [...todos]
    newTodoList[index].isDone = !newTodoList[index].isDone
    persistData(newTodoList)
    setTodos(newTodoList)

    // Ask the user if they want to keep the completed task in the list
    if (newTodoList[index].isDone) {
      const isConfirmed = window.confirm("You completed this successfully! Do you want to keep it on the list?");
      if (!isConfirmed) {
        handleDeleteTodo(index); // Delete the todo if not confirmed
      }
    }

    // Trigger confetti when task is marked as done
    setConfetti(true)
    setTimeout(() => setConfetti(false), 3000) // Hide confetti after 3 seconds
  }

  // add comment here, explain arrow 
  // function and square brackets which are dependency array
  // note: 1. to listen to the change of a varialbe, pass in a variable in [], example: "[todos]"
  // 2. to run on page load, leave the array empty.
  useEffect(() => {
    if (!localStorage) {
      return
    }

    let localTodos = localStorage.getItem('todos')
    if (!localTodos) {
      return
    }

    localTodos = JSON.parse(localTodos).todos
    setTodos(localTodos)

  }, [])

  return (
    <>
      {confetti && <Confetti />}
      <TodoInput todoValue={todoValue} setTodoValue={setTodoValue} handleAddTodos={handleAddTodos} />
      <TodoList 
        handleEditTodo={handleEditTodo} 
        handleDeleteTodo={handleDeleteTodo} 
        handleCheckTodo={handleCheckTodo} 
        todos={todos} 
      />
    </>
  )
}

export default App
