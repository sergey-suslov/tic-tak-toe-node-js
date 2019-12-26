import { watch as watchUsers } from './user-saga'

export default [
  watchUsers()
]
