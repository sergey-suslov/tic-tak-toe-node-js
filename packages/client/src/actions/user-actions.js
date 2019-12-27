// flow
export const SIGN_IN = 'USER:SIGN_IN'
export const GET_PROFILE = 'USER:GET_PROFILE'
export const SET_PROFILE = 'USER:SET_PROFILE'
export const GET_PROFILE_WITH_ERROR = 'USER:GET_PROFILE_WITH_ERROR'
export const SIGNED_IN = 'USER:SIGNED_IN'
export const SIGNED_IN_WITH_ERROR = 'USER:SIGNED_IN_WITH_ERROR'
export const SIGN_UP = 'USER:SIGN_UP'
export const SIGNED_UP = 'USER:SIGNED_UP'
export const SIGNED_UP_ERROR = 'USER:SIGNED_UP_ERROR'
export const SET_USER_SIGNED_IN = 'USER:SET_USER_SIGNED_IN'
export const REFRESH_TOKEN = 'USER:REFRESH_TOKEN'
export const GET_HISTORY = 'USER:GET_HISTORY'
export const CLEAR_HISTORY = 'USER:CLEAR_HISTORY'
export const SET_HISTORY = 'USER SET_HISTORY'

const actionFactory = type => payload => ({
  type,
  payload
})

export const signIn = actionFactory(SIGN_IN)
export const getProfile = actionFactory(GET_PROFILE)
export const setProfile = actionFactory(SET_PROFILE)
export const getProfileWithError = actionFactory(GET_PROFILE_WITH_ERROR)
export const signedIn = actionFactory(SIGNED_IN)
export const signedInWithError = actionFactory(SIGNED_IN_WITH_ERROR)
export const signUp = actionFactory(SIGN_UP)
export const signedUp = actionFactory(SIGNED_UP)
export const signedUpWithError = actionFactory(SIGNED_UP_ERROR)
export const setUserSignedIn = actionFactory(SET_USER_SIGNED_IN)
export const refreshToken = actionFactory(REFRESH_TOKEN)
export const getHistory = actionFactory(GET_HISTORY)
export const setHistory = actionFactory(SET_HISTORY)
export const clearHistory = actionFactory(CLEAR_HISTORY)
