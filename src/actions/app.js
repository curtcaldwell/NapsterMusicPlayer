import { createAction } from 'redux-actions'

import {
  LOGIN,
  LOGOUT,
  NAPSTER_LOADED,
  LOAD_TRACKS
} from '../actiontypes'

import queryString from 'query-string'

import { injectScript } from '../utils/injectscript'

const loginAction = createAction(LOGIN)

const napsterLoaded = createAction(NAPSTER_LOADED)

export const loadTracks = createAction(LOAD_TRACKS)

export const logIn = ({ code }) => (dispatch, getState) => {
  fetch(`http://localhost:2000/authorize/?${queryString.stringify({ code, url: 'https://localhost:3000' })}`, { method: 'POST', mode: 'cors' })
    .then(res => res.json())
    .then(({ accessToken, refreshToken }) => {
      dispatch(
        loginAction({ accessToken, refreshToken, code })
      )

      injectScript({
        url: '/jquery-1.11.0.min.js',
        id: 'jquery',
        onSuccess: () => {
          injectScript({
            url: '/napster.min.js',
            id: 'napster',
            onSuccess: () => {
              dispatch(
                napsterLoaded(true)
              )
            },
            onError: (err) => {
              console.log('napster script loading error: ', err)
              dispatch(
                napsterLoaded(false)
              )
            }
          })
        },
        onError: (err) => {
          console.log('jquery script loading error: ', err)
        }
      })
    })
    .catch((err) => {
      console.error(err)
    })
}

createAction(LOGIN)

export const logOut =
  createAction(LOGOUT)
