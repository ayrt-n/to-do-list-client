import React from 'react';
import Modal from 'react-modal';
import TaskForm from './TaskForm';
import '../../styles/Modal.css';
import '../../styles/Form.css';

function TaskModal({ task, isOpen, closeModal, addTask }) {
  const modalStyles = {
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.4)',
      zIndex: '40'
    },
    content: {
      border: '2px solid var(--bgLayerColor)',
      background: 'var(--bgColor)',
      margin: '0 auto',
      maxHeight: 'min-content',
      maxWidth: '900px'
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      style={modalStyles}
      onRequestClose={closeModal}
      shouldCloseOnOverlayClick={true}
    >
      <TaskForm task={task} closeModal={closeModal} afterSubmit={addTask} /> :
    </Modal>
  );
}

export default TaskModal;