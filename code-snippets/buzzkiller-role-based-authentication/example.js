const Buzzkiller = require('./Buzzkiller')

const Auth = new Buzzkiller('./auth.db')

switch (process.argv[2]) {
  case 'addUser':
    // addUserToDatabase(username, password)
    Auth.addUserToDatabase(process.argv[3], process.argv[4])
    break;

  case 'authUser':
    // authenticateUser(username, password)
    Auth.authenticateUser(process.argv[3], process.argv[4])
    break;

  case 'getUserPermissions':
    // getPermissionsForUser(user_id)
    Auth.getPermissionsOfUserById(process.argv[3])
    break;

  case 'getUserRoles':
    // getRolesOfUserById(user_id)
    Auth.getRolesOfUserById(process.argv[3])
    break;

  default:
    break;
}