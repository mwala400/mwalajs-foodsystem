import db from '../db.mjs';

/**
 * Get all foods
 */
export const getAllFoods = () => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM foods', (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

/**
 * ML-STYLE RULE FILTERING:
 * - religion match OR 'all'
 * - tribe match OR 'all'
 * - age >= min_age
 */
export const getRelevantFoods = (user) => {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT * FROM foods
      WHERE (allowed_religion = ? OR allowed_religion = 'all')
        AND (allowed_tribe = ? OR allowed_tribe = 'all')
        AND min_age <= ?
    `;
    db.query(sql, [user.religion, user.tribe, user.age], (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

/**
 * Add a food
 * data = { name, category, allowed_religion, allowed_tribe, min_age, image }
 */
export const addFood = (data) => {
  return new Promise((resolve, reject) => {
    const sql = 'INSERT INTO foods SET ?';
    db.query(sql, data, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

/**
 * Update a food by ID
 */
export const updateFood = (id, data) => {
  return new Promise((resolve, reject) => {
    const sql = 'UPDATE foods SET ? WHERE id = ?';
    db.query(sql, [data, id], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

/**
 * Delete a food by ID
 */
export const deleteFood = (id) => {
  return new Promise((resolve, reject) => {
    const sql = 'DELETE FROM foods WHERE id = ?';
    db.query(sql, [id], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

/**
 * Get single food by ID
 */
export const getFoodById = (id) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM foods WHERE id = ?';
    db.query(sql, [id], (err, results) => {
      if (err) return reject(err);
      resolve(results[0]);
    });
  });
};
