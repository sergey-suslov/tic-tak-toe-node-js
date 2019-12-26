import { createSelector } from 'reselect'
import { Record } from 'immutable'
import {
  SIGN_IN,
  GET_PROFILE,
  SET_PROFILE,
  GET_PROFILE_WITH_ERROR,
  SIGNED_IN,
  SIGN_UP,
  SIGNED_UP,
  SIGNED_UP_ERROR,
  SIGNED_IN_WITH_ERROR,
  SET_USER_SIGNED_IN
} from '../actions/user-actions'

export const moduleName = 'user'

export const ReducerRecord = Record({
  profile: {
    profile: null,
    processing: false
  },
  signIn: {
    signedIn: false,
    processing: false
  },
  signUp: {
    signedUp: false,
    message: '',
    processing: false
  }
})

export default function reducer(state = new ReducerRecord(), action) {
  const { type, payload } = action

  switch (type) {
  case SIGN_IN:
    return state.set('signIn', {
      signedIn: false,
      processing: true
    })
  case GET_PROFILE:
    return state.set('profile', {
      profile: null,
      processing: true
    })
  case SET_PROFILE:
    return state.set('profile', {
      profile: payload,
      processing: false
    })
  case GET_PROFILE_WITH_ERROR:
    return state.set('profile', {
      profile: null,
      processing: false
    })
  case SET_USER_SIGNED_IN:
    return state.set('signIn', {
      signedIn: true,
      processing: false
    })
  case SIGNED_IN:
    return state.set('signIn', {
      signedIn: true,
      processing: false
    })
  case SIGNED_IN_WITH_ERROR:
    return state.set('signIn', {
      signedIn: false,
      processing: false
    })
  case SIGN_UP:
    return state.set('signUp', {
      signUp: false,
      processing: true,
      message: ''
    })
  case SIGNED_UP:
    return state.set('signUp', {
      processing: false,
      signedUp: true
    })
  case SIGNED_UP_ERROR:
    return state.set('signUp', {
      processing: false,
      signedUp: false,
      error: payload.error
    })
  default:
    return state
  }
}

/**
 * Selectors
 * */
export const stateSelector = state => state[moduleName]
export const isSigningUp = createSelector(
  stateSelector,
  state => state.signUp.processing,
)
export const isSignedUp = createSelector(
  stateSelector,
  state => state.signUp.signedUp,
)
export const isSigningIn = createSelector(
  stateSelector,
  state => state.signIn.processing,
)
export const isSignedIn = createSelector(
  stateSelector,
  state => state.signIn.signedIn,
)
export const profile = createSelector(
  stateSelector,
  state => state.profile.profile,
)
export const isFetchingProfile = createSelector(
  stateSelector,
  state => state.profile.processing,
)
