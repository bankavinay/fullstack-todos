

// /* eslint-disable no-unused-vars */
// import React, { useState } from 'react';
// import axios from 'axios';

// const Create = () => {
//   const [task, setTask] = useState('');

//   const handleAdd = () => {
//     if (!task) return; // Prevent empty task submissions
//     axios.post('http://localhost:4000/add', { task: task })
//       .then(result => {
//         setTask(''); // Reset the input field
//         window.location.reload(); // Reload to fetch updated todos
//       })
//       .catch(err => console.log(err));
//   };

//   return (
//     <div>
//       <input
//         type="text"
//         placeholder="Enter task"
//         value={task}
//         onChange={(e) => setTask(e.target.value)}
//       />
//       <button type="button" onClick={handleAdd}>Add</button>
//     </div>
//   );
// };

// export default Create;




/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import axios from 'axios';

const Create = () => {
  const [task, setTask] = useState('');

  const handleAdd = () => {
    if (!task) return; // Prevent empty task submissions

    // Add the task via API
    axios.post('http://localhost:4000/add', { task: task })
      .then(result => {
        setTask(''); // Reset the input field
        window.location.reload(); // Reload to fetch updated todos
      })
      .catch(err => console.log(err));
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <button type="button" onClick={handleAdd}>Add</button>
    </div>
  );
};

export default Create;
