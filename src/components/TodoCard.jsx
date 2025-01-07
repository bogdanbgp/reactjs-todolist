import React from 'react'

export default function TodoCard(props) {
  const { children, handleDeleteTodo, index, handleEditTodo, handleCheckTodo, todos } = props
  const todo = todos[index]

  return (
    <li className={`todoItem ${todo.isDone ? 'done' : ''}`}>
        {children}
        <div className='actionsContainer'>
            <button onClick={() => handleEditTodo(index)}>
                <i className="fa-solid fa-pen-to-square"></i>
            </button>
            
            <button onClick={() => {
                if (window.confirm("Are you sure you want to delete this item?")) {
                    handleDeleteTodo(index);
                }
            }}>
                <i className="fa-regular fa-trash-can"></i>
            </button>

            <button 
              onClick={() => handleCheckTodo(index)} 
              disabled={todo.isDone}
            >
                <i className={`fa-solid fa-check ${todo.isDone ? 'checked' : ''}`}></i>
            </button>
        </div>
    </li>
  )
}
