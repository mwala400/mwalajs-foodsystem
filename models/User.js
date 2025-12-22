import db from '../db.js';

export const createUser = (data, cb) => {
  const sql = 'INSERT INTO users SET ?';
  db.query(sql, data, cb);
};

export const findUserByEmail = (email, cb) => {
  db.query('SELECT * FROM users WHERE email = ?', [email], cb);
};
