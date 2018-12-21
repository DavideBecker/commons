const crypto = require('crypto')
const sqlite3 = require('sqlite3')
const pbkdf2 = require('pbkdf2')

const queries = require('./sql-queries')
const helpers = require('./helpers')

class Buzzkiller {

  /**
   * @typedef {Object} SaltedPassword
   * @property {string} hash The hashed password
   * @property {string} salt The generated salt
   */

  /**
   * 
   */
  constructor(pathToSqliteDatabase) {
    this.db = new sqlite3.Database(pathToSqliteDatabase)
    this.helpers = helpers
  }

  /**
   * 
   * @param {string} password The password to hash
   * @param {string} [savedSalt] An optional salt for the password. If none is set, one will be generated for you
   * 
   * @returns {SaltedPassword} The hashed and salted password with the salt seperately
   */
  hashPassword(password, savedSalt = false) {
    let salt = savedSalt || crypto.randomBytes(128).toString('base64');
    let hash = pbkdf2.pbkdf2Sync(password, salt, 10000, 64, 'sha512');

    return {
      hash: hash.toString('base64'),
      salt: salt,
    };
  }

  /**
   * 
   * @param {string} savedHash The hash to compare with
   * @param {string} savedSalt The salt of the hashed password
   * @param {string} passwordAttempt The user-entered password to compare with
   * 
   * @returns {boolean} Whether or not the password matches the salted hash
   */
  isPasswordCorrect(savedHash, savedSalt, passwordAttempt) {
    return savedHash === this.hashPassword(passwordAttempt, savedSalt).hash
  }

  /**
   * 
   * @param {string} username The username to look for in the database
   * @param {string} password The password of the username
   * 
   * @returns {number} Returns -1 if user/password don't match or the ID of the authenticated user
   */
  authenticateUser(username, password) {
    const self = this

    this.db.get(queries.getUserByName, username, function(err, row) {
      if (self.isPasswordCorrect(row.hash, row.salt, password)) {
        console.log('Password is correct')
        return row.id
      } else {
        console.log('Password is wrong')
        return -1
      }
    })
  }

  /**
   * 
   * @param {string} username The user to add to the database. Has to be unique
   * @param {string} password The password of the user, will be hashed and salted
   */
  addUserToDatabase(username, password) {
    const hashedPassword = this.hashPassword(password)

    this.db.run(queries.addUser, [username, hashedPassword.hash, hashedPassword.salt], function(err) {
      if (!err) {
        console.log('Added user to database', {
          username: username,
          hash: hashedPassword.hash,
          salt: hashedPassword.salt
        })
      } else {
        console.error(err)
      }
    })
  }

  getPermissionsOfUserById(userID) {
    this.db.all(queries.getAllPermissionsByUserID, userID, function(err, rows) {
      let permissions = {}

      for (let i = 0; i < rows.length; i++) {
        let row = rows[i]

        if (!permissions[row.resource])
          permissions[row.resource] = []

        permissions[row.resource].push(row.permission)
      }
      
      console.log(permissions)
    })
  }

  getRolesOfUserById(userID) {
    this.db.all(queries.getAllPermissionsByUserID, userID, function(err, rows) {
      let roles = []

      for (let i = 0; i < rows.length; i++) {
        let row = rows[i]

        if (roles.indexOf(row.role) === -1)
          roles.push(row.role)
      }
      
      console.log(roles)
    })
  }
}

module.exports = Buzzkiller