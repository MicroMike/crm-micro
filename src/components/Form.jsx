import React from 'react'
import { Form, reduxForm, Field } from 'redux-form'
import customs from 'components/form/_customs'

const form = ({ handleSubmit, formFields }) => (
  <Form onSubmit={() => { }}>
    {formFields &&
      formFields.map((u, i) => (
        <Field
          key={i}
          name={u.name}
          component={customs[u.type]}
          values={u.values}
        />
      ))
    }
    <input type="submit" onClick={handleSubmit((formData) => { console.log(formData) })} />
  </Form >
)

export default reduxForm({
  form: Date.now() + '_FORM',
})(form)
