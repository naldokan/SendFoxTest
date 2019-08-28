import api from '../api/sagas'
import { takeLatest } from 'redux-saga/effects'
import { types } from '../actions'

const submitTemplate = api({
  method: 'post',
  type: types.SUBMIT_TEMPLATE,
  url: '/store'
})

export default function* rootSaga () {
  yield takeLatest(types.SUBMIT_TEMPLATE, submitTemplate)
}
