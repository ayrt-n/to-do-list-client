import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import UserService from '../../services/UserService';
import Task from './Task';
import NewSectionButton from './NewSectionButton';
import NewTaskButton from './NewTaskButton';
import ProjectModal from './ProjectModal';
import '../../styles/Tasks.css';

function Project() {
  let { projectId } = useParams();
  const [loading, setLoading] = useState(true);
  const [project, setProject] = useState({});
  const [modal, setModal] = useState({isOpen: false, action: '', data: {}})

  useEffect(() => {
    setLoading(true);
    UserService.getProjectTasks(projectId).then((data) => {
      console.log(data);
      setProject(data);
      setLoading(false);
    });
  }, [projectId]);

  const updateTask = (updatedTask, sectionId=null) => {
    if (sectionId) {
      setProject(
        {
          ...project,
          sections: project.sections.map((section) => (
            section.id === sectionId ?
            {
              ...section,
              tasks: section.tasks.map((task) => (updatedTask.id === task.id ? updatedTask : task))
            } :
            section
          ))
        }
      );
    } else {
      setProject(
        {
          ...project,
          tasks: project.tasks.map((task) => (updatedTask.id === task.id ? updatedTask : task))
        }
      );
    }
  };

  const deleteTask = (deletedTask, sectionId=null) => {
    if (sectionId) {
      setProject(
        {
          ...project,
          sections: project.sections.map((section) => (
            section.id === sectionId ?
            {
              ...section,
              tasks: section.tasks.filter((task) => (task.id !== deletedTask.id))
            } :
            section
          ))
        }
      );
    } else {
      setProject(
        {
          ...project,
          tasks: project.tasks.filter((task) => (task.id !== deletedTask.id))
        }
      );
    }
  };

  const addTask = (newTask, sectionId=null) => {
    if (sectionId) {
      setProject(
        {
          ...project,
          sections: project.sections.map((section) => (
            section.id === sectionId ?
            {
              ...section,
              tasks: section.tasks.concat(newTask)
            } :
            section
          ))
        }
      );
    } else {
      setProject(
        {
          ...project,
          tasks: project.tasks.concat(newTask)
        }
      );
    }
  };

  const addSection = (newSection) => {
    setProject(
      {
        ...project,
        sections: project.sections.concat({...newSection, tasks: []})
      }
    )
  }

  const openModal = (action, data) => {
    setModal(
      {
        isOpen: true,
        action: action,
        data: data
      }
    )
  };

  const closeModal = () => {
    setModal(
      {
        ...modal,
        isOpen: false,
      }
    )
  }

  return (
    loading ?
    null :
    <div className="Tasks">
      <ProjectModal
        action={modal.action}
        data={modal.data}
        isOpen={modal.isOpen}
        closeModal={closeModal}
      />
      <h1>{project.title}</h1>
      <div className="Tasks-container">
        {project.tasks.map((task) => (
          <Task key={task.id} task={task} handleUpdate={updateTask} handleDelete={deleteTask} openModal={openModal} />)
        )}
        <NewTaskButton projectId={projectId} openModal={openModal} afterSubmit={addTask} />
      </div>
      {project.sections.map((section) => {
        return(
          <div className="Tasks-container" key={section.id}>
            <h2>{section.title}</h2>
            {section.tasks.map((task) => (
              <Task
                key={task.id}
                task={task}
                sectionId={section.id}
                openModal={openModal}
                handleUpdate={updateTask}
                handleDelete={deleteTask}
              />)
            )}
            <NewTaskButton openModal={openModal} sectionId={section.id} projectId={projectId} afterSubmit={addTask} />
          </div>
        );
      })}
      <NewSectionButton projectId={projectId} openModal={openModal} afterSubmit={addSection} />
    </div>
  );
}

export default Project;
