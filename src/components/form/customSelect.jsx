import React from 'react'

export default ({ input, values }) => (
  <div className="formGroup">
    <select {...input} id={input.name}>
      <options></options>
      {
        values.map((v, i) => (
          <options key={i} value={v}>{v}</options>
        ))
      }
    </select>
  </div>
)