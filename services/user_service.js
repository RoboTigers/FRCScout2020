const db = require('../db');

class UserService {
  static async Create(user) {
    db.query(
      "INSERT INTO users(username, password, role) VALUES ($1, $2, $3) RETURNING *",
      [user.username, user.password, user.role]
    );
  }
}

module.exports = UserService;
