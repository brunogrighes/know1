const bcrypt = require('bcrypt-nodejs')

module.exports = app => {
      const { existsOrError, notExistOrError, equalsOrError} = app.api.validation

      const encryptPassword = password => {
            const salt = bcrypt.genSaltSync(10)
            return bcrypt.hashSync(password, salt)
      }

      const save = async (req, res) => {
            const user = { ...req.body }
            if(req.params.id) user.id = req.params.id

            try {
                  existsOrError(user.name, 'Nome não informado')
                  existsOrError(user.email, 'E-mail não informado')
                  existOrError(user.password, 'Senha não informada')
                  existOrError(user.ConfirmPassword, 'Confirmação de Senha invalida')
                  existOrError(user.password, user.ConfirmPassword, 'Senhas não conferem')

                  const userFromDB = await app.db('users')
                        .where ({email: user.email }) .first()
                  if(!user.id) {
                        notExistOrError(userFromDB, 'Usuário já cadastrado')
                  }
            } catch(msg) {
                  return res.status(400).send(msg)
            }
            user.password = encryptPassword(user.password)
            delete user.ConfirmPassword

            if(user.id) {
                  app.id('users')
                  .uptade(user)
                  .where({ id: user.id})
                  .then(_=> res.status(204).send(err))
                  .catch(err => res.status(500).send(err))
            } else {  
                  app.db('users')
                  .inser(user)
                  .then(_ => res.status(204).send(err))
                  .catch(err => res.status(500).send(err))
            }
      }

      
      const get = (req, res) => {
            app.db('users')
                  .select('id', 'name', 'email', 'adimin' )
                  .then(users => res.json(users))
                  .catch(err => res.status(500).send(err))
      }

      const getById = (req, res) => {
            app.db('users')
                .select('id', 'name', 'email', 'admin')
                .where({ id: req.params.id })
                .whereNull('deletedAt')
                .first()
                .then(user => res.json(user))
                .catch(err => res.status(500).send(err))
        }

      return { save, get }
}