import bcrypt from 'bcrypt';
import { createUser, findUserByEmail } from '../models/User.mjs';

export const showLogin = (req, res) => res.render('auth/login', { page: 'login' });
export const showRegister = (req, res) => res.render('auth/register', { page: 'register' });

export const register = async (req, res) => {
  try {
    const { name, email, password, role, religion, tribe, age } = req.body;
    const hash = await bcrypt.hash(password, 10);
    await new Promise((resolve, reject) => createUser({ name, email, password: hash, role, religion, tribe, age }, (err) => err ? reject(err) : resolve()));
    res.redirect('/login');
  } catch (err) {
    console.error(err);
    res.send('Registration failed');
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  findUserByEmail(email, async (err, results) => {
    try {
      if (err || results.length === 0) return res.send('Invalid login');

      const user = results[0];
      const ok = await bcrypt.compare(password, user.password);
      if (!ok) return res.send('Invalid login');

      req.session.user = user;
      if (user.role === 'admin') return res.redirect('/admin/manage-foods');
      return res.redirect('/foods'); // quick redirect to customer foods
    } catch (err) {
      console.error(err);
      res.send('Login error');
    }
  });
};

export const logout = (req, res) => {
  req.session.destroy(() => res.redirect('/login'));
};


// import bcrypt from 'bcrypt';
// import { createUser, findUserByEmail } from '../models/User.js';

// export const showLogin = (req, res) => {
//   res.render('auth/login');
// };

// export const showRegister = (req, res) => {
//   res.render('auth/register');
// };

// export const register = async (req, res) => {
//   const { name, email, password, role, religion, tribe, age } = req.body;
//   const hash = await bcrypt.hash(password, 10);

//   createUser(
//     { name, email, password: hash, role, religion, tribe, age },
//     err => {
//       if (err) return res.send('Registration failed');
//       res.redirect('/login');
//     }
//   );
// };

// export const login = (req, res) => {
//   const { email, password } = req.body;

//   findUserByEmail(email, async (err, results) => {
//     if (err || results.length === 0) return res.send('Invalid login');

//     const user = results[0];
//     const ok = await bcrypt.compare(password, user.password);
//     if (!ok) return res.send('Invalid login');

//     req.session.user = user;
//     if (user.role === 'admin') return res.redirect('/admin/add-food');
//     return res.redirect('/foods');
//   });
// };

// export const logout = (req, res) => {
//   req.session.destroy(() => res.redirect('/login'));
// };
