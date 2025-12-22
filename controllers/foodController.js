import { getRelevantFoods } from '../models/Food.js';

/**
 * Customer view foods based on:
 * - religion
 * - tribe
 * - age
 */
export const viewFoods = async (req, res) => {
  try {
    const user = req.session.user;
    if (!user) return res.redirect('/login');

    const foods = await getRelevantFoods(user); // Promise-based
    res.render('customer/foods', { foods, user });
  } catch (err) {
    console.error(err);
    res.send('Error loading foods');
  }
};


// import { getRelevantFoods } from '../models/Food.js';

// export const viewFoods = (req, res) => {
//   const user = req.session.user;

//   getRelevantFoods(user, (err, foods) => {
//     if (err) return res.send('Error loading foods');
//     res.render('customer/foods', { foods });
//   });
// };
