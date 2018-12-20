const crypto = require('crypto')
const sqlite3 = require('sqlite3')
const pbkdf2 = require('pbkdf2')
const db = new sqlite3.Database('./auth.db');

function hashPassword(password, savedSalt = false) {
  let salt = savedSalt || crypto.randomBytes(128).toString('base64');
  let hash = pbkdf2.pbkdf2Sync(password, salt, 10000, 64, 'sha512');

  return {
    salt: salt,
    hash: hash.toString('base64'),
  };
}

function isPasswordCorrect(savedHash, savedSalt, passwordAttempt) {
  return savedHash == hashPassword(passwordAttempt, savedSalt).hash
}

function authenticateUser(username, password) {
  db.get("SELECT * FROM Users WHERE username=?", username, function(err, row) {
    if (isPasswordCorrect(row.hash, row.salt, password)) {
      console.log('Password is correct')
      return true
    } else {
      console.log('Password is wrong')
      return false
    }
  })
}

function addUserToDatabase(username, password) {
  const hashedPassword = hashPassword(password)

  db.run("INSERT INTO Users (username, hash, salt) VALUES (?, ?, ?)", [username, hashedPassword.hash, hashedPassword.salt], function(err) {
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


switch (process.argv[2]) {
  case 'addUser':
    // addUserToDatabase(username, password)
    addUserToDatabase(process.argv[3], process.argv[4])
    break;

  case 'authUser':
    // addUserToDatabase(username, password)
    authenticateUser(process.argv[3], process.argv[4])
    break;

  default:
    break;
}