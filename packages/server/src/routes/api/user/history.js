const get = async ctx => {
  const { _id } = ctx.state.user
  const { limit, offset } = ctx.query
  const games = await ctx.db.model('Game').findLastUsersGames({ userId: _id, limit: +limit, offset: +offset })
  ctx.body = games.map(g => g.toJSON())
}

export default {
  get
}
