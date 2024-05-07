module.exports = app => {
      app.post('/signup', app.api.user.save)
      app.post('/signin', app.api.auth.signin)
      app.post('/validateToken', app.api.auth.validateToken)

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

      //cuidado com ordem! Tem q vir antes de /categories/:id
      app.route('/categories/tree')
      .all(app.config.passport.authenticate())
      .get(app.api.category.getTree)

      app.route('/categories/:id')
      .get(app.api.category.getById)
      .put(admin(app.api.category.save))
      .delete(admin(app.api.category.remove))

      app.route('/articles')
      .get(app.api.article.getById)
      .put(app.api.article.save)
      .delete(app.api.article.remove)

      app.route('/categories/:id/articles')
      .get(app.api.article.getByCategory)
}