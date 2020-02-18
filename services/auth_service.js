const crypto = require('crypto');
const argon2 = require('argon2');
const UserService = require('./user_service.js');

class AuthService {
  static async SignUp(username, password, role) {
    const salt = crypto.randomBytes(32);
    const hashedPassword = await argon2.hash(password, { salt });

    const userRecord = await UserService.Create({
      username,
      password: hashedPassword,
      role: role
    });
  }
}

module.exports = AuthService;
