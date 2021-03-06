import { assoc } from 'ramda'

import { Remote } from '@core'

import * as AT from './actionTypes'

export const INITIAL_STATE = {
  applicantId: '',
  veriffSyncStatus: Remote.NotAsked,
  veriffUrl: Remote.NotAsked
}

export default (state = INITIAL_STATE, action) => {
  const { payload, type } = action

  switch (type) {
    case AT.FETCH_VERIFF_URL_ERROR: {
      return assoc('veriffUrl', Remote.Failure(payload.message), state)
    }
    case AT.FETCH_VERIFF_URL_LOADING: {
      return assoc('veriffUrl', Remote.Loading, state)
    }
    case AT.FETCH_VERIFF_URL_SUCCESS: {
      return assoc('veriffUrl', Remote.Success(payload.veriffUrl), state)
    }
    case AT.SET_APPLICANT_ID: {
      return assoc('applicantId', payload.applicantId, state)
    }
    default:
      return state
  }
}
