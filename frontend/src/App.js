import './formik-demo.css';
import './rich-editor.css';
// Helper styles for demo
import './formik-demo.css';

import * as Yup from 'yup';

import { EditorState } from 'draft-js';
import { Formik } from 'formik';
import React from 'react';
import { RichEditorExample } from './RichEditor';
import {submitTemplate} from 'redux/actions'
import { useDispatch } from 'react-redux'

const TemplateSchema = Yup.object().shape({
  email: Yup.string()
    .email("That's not an email")
    .required('Required!'),
  subject: Yup.string().required('Required!'),
})

const MyForm = ({
  values,
  touched,
  dirty,
  errors,
  handleChange,
  handleBlur,
  handleSubmit,
  handleReset,
  setFieldValue,
  isSubmitting,
}) => (
  <form onSubmit={handleSubmit}>
    <label htmlFor="email" style={{ display: 'block' }}>
      Email
    </label>
    <input
      id="email"
      placeholder="Enter your email"
      type="email"
      value={values.email}
      onChange={handleChange}
      onBlur={handleBlur}
    />
    {errors.email &&
    touched.email && (
      <div style={{ color: 'red', marginTop: '.5rem' }}>
        {errors.email}
      </div>
    )}
    <label htmlFor="subject" style={{ display: 'block', marginTop: '.5rem'  }}>
      Subject
    </label>
    <input
      id="subject"
      placeholder="Subject"
      type="text"
      value={values.subject}
      onChange={handleChange}
      onBlur={handleBlur}
    />
    {errors.subject &&
    touched.subject && (
      <div style={{ color: 'red', marginTop: '.5rem' }}>
        {errors.subject}
      </div>
    )}
    <label
      htmlFor="email"
      style={{ display: 'block', marginTop: '.5rem' }}
    >
      Content
    </label>
    <RichEditorExample
      editorState={values.editorState}
      onChange={setFieldValue}
      onBlur={handleBlur}
    />
    <button
      type="button"
      className="outline"
      onClick={handleReset}
      disabled={!dirty || isSubmitting}
    >
      Reset
    </button>
    <button type="submit" disabled={isSubmitting}>
      Save
    </button>
  </form>
);

function App(props) {
  const dispatch = useDispatch();
  
  return (
    <div className="app">
      <Formik
        initialValues={{
          editorState: new EditorState.createEmpty(),
          email: '',
          subject: '',
        }}
        validationSchema={TemplateSchema}
        onSubmit={(values, actions) => {
          dispatch(submitTemplate({
            'body': values,
            'onSuccess': () => {
              actions.setSubmitting(false);
              window.location.href = process.env.REACT_APP_SERVER + '/list'
            },
            'onFail': () => {
              alert("Sorry there are some error, try again!")
              actions.setSubmitting(false)
            }
          }));
        }}
        component={MyForm} 
      />
    </div>
  )
};

export default App;