const pool = require("../../config/database").pool;

module.exports = {
  // Query to insert new user to registration table
  register: (data, callback) => {
    pool.query(
      `INSERT INTO registration(user_name,user_email,user_password)VALUES(?,?,?)`,
      [data.userName, data.email, data.password],
      (err, result) => {
        if (err) {
          return callback(err);
        }
        return callback(null, result);
      }
    );
  },
  // Query to insert user into profile table
  profile: (data, callback) => {
    pool.query(
      `INSERT INTO profile(user_id,first_name,last_name)VALUES(?,?,?)`,
      [data.userId, data.firstName, data.lastName],
      (err, result) => {
        if (err) {
          return callback(err);
        }
        return callback(null, result);
      }
    );
  },
  // Query to fetch all single user data by user id
  userById: (id, callback) => {
    pool.query(
      `SELECT registration.user_id,user_name,user_email,first_name,last_name FROM registration LEFT JOIN profile ON registration.user_id = profile.user_id WHERE registration.user_id = ?`,
      [id],
      (err, result) => {
        if (err) {
          return callback(err);
        }
        return callback(null, result[0]);
      }
    );
  },
  // Query to fetch single user by email
  getUserByEmail: (email, callback) => {
    pool.query(
      "SELECT * FROM registration WHERE user_email = ?",
      [email],
      (err, result) => {
        if (err) return callback(err);
        return callback(null, result[0]);
      }
    );
  },
  // Query to fetch all users
  getAllUsers: (callback) => {
    pool.query(
      `SELECT user_id,user_name,user_email FROM registration`,
      [],
      (err, result) => {
        if (err) {
          return callback(err);
        }
        return callback(null, result);
      }
    );
  },
};
