import { handleActions } from 'redux-actions'
import { requestSuccess } from './api/request'
import { types } from './actions'

export default handleActions({
  [requestSuccess(types.SUBMIT_TEMPLATE)]:
    (state, { payload }) => ({
      ...state,
      result: payload
    })
}, {})
