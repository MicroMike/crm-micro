import React from 'react'

export default ({ input, input: { name } }) => (
  <div className="formGroup">
    <label htmlFor={name}>{name}</label>
    <input
      {...input}
      id={name}
      type="number"
    />
  </div>
)