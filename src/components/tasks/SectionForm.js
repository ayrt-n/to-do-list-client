import React, { useState } from 'react';
import { Formik } from 'formik';
import TextInput from '../form/TextInput';
import Button from '../form/Button';
import Alert from '../Alert';
import '../../styles/Form.css';
import { updateSection, createSection } from '../../services/taskService';
import eventBus from '../common/EventBus';

function SectionForm({ section, projectId, closeModal, afterSubmit }) {
  const [errorMessage, setErrorMessage] = useState([]);
  
  const validate = (values) => {
    const errors = {};

    if (!values.title) {
      errors.title = 'Required';
    }

    return errors;
  };

  const handleSubmit = (values, { setSubmitting }) => {
    if (section.id) {
      updateSection(values.title, section.id).then((data) => {
        if (!data.error) {
          afterSubmit(data);
          closeModal();
        } else {
          if (data.error.details[0] === "Signature has expired") {
            eventBus.dispatch('logout');
          } else {
            setErrorMessage(data.error.details);
          }
        }
        setSubmitting(false);
      });
    } else {
      createSection(values.title, projectId).then((data) => {
        if (!data.error) {
          afterSubmit(data);
          closeModal();
        } else {
          if (data.error.details[0] === "Signature has expired") {
            eventBus.dispatch('logout');
          } else {
            setErrorMessage(data.error.details);
          }
        }
        setSubmitting(false);
      });
    }
  };

  return (
    <>
      <div className="Modal-content-container">
        {errorMessage.length > 0 && <Alert type="danger" message="Unable to save section:" details={errorMessage} />}
        <Formik
          initialValues={{title: section.title}}
          validate={validate}
          onSubmit={handleSubmit}
        >
          {formik => (
            <form onSubmit={formik.handleSubmit}>
              <TextInput label="Title" name="title" id="title" type="text" autoFocus/>
              <div className="field is-grouped">
                {section.id ? 
                  <Button label="Save Changes" buttonStyles="is-primary" type="submit"/> :
                  <Button label="Add Section" buttonStyles="is-primary" type="submit"/>
                }
                <Button label="Cancel" onClick={closeModal}/>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </>
  );
}

export default SectionForm;
