import React from 'react';
import TaskCheckbox from './TaskCheckbox';
import DeleteTaskButton from './DeleteTaskButton';
import '../../styles/Tasks.css';

function Task({ task, handleUpdate, handleDelete, openModal }) {
  const openTaskModal = () => {
    openModal('viewTask', {header: task.title, task, callback: handleUpdate});
  }

  return (
    <div className="Task">
      <div className="Task-left">
        <TaskCheckbox
          id={task.id}
          status={task.status}
          handleUpdate={handleUpdate}
        />
      </div>
      <div className="Task-main" onClick={openTaskModal}>
        <div className="Task-title">{task.title}</div>
        <div className="Task-subtitle">{task.due_date}</div>
      </div>
      <div className="Task-right">
        <DeleteTaskButton id={task.id} openModal={openModal} handleDelete={handleDelete} />
      </div>
    </div>
  );
}

export default Task;
