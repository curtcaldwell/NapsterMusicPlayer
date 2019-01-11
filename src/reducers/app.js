import { fromJS } from 'immutable'
import { handleActions } from 'redux-actions'

import {
  LOGOUT,
  LOGIN,
  NAPSTER_LOADED,
  LOAD_TRACKS
} from '../actiontypes'

const initialState = fromJS({
  loggedIn: false,
  napsterLoaded: false,
  code: '',
  accessToken: '',
  refreshToken: '',
  tracks: []
})

export default handleActions({
  [LOAD_TRACKS]: (state, { payload: { tracks } }) =>
    state.merge({
      tracks: fromJS(tracks)
    }),
  [NAPSTER_LOADED]: (state, { payload }) => 
    state.merge({
      napsterLoaded: payload
    }),
  [LOGIN]: (state, { payload: { accessToken, refreshToken, code } }) =>
    state.merge({
      loggedIn: true,
      code,
      accessToken,
      refreshToken
    }),
  [LOGOUT]: () => initialState
}, initialState)
