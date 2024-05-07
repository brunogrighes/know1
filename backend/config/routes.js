module.exports = app => {
      app.route('/users')
      .post(app.api.user.save)
      .get(app.api.user.get)

      app.route('/user/:id')
      .put(admin(app.api.user.save))
      .get(admin(app.api.user.getById))
      .delete(admin(app.api.user.remove))

      app.route('/categories')
      .get(admin(app.api.category.get))
      .post(admin(app.api.category.save))

      app.route('/categories/:id')
      .get(app.api.category.getById)
      .put(admin(app.api.category.save))
      .delete(admin(app.api.category.remove))
}