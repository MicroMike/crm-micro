import React from 'react'

export default ({ input, input: { name }, values }) => (
  <div className="formGroup">
    <span>{name}</span>
    {
      values.map((v, i) => (
        <span key={i}>
          <label htmlFor={name + i}>{v}</label>
          <input
            {...input}
            id={name + i}
            type="radio"
            value={v}
          />
        </span>
      ))
    }
  </div>
)
