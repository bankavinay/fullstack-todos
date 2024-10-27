



/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import Create from './Create';
import axios from 'axios';
import { BsFillTrashFill, BsCircleFill, BsFillCheckCircleFill } from 'react-icons/bs';

const Home = () => {
  const [todos, setTodos] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState('');

  // Load todos from the server
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const result = await axios.get('http://localhost:4000/get');
        setTodos(result.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchTodos();
  }, []);

  const handleEdit = (todo) => {
    setEditingId(todo._id);
    setEditingText(todo.task);
  };

  const handleUpdate = (id) => {
    axios.put(`http://localhost:4000/update/${id}`, { task: editingText })
      .then(result => {
        setTodos(todos.map(todo => (todo._id === id ? { ...todo, task: editingText } : todo)));
        setEditingId(null); // Reset editing state
        setEditingText(''); // Clear input
      })
      .catch(err => console.log(err));
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:4000/delete/${id}`)
      .then(() => {
        setTodos(todos.filter(todo => todo._id !== id));
      })
      .catch(err => console.log(err));
  };

  const handleToggleDone = (todo) => {
    axios.put(`http://localhost:4000/update/${todo._id}`, { done: !todo.done })
      .then(result => {
        setTodos(todos.map(t => (t._id === todo._id ? { ...t, done: !t.done } : t)));
      })
      .catch(err => console.log(err));
  };

  return (
    <div>
      <h1>Todo List</h1>
      <Create />
      <br />
      {todos.length === 0 ? (
        <p>There is no record</p>
      ) : (
        todos.map((todo) => (
          <div className="task" key={todo._id}>
            {editingId === todo._id ? (
              <div>
                <input
                  type="text"
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                  onBlur={() => handleUpdate(todo._id)} // Update on blur
                />
                <button onClick={() => handleUpdate(todo._id)}>Save</button>
              </div>
            ) : (
              <div className='checkbox' onClick={() => handleToggleDone(todo)}>
                {todo.done ? (
                  <BsFillCheckCircleFill className='icon' />
                ) : (
                  <BsCircleFill className='icon' />
                )}
                <p className={todo.done ? 'line_through' : ''}>{todo.task}</p>
              </div>
            )}
            <span>
              <BsFillTrashFill className='icon' onClick={() => handleDelete(todo._id)} />
            </span>
          </div>
        ))
      )}
    </div>
  );
};

export default Home;
