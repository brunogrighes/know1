const app = require('express')()
const consign = require('consign')

consing()
      .then('./config/middlewares.js')
      .then('./api')
      .then('./config/routes.js')
      .into(app)

app.listen(4000, () => {
      console.log('Backend executando...')
  })