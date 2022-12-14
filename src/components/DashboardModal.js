import React from 'react';
import Modal from 'react-modal';
import '../styles/Modal.css';
import '../styles/Form.css';
import closeIcon from '../assets/icons/close.svg';
import TaskModal from './tasks/TaskModal';
import TaskForm from './tasks/TaskForm';
import ConfirmationModal from './ConfirmationModal';
import SectionForm from './tasks/SectionForm';
import ProjectForm from './tasks/ProjectForm';

function DashboardModal({ action, data, isOpen, closeModal }) {
  return (
    <Modal
      isOpen={isOpen}
      className="Modal-content"
      overlayClassName="Modal-overlay"
      onRequestClose={closeModal}
      shouldCloseOnOverlayClick={true}
    >
      <div className="Modal-header-container">
        <h2>{data.header}</h2>
        <button className="Close-modal-button" onClick={closeModal} aria-label="close modal">
          <img src={closeIcon} alt="" />
        </button>
      </div>

      {action === 'viewTask' ?
        <TaskModal
          task={data.task}
          closeModal={closeModal}
          afterSubmit={data.callback}
        /> :
        action === 'newTask' ?
        <TaskForm
          task={data.task}
          closeModal={closeModal}
          afterSubmit={data.callback}
        /> :
        action === 'newSection' || action === 'editSection' ?
        <SectionForm
          section={data.section}
          projectId={data.projectId}
          closeModal={closeModal}
          afterSubmit={data.callback}
        /> :
        action === 'editProject' || action === 'newProject' ?
        <ProjectForm
          project={data.project}
          closeModal={closeModal}
          afterSubmit={data.callback}
        /> :
        action === 'confirmation' ?
        <ConfirmationModal
          message={data.message}
          buttonText={data.buttonText}
          confirmCallback={data.callback}
          closeModal={closeModal}
        /> :
        null
      }
    </Modal>
  );
}

export default DashboardModal;
