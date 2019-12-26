import _ from 'lodash'

const profile = async ctx => {
  ctx.body = _.pick(ctx.state.user, ['_id', 'email'])
}

export default {
  profile
}
