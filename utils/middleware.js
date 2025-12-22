export const ensureAuth = (req, res, next) => {
  if (!req.session.user) return res.redirect('/login');
  next();
};

export const ensureAdmin = (req, res, next) => {
  if (req.session.user.role !== 'admin') return res.send('Admins only');
  next();
};

export const ensureCustomer = (req, res, next) => {
  if (req.session.user.role !== 'customer') return res.send('Customers only');
  next();
};
