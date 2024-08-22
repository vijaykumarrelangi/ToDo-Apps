import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import './TodoContainer.css';
import AddTaskForm from './toDos/AddTaskForm';
import UpdateForm from './toDos/UpdateForm';
import ToDo from './toDos/ToDo';

function TodoContainer({ fakeTodosArr }) {
  const [todos, setTodos] = useState(fakeTodosArr || []);
  const [newTask, setNewTask] = useState('');
  const [updateData, setUpdateData] = useState('');

  const addTaskHandler = () => {
    if (newTask) {
      let newEntry = { id: Date.now(), title: newTask, completed: false };
      setTodos([newEntry, ...todos]);
      setNewTask('');
    }
  };

  const deleteTaskHandler = (id) => {
    Array.isArray(todos) && setTodos(todos.filter((todo) => todo.id !== id));
  };

  const markDoneHandler = (id) => {
    Array.isArray(todos) &&
      setTodos(
        todos.map((todo) =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo
        )
      );
  };

  const cancelUpdateHandler = () => {
    setUpdateData('');
  };

  const changeTaskHandler = (e) => {
    let newEntry = {
      id: updateData.id,
      title: e.target.value,
      completed: updateData.completed ? true : false,
    };
    setUpdateData(newEntry);
  };

  const updateTaskHandler = () => {
    Array.isArray(todos) &&
      setTodos(
        todos.filter((task) => task.id !== updateData.id).concat(updateData)
      );
    setUpdateData('');
  };

  return (
    <React.Fragment>
      <h2 id="todo-heading">React ToDo App</h2>
      <div className="container App">
        {updateData && updateData ? (
          <UpdateForm
            updateData={updateData}
            OnChangeTask={changeTaskHandler}
            onUpdateTask={updateTaskHandler}
            onCancelUpdate={cancelUpdateHandler}
          />
        ) : (
          <AddTaskForm
            newTask={newTask}
            setNewTask={setNewTask}
            onAddTask={addTaskHandler}
          />
        )}
        <ToDo
          todos={todos}
          onMarkDone={markDoneHandler}
          onDeleteTask={deleteTaskHandler}
          setUpdateData={setUpdateData}
        />
      </div>
    </React.Fragment>
  );
}

TodoContainer.defaultProps = {
  fakeTodosArr: [],
};

export default TodoContainer;
