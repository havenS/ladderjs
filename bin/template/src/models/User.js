import Sequelize from 'sequelize'
import bcrypt from 'bcrypt'

const attributes = {
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  role: {
    type: Sequelize.ENUM(['ADMIN', 'USER']),
  },
  firstName: {
    type: Sequelize.STRING,
  },
  lastName: {
    type: Sequelize.STRING,
  },
  password: {
    type: Sequelize.VIRTUAL,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  password_confirmation: {
    type: Sequelize.VIRTUAL,
  },
  password_digest: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true,
    },
  },
}

const options = {
  freezeTableName: true,
  indexes: [{unique: true, fields: ['email']}],
  defaultScope: {
    attributes: {exclude: ['password', 'password_confirmation']},
  },
}

const hasSecurePassword = function(user) {
  return new Promise((resolve, reject) => {
    if (user.password != user.password_confirmation) {
      throw new Error(
        'Le mot de passe et sa confirmation doivent être identiques'
      )
    }
    bcrypt.hash(user.password, 10, function(err, hash) {
      if (err) {
        reject(err)
      }
      user.password_digest = hash
      resolve()
    })
  })
}

export default function(sequelize) {
  const User = sequelize.define('users', attributes, options)

  User.beforeCreate(function(user, options, callback) {
    user.email = user.email.toLowerCase()
    if (user.password) {
      return hasSecurePassword(user, options, callback)
    }
  })

  User.beforeUpdate(function(user, options, callback) {
    user.email = user.email.toLowerCase()
    if (user.password) {
      return hasSecurePassword(user, options, callback)
    }
  })

  User.prototype.authenticate = function(value) {
    if (bcrypt.compareSync(value, this.password_digest)) {
      return this
    } else {
      return false
    }
  }

  return User
}
