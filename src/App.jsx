import { useState, useEffect } from "react";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import Confetti from "react-confetti";

function App() {
  const [todos, setTodos] = useState([]);
  const [todoValue, setTodoValue] = useState("");
  const [streak, setStreak] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);

  function persistData(newList) {
    localStorage.setItem("todos", JSON.stringify({ todos: newList }));
  }

  function handleAddTodos(newTodo) {
    if (newTodo.toLowerCase() === "bogdyhh") {
      alert("You found the Easter egg! Keep being awesome!");
      return;
    }

    const newTodoList = [...todos, newTodo];
    persistData(newTodoList);
    setTodos(newTodoList);
  }

  function handleDeleteTodo(index) {
    const newTodoList = todos.filter((todo, todoIndex) => todoIndex !== index);
    persistData(newTodoList);
    setTodos(newTodoList);
  }

  function handleEditTodo(index) {
    const valueToBeEdited = todos[index];
    setTodoValue(valueToBeEdited);
    handleDeleteTodo(index);
  }

  function handleCompleteTodo(index) {
    setCompletedCount((prev) => prev + 1);
    const newStreak = streak + 1;
    setStreak(newStreak);
    handleDeleteTodo(index);

    if (newStreak % 3 === 0) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000); // Show confetti for 3 seconds
    }
  }

  useEffect(() => {
    if (!localStorage) return;

    let localTodos = localStorage.getItem("todos");
    if (!localTodos) return;

    localTodos = JSON.parse(localTodos).todos;
    setTodos(localTodos);
  }, []);

  return (
    <>
      {showConfetti && <Confetti />}
      <header style={{ textAlign: "center", marginBottom: "20px" }}>
        <h1>Todo List by Bogdyhh</h1>
        <p>Streak: {streak} | Tasks Completed: {completedCount}</p>
      </header>
      <TodoInput
        todoValue={todoValue}
        setTodoValue={setTodoValue}
        handleAddTodos={handleAddTodos}
      />
      <TodoList
        handleEditTodo={handleEditTodo}
        handleDeleteTodo={handleDeleteTodo}
        handleCompleteTodo={handleCompleteTodo}
        todos={todos}
      />
      <footer style={{ textAlign: "center", marginTop: "20px" }}>
        <p>Crafted with ❤️ by Bogdyhh</p>
      </footer>
    </>
  );
}

export default App;
