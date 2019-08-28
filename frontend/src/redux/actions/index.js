import { createAction } from 'redux-actions'

const SUBMIT_TEMPLATE = 'SUBMIT_TEMPLATE'

export const types = {
    SUBMIT_TEMPLATE
}

export const submitTemplate = createAction(SUBMIT_TEMPLATE)
