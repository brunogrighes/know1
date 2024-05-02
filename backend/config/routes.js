module.exports = app => {
      app.route('/users')
      .post(app.api.user.save)
      .get(app.api.user.get)

      app.route('/user/:id')
      .put(app.api.user.save)
}