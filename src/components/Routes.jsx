import React from 'react'
import { connect } from 'react-redux';

import Models from 'models/models'
import { form } from 'components/Form'
import { reduxForm } from 'redux-form'
import store from 'redux/store'

const parseModel = (model = {}) => {
  const parsedForm = []

  Object.keys(model).forEach(k => {
    const value = model[k]

    parsedForm.push({
      ...value,
      name: k,
      type: value.type || 'text',
    })
  })

  return parsedForm.length ? parsedForm : null
}

const connectForm = name => (
  reduxForm({
    form: name.toUpperCase() + '_FORM',
  })(form)
)

const mapStateToProps = ({ router: { path } }) => ({ path })

const Routes = ({ path }) => {
  const formFields = parseModel(Models[path])
  const Form = formFields && connectForm(path)

  return (
    <div className="App">
      {Object.keys(Models).map(m => (
        <button
          key={m}
          onClick={() => {
            store.dispatch({
              type: 'CHANGE_PATH',
              path: m
            })
          }}>{m}</button>
      ))}
      {formFields &&
        <Form formFields={formFields} path={path} />
      }
    </div>
  )
}

export default connect(mapStateToProps)(Routes)
