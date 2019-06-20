import users from './users'
import users1 from './users'

const parseModel = (schema, name) => {
  const parsedSchema = {}
  const parsedForm = []

  Object.keys(schema).forEach(k => {
    const value = schema[k]
    parsedSchema[k] = value.type || value
    parsedForm.push({
      ...value,
      name: k,
      type: value.type || 'text',
    })
  })

  // const Schema = new mongoose.Schema(parsedSchema)
  // return mongoose.model(name, Schema)
  return parsedForm
}

export const Users = parseModel(users, 'Users')
export const Users1 = parseModel(users1, 'Users')

// module.exports = Models