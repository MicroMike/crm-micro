import React from 'react'
import { connect } from 'react-redux';

import * as Models from 'models/models'
import Form from 'components/Form'
import store from 'redux/store'

const mapStateToProps = ({ router: { path } }) => ({ path })

const Routes = ({ path }) => {
  const formFields = Models[path]

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
        <Form formFields={formFields} />
      }
    </div>
  )
}

export default connect(mapStateToProps)(Routes)
