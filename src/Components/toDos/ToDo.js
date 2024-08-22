
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faPen, faTrashCan } from '@fortawesome/free-solid-svg-icons';

const ToDo = ({ onDeleteTask, onMarkDone, setUpdateData }) => {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('https://dummyjson.com/todos')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data.todos)) {
          setTodos(data.todos);
        } else {
          console.error('Expected an array of todos');
        }
        setIsLoading(false);
      });
  }, []);

  return (
    <React.Fragment>
      {isLoading && <p>Loading...</p>}
      {Array.isArray(todos) && todos.map((task, index) => {
        return (
          <div key={task.id}>
            <div className="col taskBg">
              {/* setting class name on Complete Condition */}
              <div className={task.completed ? 'done' : ''}>
                <span className="taskNumber">{index + 1}</span>
                <span className="taskText">{task.todo}</span>
              </div>
              <div className="iconsWrap">
                <span title='Completed / Not Completed' onClick={() => onMarkDone(task.id)} >
                  <FontAwesomeIcon icon={faCircleCheck} />
                </span>
                {/* checking Task Is Compleated Or Not */}
                {task.completed ? null : (
                  <span title='Edit' onClick={() => setUpdateData({id: task.id,
                    title: task.todo,
                    completed: task.completed ? true : false })} >
                    <FontAwesomeIcon icon={faPen} />
                  </span>
                )}
                <span title='Delete' onClick={() => onDeleteTask(task.id)} >
                  <FontAwesomeIcon icon={faTrashCan} />
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </React.Fragment>
  );
};

export default ToDo;
