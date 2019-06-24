import React from 'react'

export default ({ input, values }) => (
  <div className="formGroup">
    <select {...input} id={input.name}>
      {
        values.map((v, i) => (
          <option key={i} value={v}>{v}</option>
        ))
      }
    </select>
  </div>
)