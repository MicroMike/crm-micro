import React from 'react'
import { Form, Field } from 'redux-form'
import customs from 'components/form/_customs'

const onSubmit = async (formData, path) => {
  const response = await fetch('/api/postModel', { method: 'POST', body: JSON.stringify({ path, formData }) })
}

export const form = ({ handleSubmit, formFields, path }) => (
  <Form onSubmit={handleSubmit(formData => { onSubmit(formData, path) })}>
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
    <input type="submit" />
  </Form >
)

// export default reduxForm({
//   form: Date.now() + '_FORM',
// })(form)
